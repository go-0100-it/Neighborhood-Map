// More description

define([
        'jquery',
        'backbone',
        'underscore',
        'drawer-menu-item'
    ],
    function($, Backbone, _, DrawerItemView) {

        var DrawerMenuView = Backbone.View.extend({
            el: '#drawer-menu-list',
            render: function() {

                this.model.each(function(menuItem) {
                    var itemView = new DrawerItemView({ model: menuItem }).render();
                    this.$el.append(itemView.$el);
                    itemView.$el.attr('id', menuItem.toJSON());
                }, this);

                return this;
            }
        });
        return DrawerMenuView;
    });