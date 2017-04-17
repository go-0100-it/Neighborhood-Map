// More description

define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'drawer_list_view_model',
        'tabs_view_model',
        'news_list_view_model',
        'weather_list_view_model',
        'events_list_view_model',
        'real_estate_list_view_model',
        'drawer_list_view',
        'tabs_view',
        'map_view',
        'news_view',
        'events_view',
        'weather_view',
        'real_estate_view',
        'map_controller'
    ],
    function(
        $,
        backbone,
        _,
        ko,
        DrawerListViewModel,
        TabsViewModel,
        NewsListViewModel,
        WeatherListViewModel,
        EventsListViewModel,
        RealEstateListViewModel,
        DrawerListView,
        TabsView,
        MapView,
        NewsView,
        EventsView,
        WeatherView,
        RealEstateView,
        MapController
    ) {

        var main = function() {
            var _this = this;

            // Returning function that can be called to create drawer menu items, creates a collection from created items and using knockout via 
            // knockback bridge to render list into the view. The list created is an observable collection (array).  This means knockout will dynamiclly update the UI when the 
            // collection is changed.
            this.renderDrawerListView = function() {

                _this.listRendered = false;
                _this.drawerListView = new DrawerListView().render();

                // creating an array of new Backbone models for the individual items of the collection.
                _this.places = [{ name: 'My home address', address: '33 Fisher St, Brantford, Ontario', position: { lat: 43.122680, lng: -80.302352 } },
                    { name: 'CN Tower', address: '301 Front St W, Toronto, Ontario', position: { lat: 43.6426, lng: -79.3871 } },
                    { name: 'Niagra Falls Canada', address: 'Niagra Falls, Ontario, Canada', position: { lat: 43.083354, lng: -79.074129 } },
                    { name: 'Center Island Toronto', address: 'Toronto, ON M5J 2V3, Canada', position: { lat: 43.623409, lng: -79.368683 } },
                    { name: 'Home for sale', address: '42 Chaucer Pl, Woodstock, Ontario', position: { lat: 43.123772, lng: -80.728070 } }
                ];

                // creating a new Backbone collection and passing it to the DrawerListViewModel to create an observable collection 
                var placesViewModel = new DrawerListViewModel(_this.places);
                if (!_this.listRendered) {
                    ko.applyBindings(placesViewModel, $('#drawer-menu-container')[0]);
                    _this.listRendered = true;
                }
                return placesViewModel.places();
            };

            this.renderTabsView = function(place) {
                _this.tabsView = new TabsView().render();

                var tabsViewModel = new TabsViewModel({ name: place.name, address: place.address, position: place.position });

                ko.applyBindings(tabsViewModel, $('#tabs-container')[0]);
            };

            this.renderNewsView = function(place) {
                require([], function() {
                    var newsView = new NewsView().render();

                    var newsListViewModel = new NewsListViewModel({ name: place.name, address: place.address, position: place.position });

                    ko.applyBindings(newsListViewModel, $('#news-view')[0]);
                });
            };
            this.renderEventsView = function(place) {

                var eventsView = new EventsView().render();

                var eventsListViewModel = new EventsListViewModel({ name: place.name, address: place.address, position: place.position, lat: place.lat, lng: place.lng });

                ko.applyBindings(eventsListViewModel, $('#events-view')[0]);

            };
            this.renderWeatherView = function(place) {

                var weatherView = new WeatherView().render();

                var weatherListViewModel = new WeatherListViewModel({ name: place.name, address: place.address, position: place.position });

                ko.applyBindings(weatherListViewModel, $('#weather-view')[0]);

            };
            this.renderRealEstateView = function(place) {

                var realEstateView = new RealEstateView().render();

                var realEstateViewModel = new RealEstateListViewModel({ name: place.name, address: place.address, position: place.position });

                ko.applyBindings(realEstateViewModel, $('#real-estate-view')[0]);

            };
            this.renderMap = function() {
                _this.map = MapController();
                return _this.map;
            };
            return this;
        };
        return main;
    });