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
            this.name = ko.observable(place.name);
            this.address = ko.observable(place.address);
            this.position = ko.observable(place.position);
            return this;
        };
        return WeatherListViewModel;
    });