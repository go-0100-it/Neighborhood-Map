define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'router'
    ],
    function($, Backbone, _, ko) {
        var WeatherListViewModel = function(place) {
            var _this = this;
            this.id = ko.observable(place.id);
            this.name = ko.observable(place.name);
            this.address = ko.observable(place.address);
            this.lat = ko.observable(place.lat);
            this.lng = ko.observable(place.lng);
            return this;
        };
        return WeatherListViewModel;
    });