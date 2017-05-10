/**
 * Using Require.js to define a module responsible for creating a Data Controller object and defining the modules required by this module.
 */
define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'events_API',
        'firebase_app',
        'firebase_auth',
        'firebase_data'
    ],
    function(
        $,
        backbone,
        _,
        ko,
        EventsApi
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

            // This variable is used by the callbackSync function.  Used to keep count of the data requests made by the user.
            this.dataRequestCount = 0;

            // An API key supplied by http://api.eventful.com/ is required to access the Eventful API.
            this.eventsApiKey = '2J8Xh6BQhcPvkQCd';

            // An API key supplied by https://developers.zomato.com is required to access the Zomato API.
            this.restaurantsApiKey = 'de81b40aeca20309296e437c5914de3d';

            this.weatherApiKey = '8063483be3c33c058c9eec81c2e7c397';
                                  
            /**
             * I was unable to find a way to cancel the previously made AJAX requests upon making another so I came up with this work around were the previous requests are simply ignored.
             * Using this function to call only the render function associated with the most recent data requested by the user.  If the user has previously requested data and 
             * commits to subsequent data requests before the previous data has been processed and rendered, then only the last data request will be processed and rendered.
             * @param {function} func - The callback function.
             * @param {array} args - The array of args being passed to the callback function.
             * @param {object} data - The data being passed to the callback function.
             * @param {string} callbackId - The id of the requested callback(the dataRequestCount value captured when the request was made).
             */
            this.callbackSync = function(data, callbackId, args, func) {

                // Checking if the callbackId matches the current data request count, if it does, call the function passed in (The render tabs view function)
                if (callbackId === _this.dataRequestCount) {
                    func(data, args);
                }
            };



            // /**
            //  * @param {function} func - The title of the book.
            //  * @param {string} id - The author of the book.
            //  */
            // this.getEventData = function(id, func) {
            //     var oArgs = {
            //         app_key: _this.eventsApiKey,
            //         id: id,
            //         page_size: 1,
            //     };

            //     /**
            //      * 
            //      */
            //     EVDB.API.call("/events/get", oArgs, function(oData) {
            //         // Note: this relies on the custom toString() methods below
            //         func(oData);
            //     });
            // };



            /**
             * @param {function} func - The title of the book.
             * @param {array} args - The author of the book.
             */
            this.getEventsDataList = function(args, func) {

                // Incrementing the dataRequestCount variable by 1 every time a request is made(this code is run).
                _this.dataRequestCount += 1;

                // Capturing the current dataRequestCount value as this requests id.
                var callId = _this.dataRequestCount;

                // Formatting the geo-coords for the API requests where value.
                var where = args.place.lat + ',' + args.place.lng;

                // Creating an obj literal to pass as the APIs request arguments.
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

                    // Calling callbackSync function to check if this is the most recent request made by the user.
                    _this.callbackSync(oData, callId, args, func);
                });
            };



            /**
             * @param {function} func - The title of the book.
             * @param {string} uid - The author of the book.
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
                    if (request.centerRequested) {
                        console.log('Center requested 2');
                        request.centerOnLocation(request.locRequested);
                    }
                });
            };

            this.getRestaurantsList = function(args, func) {
                // The following script:
                _this.dataRequestCount += 1;
                var callId = _this.dataRequestCount;
                var getRequest = new XMLHttpRequest();
                getRequest.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var jsonResponse = JSON.parse(this.response);
                        var restaurants = jsonResponse.restaurants;
                        console.log(restaurants);
                        // Calling callbackSync function to check if this is the most recent request made by the user.
                        _this.callbackSync(restaurants, callId, args, func);
                    } else if (this.status > 399) {
                        console.error(this.responseText);
                        console.error('Server response code: ' + this.status)
                    }
                };
                getRequest.open('GET', 'https://developers.zomato.com/api/v2.1/search?lat=' + args.place.lat + '&lon=' + args.place.lng + '&radius=5000', true);
                getRequest.setRequestHeader('Accept', 'application/json');
                getRequest.setRequestHeader('user-key', _this.restaurantsApiKey);
                getRequest.send();
            };

            this.getCurrentWeather = function(args, func){
            // The following script:
                _this.dataRequestCount += 1;
                var callId = _this.dataRequestCount;
                var getRequest = new XMLHttpRequest();
                getRequest.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var currentWeather = JSON.parse(this.response);
                        console.log(currentWeather);
                        // Calling callbackSync function to check if this is the most recent request made by the user.
                        _this.callbackSync(currentWeather, callId, args, func);
                    } else if (this.status > 399) {
                        console.error(this.responseText);
                        console.error('Server response code: ' + this.status)
                    }
                };
                getRequest.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + args.place.lat + '&lon=' + args.place.lng + '&units=metric&APPID={' + _this.weatherApiKey +'}', true);
                getRequest.send();
            };



            /**
             * A function to add a selected place object to the users database.
             * @param {object} place - The place object to be added to the database.
             * @param {string} uid - The unique user id given by firebase when the current user was logged in anonymously. 
             * NOTE: The uid is used as the key for the main containing object.  The place id is used as the key for each place object.
             */
            this.updateUserPlaces = function(place, uid) {
                firebase.database().ref(uid + '/' + place.id).update(place);
            };



            /**
             * A function to remove the selected place object residing in the firebase database.
             * @param {object} place - The place object to be removed from the database.
             * @param {string} uid - The unique user id given by firebase when the current user was logged in anonymously.
             * NOTE: The uid is used as the key for the main containing object.  The place id is used as the key for each place object.
             */
            this.removeUserPlace = function(place, uid) {
                firebase.database().ref(uid + '/' + place.id).remove();
            };



            /**
             * A function to create a date of string type and formatted as required by the eventful API. (ie. Feb 1st, 2017 = '2017020100')
             * @param {int} span - The time offset in years from current date.
             * @return {string} - Returns a formatted date as a string.  The date returned will be either the current date or, if a parameter is passed,
             * will be the current date plus the the number of years corresponding to the number passed in.
             */
            this.getFormattedDate = function(span) {

                // Setting the variable span to the arg span if it is present or 0 if no arg is passed in.
                var span = span ? span : 0;
                var newDate = new Date();
                var formattedMonth = ((newDate.getMonth() + 1) < 10) ? ('0' + (newDate.getMonth() + 1)) : (newDate.getMonth() + 1);
                var date = (newDate.getFullYear() + span) + formattedMonth + newDate.getDate() + '00';

                return date;
            };
        };


        return DataController;
    });