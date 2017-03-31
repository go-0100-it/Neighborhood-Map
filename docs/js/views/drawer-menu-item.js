define([
        'jquery',
        'backbone',
        'underscore',
        'drawer_menu_model',
        'util'
    ],
    function($, Backbone, _, DrawerMenuItem, tpl) {

        var DrawerItemView = Backbone.View.extend({
            model: new DrawerMenuItem(),
            tagName: 'li',
            className: 'drawer-list-item',
            events: {
                'click': 'onClick'
            },
            onClick: function() {
                console.log("You clicked a drawer item");
                // var date = new Date();
                // postStartTime();
            },
            initialize: function() {
                console.log(_);
                this.template = _.template(tpl.get('drawer-menu-item'));
            },
            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        });
        return DrawerItemView;
    });