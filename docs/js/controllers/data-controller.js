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
            this.getEventData = function (func) {
                var oArgs = {
                            app_key: _this.eventsApiKey,
                            id: "20218701",
                            page_size: 25 ,
                };
                EVDB.API.call("/events/get", oArgs, function(oData) {
                // Note: this relies on the custom toString() methods below
                    func(oData);
                });
            }
            this.getEventsDataList = function(func, args) {
                var where = args[5].lat+','+args[5].lng;
                console.dir(args[5]+','+args[5]);
                var oArgs = {
                    app_key: _this.eventsApiKey,
                    q: "events",
                    where: where, 
                    within: 5,
                    "date": "2015061000-2017122000",
                    page_size: 5,
                    sort_order: "popularity",
                };
                EVDB.API.call("/events/search", oArgs, function(oData) {
                    // Note: this relies on the custom toString() methods below
                    func(args, oData);
                });
            }
        };
        return new DataController();
    });