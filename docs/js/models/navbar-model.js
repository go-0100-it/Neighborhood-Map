// More description

define(['jquery', 'backbone', 'underscore'], function($, Backbone, _) {
    var Navbar = Backbone.Model.extend({
        defaults: function() {
            return {};
        }
    });
    return Navbar;
});