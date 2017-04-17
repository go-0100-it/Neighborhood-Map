// More description

define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'tabs_view_model',
        'tabs_view',
        'news_list_view_model',
        'news_view',
        'events_list_view_model',
        'events_view',
        'weather_list_view_model',
        'weather_view',
        'real_estate_list_view_model',
        'real_estate_view'
    ],
    function(
        $,
        backbone,
        _,
        ko,
        TabsViewModel,
        TabsView,
        NewsListViewModel,
        NewsView,
        EventsListViewModel,
        EventsView,
        WeatherListViewModel,
        WeatherView,
        RealEstateListViewModel,
        RealEstateView
    ) {

        var Main = function() {
            var _this = this;

            // Returning function that can be called to create drawer menu items, creates a collection from created items and using knockout via 
            // knockback bridge to render list into the view. The list created is an observable collection (array).  This means knockout will dynamiclly update the UI when the 
            // collection is changed.
            this.renderDrawerListView = function() {
                require(['drawer_list_view_model', 'drawer_list_view', 'map_controller'], function(DrawerListViewModel, DrawerListView, Map) {
                    _this.drawerListView = new DrawerListView().render();

                    // creating an array of new Backbone models for the individual items of the collection.
                    _this.places = [{ name: 'My home address', address: '33 Fisher St, Brantford, Ontario', position: { lat: 43.122680, lng: -80.302352 } },
                        { name: 'CN Tower', address: '301 Front St W, Toronto, Ontario', position: { lat: 43.6426, lng: -79.3871 } },
                        { name: 'Niagra Falls Canada', address: 'Niagra Falls, Ontario, Canada', position: { lat: 43.083354, lng: -79.074129 } },
                        { name: 'Center Island Toronto', address: 'Toronto, ON M5J 2V3, Canada', position: { lat: 43.623409, lng: -79.368683 } },
                        { name: 'Home for sale', address: '42 Chaucer Pl, Woodstock, Ontario', position: { lat: 43.123772, lng: -80.728070 } }
                    ];

                    _this.map = new Map();
                    _this.map.init(_this.places);
                    // creating a new Backbone collection and passing it to the DrawerListViewModel to create an observable collection 
                    _this.placesViewModel = new DrawerListViewModel(_this.places, _this.map);
                    if (!!!ko.dataFor($('#drawer-menu-container')[0])) {
                        ko.applyBindings(_this.placesViewModel, $('#drawer-menu-container')[0]);
                    }
                });
            };

            this.renderTabsView = function(place) {
                _this.renderView('tabsView', TabsView, 'tabsViewModel', TabsViewModel, '#tabs-container', place);
            };

            this.renderNewsView = function(place) {
                _this.renderView('newsView', NewsView, 'newsListViewModel', NewsListViewModel, '#news-view', place);
            };
            this.renderEventsView = function(place) {
                _this.renderView('eventsView', EventsView, 'eventsListViewModel', EventsListViewModel, '#events-view', place);
            };
            this.renderWeatherView = function(place) {
                _this.renderView('weatherView', WeatherView, 'weatherListViewModel', WeatherListViewModel, '#weather-view', place);
            };
            this.renderRealEstateView = function(place) {
                _this.renderView('realEstateView', RealEstateView, 'realEstateViewModel', RealEstateListViewModel, '#real-estate-view', place);
            };
            this.renderView = function(view, viewConstructor, viewModel, viewModelConstructor, el, place) {
                _this[view] = new viewConstructor().render();

                _this[viewModel] = new viewModelConstructor({ name: place.name, address: place.address, position: place.position });
                if (!!!ko.dataFor($(el)[0])) {
                    ko.applyBindings(_this[viewModel], $(el)[0]);
                }
            };
        };
        return new Main();
    });