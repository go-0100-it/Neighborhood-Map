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
            this.userPlaces = 0;
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
                    _this.callbackSync(func, args, oData, callId);
                });
            };
            this.getUserPlaces = function(func, uid) {
                firebase.database().ref(uid).once('value').then(function(snapshot) {
                    var places = snapshot.val();
                    console.log(uid);
                    if (places) {
                        console.log(places);
                        $.each(places, function(key, value) {
                            func(value, places.length);
                        });
                    } else {
                        _this.getDefaultPlaces(func);
                    }

                });
            };
            this.getDefaultPlaces = function(func) {
                firebase.database().ref("default").once('value').then(function(snapshot) {
                    var places = snapshot.val();
                    $.each(places, function(key, value) {
                        func(value, places.length);
                    });
                });
            };
            this.updateUserPlaces = function(place, uid) {
                _this.userPlaces += 1;
                firebase.database().ref(uid + '/place_'+ _this.userPlaces).update(place);
                console.log('Place: ' + place);
            };
        };
        return DataController;
    });