/**
 * Using Require.js to define a module responsible for creating a Controller object.
 */ 
define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'events_API'
    ],
    function(
        $,
        backbone,
        _,
        ko,
        EventsApi
    ) {
        /**
         * Creates a controller object.
         * @constructor
         * This allows the object to be created in one module and be passed to another.
         * This controller is resposible for retriving all external data required by the app.
         */
        var DataController = function() {
            var _this = this;

            // This variable is used by the callbackSync function to keep count of the data requests made by the user.
            this.dataRequestCount = 0;

            // The API key supplied by eventful.com is required to access the Eventful API.
            this.eventsApiKey = '2J8Xh6BQhcPvkQCd';

            /**
             * 
             * @param {function} func - The title of the book.
             * @param {array} args - The author of the book.
             * @param {object} data - The author of the book.
             * @param {string} args - The author of the book.
             */
            this.callbackSync = function(func, args, data, callbackId) {
                if (callbackId === _this.dataRequestCount) {
                    func(args, data);
                    _this.dataRequestCount = 0;
                }
            };

            /**
             * @param {function} func - The title of the book.
             * @param {string} id - The author of the book.
             */
            this.getEventData = function(id, func) {
                var oArgs = {
                    app_key: _this.eventsApiKey,
                    id: id,
                    page_size: 1,
                };

                /**
                 * 
                 */
                EVDB.API.call("/events/get", oArgs, function(oData) {
                    // Note: this relies on the custom toString() methods below
                    func(oData);
                });
            };

            /**
             * @param {function} func - The title of the book.
             * @param {array} args - The author of the book.
             */
            this.getEventsDataList = function(func, args) {

                // Incrementing the dataRequestCount variable by 1 every time this code is called.
                _this.dataRequestCount += 1;

                // Capturing the current dataRequestCount value as this requests id.
                var callId = _this.dataRequestCount;

                // Formatting the geo-coords for the API request.
                var where = args[5].lat + ',' + args[5].lng;

                // Creating an obj literal to pass as the API request arguments.
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
                 * 
                 */
                EVDB.API.call("/events/search", oArgs, function(oData) {
                    _this.callbackSync(func, args, oData, callId);
                });
            };

             /**
             * @param {function} func - The title of the book.
             * @param {string} uid - The author of the book.
             */
            this.getUserPlaces = function(func, uid) {

                /**
                 * 
                 */
                firebase.database().ref(uid).once('value').then(function(snapshot) {

                    //
                    var places = snapshot.val();

                    //
                    if (places) {
                        $.each(places, function(key, value) {
                            func(value);
                        });
                    } else {
                        _this.getDefaultPlaces(func);
                    }

                });
            };

            /**
             * 
             */
            this.getDefaultPlaces = function(func) {

                /**
                 * 
                 */
                firebase.database().ref("default").once('value').then(function(snapshot) {

                    //
                    var places = snapshot.val();

                    //
                    $.each(places, function(key, value) {
                        func(value);
                    });
                });
            };

            /**
             * @param {object} place - The title of the book.
             * @param {string} uid - The author of the book.
             */
            this.updateUserPlaces = function(place, uid) {
                firebase.database().ref(uid + '/' + place.id).update(place);
            };

            /**
             * @param {object} place - The title of the book.
             * @param {string} uid - The author of the book.
             */
            this.removeUserPlace = function(place, uid) {
                firebase.database().ref(uid + '/' + place.id).remove();
            };

            /**
             * @param {int} span - The time offset in years from current date.
             */
            this.getFormattedDate = function(span){
                var span = span ? span : 0;
                var newDate = new Date();
                var formattedMonth = ((newDate.getMonth() + 1) < 10) ? ('0' + (newDate.getMonth() + 1)) : (newDate.getMonth() + 1);
                var date = (newDate.getFullYear() + span) + formattedMonth + newDate.getDate() + '00';
                return date
            }
        };

       /**
         * @return - sdsvdfva
         */
        return DataController;
    });