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
        var WeatherListViewModel = function(place, data, isError) {
            var _this = this;
            this.id = ko.observable(place.id);
            this.name = ko.observable(place.name);
            this.address = ko.observable(place.address);
            this.lat = ko.observable(place.lat);
            this.lng = ko.observable(place.lng);
            this.data = ko.observable(data);
            this.isErr = ko.observable(isError);
            return this;
        };
        return WeatherListViewModel;
    });