define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'router'
    ],
    function($, Backbone, _, ko) {
        var EventsListViewModel = function(place) {
            var _this = this;
            this.name = ko.observable(place.name);
            this.address = ko.observable(place.address);
            this.position = ko.observable(place.position);
            this.api_key = '2J8Xh6BQhcPvkQCd';

            return this;
        };
        return EventsListViewModel;
    });