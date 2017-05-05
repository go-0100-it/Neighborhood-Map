/**
 * Using Require.js to define a module responsible for...
 */
define(['jquery', 'main_controller'],
    function($, MainController) { // TODO: Need to require USER

        var Router = Backbone.Router.extend({
            // Constructor
            initialize: function() {
                //Required for Backbone to start listening to hashchange events
                Backbone.history.start();
            },

            routes: {

                // Calls the home method when there is no hashtag on the url
                '': 'places',
                'places': 'places',
                'events/:id/:name/:address/:lat/:lng': 'events',
                'weather/:id/:name/:address/:lat/:lng': 'weather',
                'real-estate/:id/:name/:address/:lat/:lng': 'real-estate'
            },

            'places': function() {
                // Calling function @ Maincontroller to create the drawer list
                console.log("Calling Drawer");
                MainController.renderDrawerListView();
                $('#container-view').hide();
                $('#map-container-view').show();
            },
            'events': function(id, name, address, lat, lng) {
                var obj = { id: id, name: name, address: address, lat: lat, lng: lng };
                MainController.renderTabsView(obj, 'events');

            },
            'weather': function(id, name, address, lat, lng) {
                var obj = { id: id, name: name, address: address, lat: lat, lng: lng };
                MainController.renderTabsView(obj, 'weather');

            },
            'real-estate': function(id, name, address, lat, lng) {
                var obj = { id: id, name: name, address: address, lat: lat, lng: lng };
                MainController.renderTabsView(obj, 'real-estate');

            },
        });
        return Router;
    });