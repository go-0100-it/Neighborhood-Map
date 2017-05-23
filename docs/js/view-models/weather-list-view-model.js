/**
 * Using Require.js to define a module responsible for...
 */
define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'main_controller'
    ],
    function($, Backbone, _, ko, MainController) {
        var WeatherListViewModel = function(place, data, isError, main) {
            var _this = this;
            var Main = main;
            this.id = ko.observable(place.id);
            this.name = ko.observable(place.name);
            this.address = ko.observable(place.address);
            this.lat = ko.observable(place.lat);
            this.lng = ko.observable(place.lng);
            this.data = ko.observable(data);
            this.isErr = ko.observable(isError);
            console.log(Main.map);
            return this;
        };
        return WeatherListViewModel;
    });