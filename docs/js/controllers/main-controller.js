// More description

define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'util',
        'tabs_view_model',
        'tabs_view',
        'events_list_view_model',
        'events_view',
        'weather_list_view_model',
        'weather_view',
        'real_estate_list_view_model',
        'real_estate_view',
        'data_controller',
        'map_controller'
    ],
    function(
        $,
        backbone,
        _,
        ko,
        tpl,
        TabsViewModel,
        TabsView,
        EventsListViewModel,
        EventsView,
        WeatherListViewModel,
        WeatherView,
        RealEstateListViewModel,
        RealEstateView,
        DataController,
        Map
    ) {

        var Main = function() {
            var _this = this;
            this.map = {};
            // Returning function that can be called to create drawer menu items, creates a collection from created items and using knockout via 
            // knockback bridge to render list into the view. The list created is an observable collection (array).  This means knockout will dynamiclly update the UI when the 
            // collection is changed.
            this.dataController = new DataController();
            this.renderDrawerListView = function() {
                require(['drawer_list_view_model', 'drawer_list_view'], function(DrawerListViewModel, DrawerListView) {
                    if (!_this.drawerListView) {
                        _this.drawerListView = new DrawerListView().render();
                        // creating a new Backbone collection and passing it to the DrawerListViewModel to create an observable collection 
                        _this.placesViewModel = new DrawerListViewModel();
                        _this.renderMap();
                        _this.dataController.getUserPlaces(_this.placesViewModel.pushPlace);
                        _this.placesViewModel.updatePlacesData = function(place) {
                            _this.dataController.updateUserPlaces(place);
                        };
                        ko.applyBindings(_this.placesViewModel, $('#drawer-menu-container')[0]);
                    }
                    var loc = _this.placesViewModel.places()[0] ? { lat: _this.placesViewModel.places()[0].lat, lng: _this.placesViewModel.places()[0].lng } : null;
                    _this.map.refreshMap(loc);

                });
            };
            this.renderMap = function() {
                _this.map = new Map();
                _this.map.init();
                _this.placesViewModel.map = _this.map;
            };
            this.renderTabsView = function(place, view) {
                _this.renderDrawerListView();
                $('#container-view').show();
                $('#map-container-view').hide();
                var args = ['tabsView', TabsView, 'tabsViewModel', TabsViewModel, '#tabs-container', place];
                if (!_this.tabsView) {
                    _this.renderView(args, { lat: 'Hello', lng: 'World' });
                } else {
                    _this.tabsViewModel.place(place);
                    $('#tab-container').html(_.template(tpl.get('tabs-spinner-view')));
                }
                switch (view) {
                    case 'events':
                        console.log('Calling events');
                        args = ['eventsView', EventsView, 'eventsListViewModel', EventsListViewModel, '#events-view', place];
                        _this.dataController.getEventsDataList(_this.renderView, args);
                        break;
                    case 'weather':
                        console.log('Calling weather');
                        args = ['weatherView', WeatherView, 'weatherListViewModel', WeatherListViewModel, '#weather-view', place];
                        _this.renderView(args, { Page: 'Weather' });
                        break;
                    case 'real-estate':
                        console.log('Calling real-estate');
                        args = ['realEstateView', RealEstateView, 'realEstateViewModel', RealEstateListViewModel, '#real-estate-view', place];
                        _this.renderView(args, { Page: 'Real-Estate' });
                        break;
                }
            };
            this.renderView = function(args, data) {
                _this[args[0]] = new(args[1])().render();
                _this[args[2]] = new args[3]({ name: args[5].name, address: args[5].address, lat: args[5].lat, lng: args[5].lng }, data);
                if (!!!ko.dataFor($(args[4])[0])) {
                    ko.applyBindings(_this[args[2]], $(args[4])[0]);
                }
            };
        };
        return new Main();
    });