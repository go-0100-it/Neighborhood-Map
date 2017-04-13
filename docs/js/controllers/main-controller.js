// More description

define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'drawer_list_view_model',
        'news_list_view_model',
        'weather_list_view_model',
        'events_list_view_model',
        'real_estate_list_view_model',
        'drawer_list_view',
        'map_view',
        'news_view',
        'events_view',
        'weather_view',
        'real_estate_view'
    ],
    function(
        $,
        backbone,
        _,
        ko,
        DrawerListViewModel,
        NewsListViewModel,
        WeatherListViewModel,
        EventsListViewModel,
        RealEstateListViewModel,
        DrawerListView,
        MapView,
        NewsView,
        EventsView,
        WeatherView,
        RealEstateView
    ) {

        var listRendered;

        var drawerListView = new DrawerListView().render();

        return {
            // Returning function that can be called to create drawer menu items, creates a collection from created items and using knockout via 
            // knockback bridge to render list into the view. The list created is an observable collection (array).  This means knockout will dynamiclly update the UI when the 
            // collection is changed.
            renderDrawerListView: function() {

                // creating an array of new Backbone models for the individual items of the collection.
                var places = [{ name: 'My current address', address: 'here', position: { lat: 43.6898244, lng: -79.61650999999999 } },
                    { name: 'Cabin in the woods', address: 'here', position: { lat: 43.9898244, lng: -79.31650999999999 } },
                    { name: 'Colorado Springs Home', address: 'here', position: { lat: 43.7898244, lng: -79.21650999999999 } },
                    { name: 'Sports complex Indiana', address: 'here', position: { lat: 43.6398244, lng: -79.91650999999999 } },
                    { name: 'Florida Home Resort', address: 'here', position: { lat: 43.7398244, lng: -79.81650999999999 } }
                ];

                // creating a new Backbone collection and passing it to the DrawerListViewModel to create an observable collection 
                var placesViewModel = new DrawerListViewModel(places);
                if (!listRendered) {
                    ko.applyBindings(placesViewModel, $('#drawer-menu-container')[0]);
                    listRendered = true;
                }
                return placesViewModel.places();
            },

            renderNewsView: function(place) {
                require([], function() {
                    var newsView = new NewsView().render();

                    var newsListViewModel = new NewsListViewModel({ name: place.name, address: place.address, position: place.position });

                    ko.applyBindings(newsListViewModel, $('#news-view')[0]);
                });
            },
            renderEventsView: function(place) {

                var eventsView = new EventsView().render();

                var eventsListViewModel = new EventsListViewModel({ name: place.name, address: place.address, position: place.position, lat: place.lat, lng: place.lng });

                ko.applyBindings(eventsListViewModel, $('#events-view')[0]);

            },
            renderWeatherView: function(place) {

                var weatherView = new WeatherView().render();

                var weatherListViewModel = new WeatherListViewModel({ name: place.name, address: place.address, position: place.position });

                ko.applyBindings(weatherListViewModel, $('#weather-view')[0]);

            },
            renderRealEstateView: function(place) {

                var realEstateView = new RealEstateView().render();

                var realEstateViewModel = new RealEstateListViewModel({ name: place.name, address: place.address, position: place.position });

                ko.applyBindings(realEstateViewModel, $('#real-estate-view')[0]);

            }
        };
    });