// More description

define(['jquery', 'backbone', 'underscore'], function($, Backbone, _) {
    var DrawerMenuItem = Backbone.Model.extend({

        defaults: function() {
            return {
                name: 'Place name',
                address: 'Place address',
                position: {
                    lat: 0,
                    lng: 0
                }
            };
        }
    });
    return DrawerMenuItem;
});