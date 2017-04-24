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
            this.name = ko.observable(place.name);
            this.address = ko.observable(place.address);
            this.lat = ko.observable(place.lat);
            this.lng = ko.observable(place.lng);
            this.expandTabsMenu = function() {
                var x = document.getElementById("myTopnav");
                if (x.className === "topnav") {
                    x.className += " responsive";
                } else {
                    x.className = "topnav";
                }
            };
            this.onClickWeatherTab = function() {
                Backbone.history.navigate('#weather/' + _this.name() + '/' + _this.address() + '/' + _this.lat() + '/' + _this.lng(), { trigger: true });
            };
            this.onClickRealEstateTab = function() {
                Backbone.history.navigate('#real-estate/' + _this.place.name + '/' + _this.place.address + '/' + _this.place.position, { trigger: true });
            };
            this.onClickEventsTab = function() {
                Backbone.history.navigate('#events/' + _this.place.name + '/' + _this.place.address + '/' + _this.place.position, { trigger: true });
            };
            this.onClickMapIcon = function() {
                Backbone.history.navigate('#places', { trigger: true });
            };
            return this;
        };
        return TabsViewModel;
    });