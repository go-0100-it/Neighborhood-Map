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
                'events/:name/:address/:lat/:lng': 'events',
                'weather/:name/:address/:lat/:lng': 'weather',
                'real-estate/:name/:address/:lat/:lng': 'real-estate'
            },

            'places': function() {
                // Calling function @ Maincontroller to create the drawer list
                MainController.renderDrawerListView();
                $('#container-view').hide();
                $('#map-container-view').show();
            },
            'events': function(name, address, lat, lng) {
                var obj = { name: name, address: address, lat: lat, lng: lng };
                MainController.renderTabsView(obj, 'events');

            },
            'weather': function(name, address, lat, lng) {
                var obj = { name: name, address: address, lat: lat, lng: lng };
                MainController.renderTabsView(obj, 'weather');

            },
            'real-estate': function(name, address, lat, lng) {
                var obj = { name: name, address: address, lat: lat, lng: lng };
                MainController.renderTabsView(obj, 'real-estate');

            },
        });
        return Router;
    });