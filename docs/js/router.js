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
                '': 'placesOnMap',
                'places/:id/:name/:address/:lat/:lng': 'placeOnMap',
                'events/:id/:name/:address/:lat/:lng': 'events',
                'weather/:id/:name/:address/:lat/:lng': 'weather',
                'restaurants/:id/:name/:address/:lat/:lng': 'restaurants'
            },
            'placesOnMap': function() {
                // Calling function @ Maincontroller to create the drawer list
                MainController.renderDrawerListView();
                MainController.showMap();
            },
            'placeOnMap': function(id, name, address, lat, lng) {
                // Calling function @ Maincontroller to create the drawer list
                var place = { id: id, name: name, address: address, lat: lat, lng: lng };
                MainController.renderDrawerListView(place);
                MainController.showMap();
            },
            'events': function(id, name, address, lat, lng) {
                var place = { id: id, name: name, address: address, lat: lat, lng: lng };
                MainController.renderTabView(place, 'events');
            },
            'weather': function(id, name, address, lat, lng) {
                var place = { id: id, name: name, address: address, lat: lat, lng: lng };
                MainController.renderTabView(place, 'weather');
            },
            'restaurants': function(id, name, address, lat, lng) {
                var place = { id: id, name: name, address: address, lat: lat, lng: lng };
                MainController.renderTabView(place, 'restaurants');
            },
        });
        return Router;
    });