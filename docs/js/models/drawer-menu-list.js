// More description

define(['jquery', 'backbone', 'underscore', 'drawer_menu_model'], function($, Backbone, _, DrawerMenuModel) {
    var DrawerList = Backbone.Collection.extend({
        model: DrawerMenuModel
    });
    return DrawerList;
});