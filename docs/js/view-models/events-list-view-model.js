/**
 * Using Require.js to define a module responsible for...
 */
define([
        'jquery',
        'backbone',
        'underscore',
        'knockout'
    ],
    function($, Backbone, _, ko) {
        var EventsListViewModel = function(place, data) {
            var _this = this;
            this.id = ko.observable(place.id);
            this.name = ko.observable(place.name);
            this.address = ko.observable(place.address);
            this.lat = ko.observable(place.lat);
            this.lng = ko.observable(place.lng);
            this.data = ko.observableArray(data.events.event);
            return this;
        };
        return EventsListViewModel;
    });