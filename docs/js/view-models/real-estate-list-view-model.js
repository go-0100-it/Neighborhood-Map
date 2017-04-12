define([
        'jquery',
        'backbone',
        'underscore',
        'knockback',
        'knockout',
        'router'
    ],
    function($, Backbone, _, kb, ko) {
        var RealEstateListViewModel = function(place) {
            var _this = this;

            this.name = kb.observable(place, 'name');
            this.address = kb.observable(place, 'address');
            this.position = kb.observable(place, 'position');
            this.onClickEventsTab = function() {
                Backbone.history.navigate('#events/' + _this.name() + '/' + _this.address() + '/' + _this.position(), { trigger: true });
            };
            this.onClickNewsTab = function() {
                Backbone.history.navigate('#news/' + _this.name() + '/' + _this.address() + '/' + _this.position(), { trigger: true });
            };
            this.onClickWeatherTab = function() {
                Backbone.history.navigate('#weather/' + _this.name() + '/' + _this.address() + '/' + _this.position(), { trigger: true });
            };

            return this;
        };
        return RealEstateListViewModel;
    });