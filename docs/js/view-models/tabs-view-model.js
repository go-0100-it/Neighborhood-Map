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
        var TabsViewModel = function(place) {
            var _this = this;
            this.tabsList = ['events', 'weather', 'restaurants', 'others'];
            this.place = ko.observable(place);
            this.id = ko.observable(this.place().id);
            this.name = ko.observable(this.place().name);
            this.title = ko.observable('');
            this.address = ko.observable(this.place().address);
            this.lat = ko.observable(this.place().lat);
            this.lng = ko.observable(this.place().lng);
            this.expanded = ko.observable(false);
            this.expandedClass = ko.observable('');
            this.toggleTabsMenu = function() {
                if (_this.expanded()) {
                    _this.expandedClass('');
                } else {
                    _this.expandedClass('responsive');
                }
                _this.expanded(!_this.expanded());
            };
            this.place.subscribe(function() {
                _this.id(_this.place().id);
                _this.name(_this.place().name);
                _this.address(_this.place().address);
                _this.lat(_this.place().lat);
                _this.lng(_this.place().lng);
            });
            this.onClickWeatherTab = function() {
                _this.navigateTab(_this.tabsList[1]);
            };
            this.onClickRestaurantsTab = function() {
                _this.navigateTab(_this.tabsList[2]);
            };
            this.onClickEventsTab = function() {
                _this.navigateTab(_this.tabsList[0]);
            };
            this.onClickOthersTab = function() {
                _this.navigateTab(_this.tabsList[3]);
            };
            this.onClickMapIcon = function() {
                Backbone.history.navigate('#places/' + _this.id() + '/' + _this.name() + '/' + _this.address() + '/' + _this.lat() + '/' + _this.lng(), { trigger: true });
            };
            this.navigateTab = function(tab) {
                _this.toggleTabsMenu();
                Backbone.history.navigate('#' + tab + '/' + _this.id() + '/' + _this.name() + '/' + _this.address() + '/' + _this.lat() + '/' + _this.lng(), { trigger: true });
            };
            return this;
        };
        return TabsViewModel;
    });