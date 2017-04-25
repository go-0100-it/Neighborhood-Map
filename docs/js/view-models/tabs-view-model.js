define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'router'
    ],
    function($, Backbone, _, ko) {
        var TabsViewModel = function(place) {
            var _this = this;
            console.log(place);
            this.place = place;
            this.name = ko.observable(this.place.name);
            this.address = ko.observable(this.place.address);
            this.lat = ko.observable(this.place.lat);
            this.lng = ko.observable(this.place.lng);
            this.expandTabsMenu = function() {
                var el = document.getElementById("tabs");
                if (el.className === "tabs") {
                    el.className += " responsive";
                } else {
                    el.className = "tabs";
                }
            };
            this.updatePlaces = function(place) {
                this.name(place.name);
                this.address(place.address);
                this.lat(place.lat);
                this.lng(place.lng);
            };
            this.onClickWeatherTab = function() {
                Backbone.history.navigate('#weather/' + _this.name + '/' + _this.address + '/' + _this.place.lat + '/' + _this.place.lng, { trigger: true });
            };
            this.onClickRealEstateTab = function() {
                Backbone.history.navigate('#real-estate/' + _this.place.name + '/' + _this.place.address + '/' + _this.place.lat + '/' + _this.place.lng, { trigger: true });
            };
            this.onClickEventsTab = function() {
                Backbone.history.navigate('#events/' + _this.place.name + '/' + _this.place.address + '/' + _this.place.lat + '/' + _this.place.lng, { trigger: true });
            };
            this.onClickMapIcon = function() {
                Backbone.history.navigate('#places', { trigger: true });
            };
            return this;
        };
        return TabsViewModel;
    });