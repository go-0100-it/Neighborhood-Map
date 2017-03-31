// More description

define([
        'jquery',
        'backbone',
        'underscore',
        'drawer_item_view'
    ],
    function($, Backbone, _, DrawerItemView) {

        var DrawerMenuView = Backbone.View.extend({
            el: '#drawer-menu-list',
            render: function() {

                this.model.each(function(item) {
                    console.log(item);
                    var itemView = new DrawerItemView({ model: item }).render();
                    this.$el.append(itemView.$el);
                    //itemView.$el.attr('id', menuItem.toJSON());
                }, this);

                return this;
            }
        });
        return DrawerMenuView;
    });