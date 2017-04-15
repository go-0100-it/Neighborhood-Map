define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'router'
    ],
    function($, Backbone, _, ko) {
        var NewsListViewModel = function(place) {
            var _this = this;

            this.name = ko.observable(place.name);
            this.address = ko.observable(place.address);
            this.position = ko.observable(place.position);
            this.onClickWeatherTab = function() {
                Backbone.history.navigate('#weather/' + _this.name() + '/' + _this.address() + '/' + _this.position(), { trigger: true });
            };
            this.onClickEventsTab = function() {
                Backbone.history.navigate('#events/' + _this.name() + '/' + _this.address() + '/' + _this.position(), { trigger: true });
            };
            this.onClickRealEstateTab = function() {
                Backbone.history.navigate('#real-estate/' + _this.name() + '/' + _this.address() + '/' + _this.position(), { trigger: true });
            };

            return this;
        };
        return NewsListViewModel;
    });