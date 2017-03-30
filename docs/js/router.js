define([],
    function() { // TODO: Need to require USER
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
            },

            'news': function() {
                alert('Loading news view');
            },
            'events': function() {
                alert('Loading events view');
            },
            'weather': function() {
               alert('Loading weather view');
            },
            'real-estate': function() {
                alert('Loading real-estate view');
            },
        });
        return Router;
    });