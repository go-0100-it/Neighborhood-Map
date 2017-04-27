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
            this.tabsList = ['events', 'weather', 'real-estate'];
            this.place = ko.observable(place);
            this.name = ko.observable(this.place().name);
            this.address = ko.observable(this.place().address);
            this.lat = ko.observable(this.place().lat);
            this.lng = ko.observable(this.place().lng);
            this.expanded = ko.observable(false);
            this.expandedClass = ko.observable('');
            this.selected = ko.observable('');
            this.selected.subscribe(function(){

            });
            this.selectedClass = ko.observable('selected');
            this.toggleTabsMenu = function() {
                if (_this.expanded()) {
                    _this.expandedClass('');
                } else{
                    _this.expandedClass('responsive');
                }
                _this.expanded(!_this.expanded());
            };
            this.place.subscribe(function() {
                _this.name(_this.place().name);
                _this.address(_this.place().address);
                _this.lat(_this.place().lat);
                _this.lng(_this.place().lng);
            });
            this.onClickWeatherTab = function() {
                _this.navigateTab(_this.tabsList[1]);
            };
            this.onClickRealEstateTab = function() {
                _this.navigateTab(_this.tabsList[2]);
            };
            this.onClickEventsTab = function() {
                _this.navigateTab(_this.tabsList[0]);
            };
            this.onClickMapIcon = function() {
                Backbone.history.navigate('#places', { trigger: true });
            };
            this.navigateTab = function(tab) {
                _this.toggleTabsMenu();
                Backbone.history.navigate('#' + tab + '/' + _this.name() + '/' + _this.address() + '/' + _this.lat() + '/' + _this.lng(), { trigger: true });
            };
            return this;
        };
        return TabsViewModel;
    });