// More description

define([
        'jquery',
        'backbone',
        'underscore',
        'knockback',
        'knockout',
        'drawer_menu_list',
        'drawer_menu_model',
        'drawer_list_view_model',
        'drawer_item_view_model',
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
        kb,
        ko,
        DrawerMenuList,
        DrawerMenuItem,
        DrawerListViewModel,
        DrawerItemViewModel,
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
                var places = [new DrawerMenuItem({ name: 'My current address', address: 'here', position: { lat: 43.6898244, lng: -79.61650999999999 } }),
                    new DrawerMenuItem({ name: 'Cabin in the woods', address: 'here', position: { lat: 43.9898244, lng: -79.31650999999999 } }),
                    new DrawerMenuItem({ name: 'Colorado Springs Home', address: 'here', position: { lat: 43.7898244, lng: -79.21650999999999 } }),
                    new DrawerMenuItem({ name: 'Sports complex Indiana', address: 'here', position: { lat: 43.6398244, lng: -79.91650999999999 } }),
                    new DrawerMenuItem({ name: 'Florida Home Resort', address: 'here', position: { lat: 43.7398244, lng: -79.81650999999999 } })
                ];

                // creating a new Backbone collection and passing it to the DrawerListViewModel to create an observable collection 
                var placesViewModel = new DrawerListViewModel(places);
                if (!listRendered) {
                    console.log(placesViewModel);
                    ko.applyBindings(placesViewModel, $('#drawer-menu-container')[0]);
                    listRendered = true;
                }
                console.dir(placesViewModel.places());
                return placesViewModel.places;
            },

            initMap: function(places) {
                if (google) {
                    var mapView = new MapView().render();
                    var uluru = { lat: 43.6898244, lng: -79.61650999999999 };
                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 8,
                        center: uluru
                    });

                    function toggleBounce(marker) {
                        if (marker.getAnimation() !== null) {
                            marker.setAnimation(null);
                        } else {
                            marker.setAnimation(google.maps.Animation.BOUNCE);
                        }
                    }

                    var len = places.length;
                    for (var i = 0; i < len; i++) {
                        var marker = new google.maps.Marker({
                            position: places[i].position(),
                            title: places[i].name(),
                            animation: google.maps.Animation.DROP
                        });

                        var infowindow = new google.maps.InfoWindow({
                            content: '<div><h2>' + places[i].name() + '</h2><img src="https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + places[i].position().lat + ', ' + places[i].position().lng + '&heading=151.78&pitch=-0.76&key=AIzaSyBSpWUS_wBjBq5kXfnbQO19ewpQPdStRDg"><button>CLICK ME</button></div>'
                        });
                        (function(_infowindow, _map, _marker) {
                            _marker.addListener('click', function() {
                                toggleBounce(_marker);
                                _infowindow.open(_map, _marker);
                            });
                            setTimeout(function() {
                                _marker.setMap(_map);
                            }, i * 300);
                        })(infowindow, map, marker);
                    }
                } else {
                    //Do something else because Google maps is unavailable
                    console.log('Google Maps is unavailable');
                }

            },

            renderNewsView: function(place) {
                require([], function() {
                    var newsView = new NewsView().render();

                    var newsListViewModel = new NewsListViewModel(new DrawerMenuItem({ name: place.name, address: place.address, position: place.position }));

                    ko.applyBindings(newsListViewModel, $('#news-view')[0]);
                });
            },
            renderEventsView: function(place) {

                var eventsView = new EventsView().render();

                var eventsListViewModel = new EventsListViewModel(new DrawerMenuItem({ name: place.name, address: place.address, position: place.position }));

                ko.applyBindings(eventsListViewModel, $('#events-view')[0]);

            },
            renderWeatherView: function(place) {

                var weatherView = new WeatherView().render();

                var weatherListViewModel = new WeatherListViewModel(new DrawerMenuItem({ name: place.name, address: place.address, position: place.position }));

                ko.applyBindings(weatherListViewModel, $('#weather-view')[0]);

            },
            renderRealEstateView: function(place) {

                var realEstateView = new RealEstateView().render();

                var realEstateViewModel = new RealEstateListViewModel(new DrawerMenuItem({ name: place.name, address: place.address, position: place.position }));

                ko.applyBindings(realEstateViewModel, $('#real-estate-view')[0]);

            }
        };
    });