// More description

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

        var DataController = function() {
            var _this = this;
            this.dataRequestCount = 0;
            this.eventsApiKey = '2J8Xh6BQhcPvkQCd';
            this.callbackSync = function(func, args, data, callbackId) {
                if (callbackId === _this.dataRequestCount) {
                    func(args, data);
                    _this.dataRequestCount = 0;
                }
            };
            this.getEventData = function(id, func) {
                var oArgs = {
                    app_key: _this.eventsApiKey,
                    id: id,
                    page_size: 1,
                };
                EVDB.API.call("/events/get", oArgs, function(oData) {
                    // Note: this relies on the custom toString() methods below
                    func(oData);
                });
            };
            this.getEventsDataList = function(func, args) {
                _this.dataRequestCount += 1;
                var callId = _this.dataRequestCount;
                var newDate = new Date();
                var formattedMonthStart = ((newDate.getMonth() + 1) < 10) ? ('0' + (newDate.getMonth() + 1)) : (newDate.getMonth() + 1);
                var startDate = newDate.getFullYear() + formattedMonthStart + newDate.getDate() + '00';
                var formattedMonthEnd = ((newDate.getMonth() + 1) < 10) ? ('0' + (newDate.getMonth() + 1)) : (newDate.getMonth() + 1);
                var endDate = (newDate.getFullYear() + 1) + formattedMonthEnd + newDate.getDate() + '00';
                console.log(startDate);
                var where = args[5].lat + ',' + args[5].lng;
                console.dir(args[5] + ',' + args[5]);
                var oArgs = {
                    app_key: _this.eventsApiKey,
                    q: "events",
                    where: where,
                    within: 10,
                    "date": startDate + '-' + endDate,
                    page_size: 40,
                    sort_order: "date",
                    sort_direction: 'ascending'
                };
                EVDB.API.call("/events/search", oArgs, function(oData) {
                    _this.callbackSync(func, args, oData, callId)
                });
            };
            this.getDefaultPlaces = function(func) {
                return [{ name: 'My Home Address', address: '33 Fisher St, Brantford, Ontario', lat: 43.12268, lng: -80.302352 },
                    { name: 'CN Tower', address: '301 Front St W, Toronto, Ontario', lat: 43.6426, lng: -79.3871 },
                    { name: 'Niagra Falls Canada', address: 'Niagra Falls, Ontario, Canada', lat: 43.083354, lng: -79.074129 },
                    { name: 'Center Island Toronto', address: 'Toronto, ON M5J 2V3, Canada', lat: 43.623409, lng: -79.368683 },
                    { name: 'Home for sale', address: '42 Chaucer Pl, Woodstock, Ontario', lat: 43.123772, lng: -80.72807 }
                ];
            };
            this.getUserPlaces = function(func) {
                firebase.database().ref("default").once('value').then(function(snapshot) {
                    var places = snapshot.val();
                    console.log(places);
                    $.each(places, function(key, value) {
                        func(value);
                    });
                });
            };
            this.updateUserPlaces = function(place) {
                //Use to add place to places data in firebase database
                console.log('Place: ' + place);
            };
        };
        return DataController;
    });