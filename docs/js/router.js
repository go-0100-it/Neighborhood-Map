define(['main_controller'],
    function(MainController) { // TODO: Need to require USER
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
                'news': 'news',
                'events': 'events',
                'weather': 'weather',
                'real-estate': 'real-estate'
            },

            'places': function() {
                alert('Loading places view');

                // Calling function @ Maincontroller to create the drawer list.
                MainController.renderDrawerListView();
                /* TODO:
                   MainController.renderGoogleMap();
                */
            },

            'news': function() {
                alert('Loading news view');
                /* TODO:
                   MainController.renderNewsTabView();
                */
            },
            'events': function() {
                alert('Loading events view');
                /* TODO:
                   MainController.renderEventsTabView();
                */
            },
            'weather': function() {
                alert('Loading weather view');
                /* TODO:
                   MainController.renderWeatherTabView();
                */
            },
            'real-estate': function() {
                alert('Loading real-estate view');
                /* TODO:
                   MainController.renderRealEstateTabView();
                */
            },
        });
        return Router;
    });