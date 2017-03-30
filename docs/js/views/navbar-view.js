define([
        'jquery',
        'backbone',
        'underscore',
        'times_controller',
        'util'
    ],
    function($, Backbone, _, timesController, tpl) {
        var NavbarView = Backbone.View.extend({
            el: '#nav',
            events: {
                'click #gps': 'onClickGPS',
                'click #options-menu-btn': 'onClickOptions'
            },
            onClickOptions: function() {
                this.onClick('Options Menu');
            },
            onClick: function(button) {
                alert('You clicked the ' + button + ' button');
                $(this).trigger('clickFromNav', button);
            },
            initialize: function() {
                this.template = _.template(tpl.get('navbar-view'));
            },
            render: function() {
                this.$el.html(this.template());
                return this;
            }
        });
        return NavbarView;

    });