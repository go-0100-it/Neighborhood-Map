define(['main_controller', 'map_controller'],
    function(MainController, MapController) { // TODO: Need to require USER

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
                'news/:name/:address/:position': 'news',
                'events/:name/:address/:position': 'events',
                'weather/:name/:address/:position': 'weather',
                'real-estate/:name/:address/:position': 'real-estate'
            },

            'places': function() {
                alert('Loading places view');

                // Calling function @ Maincontroller to create the drawer list
                MapController().init(MainController.renderDrawerListView());
                /* TODO:
                   MainController.renderGoogleMap();
                */
            },

            'news': function(name, address, position) {
                var obj = { name: name, address: address, position: position };
                MainController.renderDrawerListView();
                MainController.renderNewsView(obj);
                /* TODO:
                   MainController.renderNewsTabView();
                */
            },
            'events': function(name, address, position) {
                var obj = { name: name, address: address, position: position };
                MainController.renderDrawerListView();
                MainController.renderEventsView(obj);
                /* TODO:
                   MainControllner.renderEventsTabView();
                */
            },
            'weather': function(name, address, position) {
                var obj = { name: name, address: address, position: position };
                MainController.renderDrawerListView();
                MainController.renderWeatherView(obj);
                /* TODO:
                   MainController.renderWeatherTabView();
                */
            },
            'real-estate': function(name, address, position) {
                var obj = { name: name, address: address, position: position };
                MainController.renderDrawerListView();
                MainController.renderRealEstateView(obj);
                /* TODO:
                   MainController.renderRealEstateTabView();
                */
            },
        });
        return Router;
    });