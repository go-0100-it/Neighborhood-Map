/**
 * Using Require.js to define a module responsible for creating a Data Controller object and defining the modules required by this module.
 */
define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'events_API',
        'cache',
        'firebase_app',
        'firebase_auth',
        'firebase_data'
    ],
    function(
        $,
        backbone,
        _,
        ko,
        EventsApi,
        Cache
    ) {


        /**
         * Creates a Data controller object.
         * @constructor
         * This controller is responsible for retrieving all external data required by the app.
         * The controller constructor could be called from any module but, for sake of clenliness, is only contained and referenced in the main controller.
         * @return - returns the DataController constructor.
         */
        var DataController = function() {
            var _this = this;
            let DONE = 4;
            let OK = 200;
            let ERROR = 400;

            // This variable is used by the callbackSync function.  Used to keep count of the data requests made by the user.
            this.dataRequestCount = 0;

            // An API key supplied by http://api.eventful.com/ and is required to access the Eventful API.
            this.eventsApiKey = '2J8Xh6BQhcPvkQCd';

            // An API key supplied by https://developers.zomato.com and is required to access the Zomato API.
            this.restaurantsApiKey = 'de81b40aeca20309296e437c5914de3d';

            // An API key supplied by https://worldweatheronline.com and is required to access the World Weather Online API.
            this.weatherApiKey = 'e699f514c84a4a1c98f84105171005';




            /**
             * I was unable to find a way to cancel the previously made AJAX requests upon making another so I came up with this work around were the previous requests
             * are simply ignored.  The request would not be completely wasted as the result would be cached and therefor, this seemed like a viable solution to me.
             * Using this function to call only the render function associated with the most recent data requested by the user.  If the user has previously requested data and 
             * commits to subsequent data requests before the previous data has been processed and rendered, then only the last data request will be processed and rendered.
             * @param {object} data - The data being passed to the callback function.
             * @param {string} callbackId - The id of the requested callback(the dataRequestCount value captured when the request was made).
             * @param {array} args - The array of args being passed to the callback function.
             * @param {function} func - The callback function.
             */
            this.callbackSync = function(data, callbackId, args, func) {

                // Checking if the callbackId matches the current data request count, if it does then it's the most recent, then call the function passed in (The render tabs view function)
                if (callbackId === _this.dataRequestCount) {
                    func(data, args);
                }
            };




            /**
             * 
             * @param {object} args - 
             * @param {function} func1 - 
             * @param {function} func2 - 
             */
            this.queryCache = function(args, func1, func2) {

                // Calling the clearStale function on the Cache to remove all the expired data stored before querying the Cache.
                Cache.clearStale();

                // Querying the Cache for the current request.
                var stamp = args.viewVariable + args.place.id;

                // If the a request stamp is found that matches the current one then continue with the users request but using the Cached data
                // instead of doing a HTTP get request.
                if (Cache.has(stamp)) {

                    // Incrementing the dataRequestCount variable by 1 every time a request is made(this code is run).
                    _this.dataRequestCount += 1;

                    // Capturing the current dataRequestCount value as this requests id.
                    var callId = _this.dataRequestCount;

                    // Getting the Cached data with the stamp that matches the current stamp.
                    var data = Cache.getCachedData(stamp);

                    // Calling callbackSync function to check if this is the most recent request made by the user.
                    _this.callbackSync(data, callId, args, func2);


                } else {
                    func1(args, func2);
                }
            };




            /**
             * 
             * @param {object} args - 
             * @param {function} func - 
             */
            this.getEventsDataList = function(args, func) {

                // Incrementing the dataRequestCount variable by 1 every time a request is made(this code is run).
                _this.dataRequestCount += 1;

                // Capturing the current dataRequestCount value as this requests id.
                var callId = _this.dataRequestCount;

                // Formatting the geo-coords for the API request's where value.
                var where = args.place.lat + ',' + args.place.lng;

                // Creating an obj literal to pass as the API's request parameters.
                var oArgs = {
                    app_key: _this.eventsApiKey,
                    q: "events",
                    where: where,
                    within: 10,
                    "date": _this.getFormattedDate() + '-' + _this.getFormattedDate(1),
                    page_size: 40,
                    sort_order: "date",
                    sort_direction: 'ascending'
                };

                /**
                 * Making the data request call via the EVDB.API.call function(contained in Eventful's api.js file) and 
                 * passing the arguments to filter the search and the callback function to run when the result is ready.
                 */
                EVDB.API.call("/events/search", oArgs, function(oData) {
                    var stamp = args.viewVariable + args.place.id;

                    // Caching the result to reduce the number of Http requests.
                    Cache.storeResult(stamp, 3600000, oData);

                    // Calling callbackSync function to check if this is the most recent request made by the user.
                    _this.callbackSync(oData, callId, args, func);
                });
            };




            /**
             * 
             * @param {function} func - 
             * @param {string} uid - 
             * @param {object} request - 
             */
            this.getUserPlaces = function(func, uid, request) {

                /**
                 * 
                 */
                firebase.database().ref(uid).once('value').then(function(snapshot) {
                    console.log("Requesting Data from Firebase");
                    //
                    var places = snapshot.val();

                    //
                    if (places) {
                        $.each(places, function(key, value) {
                            func(value);
                        });
                        if (request.centerRequested) {
                            console.log('Center requested 1');
                            request.centerOnLocation(request.locRequested);
                        }
                    } else {
                        _this.getDefaultPlaces(request, func);
                    }

                });
            };




            /**
             * A function to query the firebase database for the default places.  
             * This function is called only if the anonymous user does not have any places save to the database.
             * @param {object} request - an object containing the request data, using to center the map view.
             * @param {function} func - The callback function to be called in the for each loop after firebase returns the requested data.
             */
            this.getDefaultPlaces = function(request, func) {

                // Requesting the value stored at the key "default" at the root of the database. 
                firebase.database().ref("default").once('value').then(function(snapshot) {

                    // Storing the object returned from firebase to a variable.
                    var places = snapshot.val();

                    // Calling the callback function on each key(googles place id) in the object and passing in the value(a place object) to the function.
                    $.each(places, function(key, value) {
                        func(value);
                    });

                    // If request.centerRequested is true calling the centerOnLocation function and passing the location contained in the request object.
                    // 
                    if (request.centerRequested) {
                        request.centerOnLocation(request.locRequested);
                    }
                });
            };




            /**
             * A function to... 
             * @param {object} args - 
             * @param {function} func - The callback function to be called...
             */
            this.getRestaurantsList = function(args, func) {

                // Incrementing the dataRequestCount variable by 1 every time a request is made(this code is run).
                _this.dataRequestCount += 1;

                // Capturing the current dataRequestCount value as this requests id.
                var callId = _this.dataRequestCount;

                // Creating a new Http get request.
                var getRequest = new XMLHttpRequest();

                // Setting the callback for the onreadystatechange Event handler which is called when the readystate changes.
                getRequest.onreadystatechange = function() {
                    if (this.readyState == DONE && this.status == OK) {

                        // Parsing the response and setting to a variable for readability.
                        var jsonResponse = JSON.parse(this.response);

                        // Parsing the response and setting to a variable for readability.
                        var restaurants = jsonResponse.restaurants;

                        // Creating a unique label for caching the result
                        var stamp = args.viewVariable + args.place.id;

                        // Caching the result to reduce the number of Http requests.
                        Cache.storeResult(stamp, 3600000, restaurants);

                        // Calling the callbackSync function to check if this is the most recent request made by the user.
                        // Passing the data and the function to call if this is the most recent request.
                        _this.callbackSync(restaurants, callId, args, func);

                        // If the response from server is an error, log the error
                    } else if (this.status >= ERROR) {
                        console.error(this.responseText);
                        console.error('Server response code: ' + this.status)
                    }
                };

                // Opening and sending the request, adding required user-key in the request header.  User key supplied by Zomato.com.
                getRequest.open('GET', 'https://developers.zomato.com/api/v2.1/search?lat=' + args.place.lat + '&lon=' + args.place.lng + '&radius=5000', true);
                getRequest.setRequestHeader('Accept', 'application/json');
                getRequest.setRequestHeader('user-key', _this.restaurantsApiKey);
                getRequest.send();
            };




            /**
             * A function to... 
             * @param {object} args - 
             * @param {function} func - The callback function to be called...
             */
            this.getCurrentWeather = function(args, func) {

                // Incrementing the dataRequestCount variable by 1 every time a request is made(this code is run).
                _this.dataRequestCount += 1;

                // Capturing the current dataRequestCount value as this requests id.
                var callId = _this.dataRequestCount;

                // Creating a new Http get request.
                var getRequest = new XMLHttpRequest();

                // Setting the callback for the onreadystatechange Event handler which is called when the readystate changes.
                getRequest.onreadystatechange = function() {

                    if (this.readyState == DONE && this.status == OK) {

                        // Parsing the response and setting to a variable for readability.
                        var currentWeather = JSON.parse(this.response);

                        // Creating a unique label for caching the result
                        var stamp = args.viewVariable + args.place.id;

                        // Caching the result to reduce the number of Http requests.
                        Cache.storeResult(stamp, 600000, currentWeather);

                        // Calling the callbackSync function to check if this is the most recent request made by the user.
                        // Passing the data and the function to call if this is the most recent request.
                        _this.callbackSync(currentWeather, callId, args, func);

                        // If the response from server is an error, log the error
                    } else if (this.status >= ERROR) {
                        console.error(this.responseText);
                        console.error('Server response code: ' + this.status);
                    }
                };

                // Opening and sending the request
                getRequest.open('GET', 'https://api.worldweatheronline.com/premium/v1/weather.ashx?key=' + _this.weatherApiKey + '&q=' + args.place.lat + ',' + args.place.lng + '&format=json&num_of_days=1', true);
                getRequest.send();
            };




            /**
             * A function to add the user selected place object to the database.
             * @param {object} place - The place object to be added to the database.
             * @param {string} uid - The unique user id given by firebase when the current user was logged in anonymously. 
             * NOTE: The uid is used as the key for the places object(the object containing all the places).  The place id is used as the key for each place object.
             */
            this.updateUserPlaces = function(place, uid) {
                firebase.database().ref(uid + '/' + place.id).update(place);
            };




            /**
             * A function to remove the selected place object residing in the firebase database.
             * @param {object} place - The place object to be removed from the database.
             * @param {string} uid - The unique user id given by firebase when the current user was logged in anonymously.
             * NOTE: The uid is used as the key for the places object(the object containing all the places).  The place id is used as the key for each place object.
             */
            this.removeUserPlace = function(place, uid) {
                firebase.database().ref(uid + '/' + place.id).remove();
            };




            /**
             * A function to create a date of string type and formatted as required by the eventful API. (ie. Feb 1st, 2017 = '2017020100')
             * @param {int} span - The time offset in years from current date.
             * @return {string} - Returns a formatted date as a string.  The date returned will be either the current date if no parameter is passed in @param span or, 
             * if a parameter is passed in, will be the current date plus the the number of years corresponding to the number passed in.
             */
            this.getFormattedDate = function(span) {

                var yearSpan = span ? span : 0;
                var newDate = new Date();
                var formattedMonth = ((newDate.getMonth() + 1) < 10) ? ('0' + (newDate.getMonth() + 1)) : (newDate.getMonth() + 1);
                var date = (newDate.getFullYear() + yearSpan) + formattedMonth + newDate.getDate() + '00';

                return date;
            };
        };


        // Returning the DataController constructor
        return DataController;
    });