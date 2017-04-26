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
            this.place = ko.observable(place);
            this.name = ko.observable(this.place().name);
            this.address = ko.observable(this.place().address);
            this.lat = ko.observable(this.place().lat);
            this.lng = ko.observable(this.place().lng);
            this.expandTabsMenu = function() {
                var el = document.getElementById("tabs");
                if (el.className === "tabs") {
                    el.className += " responsive";
                } else {
                    el.className = "tabs";
                }
            };
            this.place.subscribe(function() {
                _this.name(_this.place().name);
                _this.address(_this.place().address);
                _this.lat(_this.place().lat);
                _this.lng(_this.place().lng);
            });
            this.onClickWeatherTab = function() {
                _this.navigateTab('weather');
            };
            this.onClickRealEstateTab = function() {
                _this.navigateTab('real-estate');
            };
            this.onClickEventsTab = function() {
                _this.navigateTab('events');
            };
            this.onClickMapIcon = function() {
                Backbone.history.navigate('#places', { trigger: true });
            };
            this.navigateTab = function(tab) {
                Backbone.history.navigate('#' + tab + '/' + _this.name() + '/' + _this.address() + '/' + _this.lat() + '/' + _this.lng(), { trigger: true });
            };
            return this;
        };
        return TabsViewModel;
    });