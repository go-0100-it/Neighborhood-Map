/**
 * Using Require.js to define a module responsible for...
 */
define([
        'jquery',
        'backbone',
        'underscore',
        'util'
    ],
    function($, Backbone, _, tpl) {
        var WeatherView = Backbone.View.extend({
            el: '#tab-container',
            initialize: function() {
                this.template = _.template(tpl.get('weather-view'));
            },
            render: function() {
                this.$el.html(this.template());
                return this;
            }
        });
        return WeatherView;
    });