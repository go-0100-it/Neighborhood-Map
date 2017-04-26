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
            this.eventsApiKey = '2J8Xh6BQhcPvkQCd';
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
                this.prototype.callback = func;
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
                    // Note: this relies on the custom toString() methods below
                    this.callback(args, oData);
                });
            };
            this.updatePlacesData = function(place) {
                //Use to add place to places data in firebase database
                console.log('Place: ' + place);
            };
        };
        return new DataController();
    });