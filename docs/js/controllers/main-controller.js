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
        'real_estate_view',
        'data_controller'
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
        RealEstateView,
        DataController
    ) {

        var Main = function() {
            var _this = this;
            // Returning function that can be called to create drawer menu items, creates a collection from created items and using knockout via 
            // knockback bridge to render list into the view. The list created is an observable collection (array).  This means knockout will dynamiclly update the UI when the 
            // collection is changed.
            this.renderDrawerListView = function() {
                require(['drawer_list_view_model', 'drawer_list_view', 'map_controller'], function(DrawerListViewModel, DrawerListView, Map) {
                    if (!_this.drawerListView) {
                        _this.drawerListView = new DrawerListView().render();

                        // creating an array of new Backbone models for the individual items of the collection.
                        _this.places = [{ name: 'My home address', address: '33 Fisher St, Brantford, Ontario', lat: 43.122680, lng: -80.302352 },
                            { name: 'CN Tower', address: '301 Front St W, Toronto, Ontario', lat: 43.6426, lng: -79.3871 },
                            { name: 'Niagra Falls Canada', address: 'Niagra Falls, Ontario, Canada', lat: 43.083354, lng: -79.074129 },
                            { name: 'Center Island Toronto', address: 'Toronto, ON M5J 2V3, Canada', lat: 43.623409, lng: -79.368683 },
                            { name: 'Home for sale', address: '42 Chaucer Pl, Woodstock, Ontario', lat: 43.123772, lng: -80.728070 }
                        ];

                        _this.map = new Map();
                        _this.map.init(_this.places);
                        // creating a new Backbone collection and passing it to the DrawerListViewModel to create an observable collection 
                        _this.placesViewModel = new DrawerListViewModel(_this.places, _this.map);
                        ko.applyBindings(_this.placesViewModel, $('#drawer-menu-container')[0]);
                    }
                });
            };
            this.renderTabsView = function(place, view) {
                this.renderDrawerListView();
                $('#container-view').show();
                $('#map-container-view').hide();
                var args = ['tabsView', TabsView, 'tabsViewModel', TabsViewModel, '#tabs-container', place];
                _this.renderView(args, { lat: 'Hello', lng: 'World' });

                switch (view) {
                    case 'news':
                        args = ['newsView', NewsView, 'newsListViewModel', NewsListViewModel, '#news-view', place];
                        _this.renderView(args);
                        break;
                    case 'events':
                        console.log('Calling events');
                        args = ['eventsView', EventsView, 'eventsListViewModel', EventsListViewModel, '#events-view', place];
                        DataController.getEventsDataList(_this.renderView, args);
                        break;
                    case 'weather':
                        _this.renderView('weatherView', WeatherView, 'weatherListViewModel', WeatherListViewModel, '#weather-view', place);
                        break;
                    case 'real-estate':
                        _this.renderView('realEstateView', RealEstateView, 'realEstateViewModel', RealEstateListViewModel, '#real-estate-view', place);
                        break;
                };
            };
            this.renderView = function(args, data) {
                _this[args[0]] = new(args[1])().render();
                console.log(data);
                _this[args[2]] = new args[3]({ name: args[5].name, address: args[5].address, lat: args[5].lat, lng: args[5].lng });
                if (!!!ko.dataFor($(args[4])[0])) {
                    ko.applyBindings(_this[args[2]], $(args[4])[0]);
                }
            };
        };
        return new Main();
    });