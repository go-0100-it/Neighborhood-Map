// More description

define(['jquery', 'backbone', 'underscore'], function($, Backbone, _) {
    var DrawerList = Backbone.Collection.extend({
        model: Times.Times,
        url: 'https://time-tracker-b63cd.firebaseio.com/times'
    });
    return DrawerList;
});