// More description

define(['jquery', 'backbone', 'underscore', 'knockback', 'knockout', 'drawer_menu_list', 'drawer_menu_model', 'drawer_list_view_model'],
    function($, backbone, _, kb, ko, DrawerMenuList, DrawerMenuItem, DrawerListViewModel) {
        return {
            // Returning function that can be called to create drawer menu items, creates a collection from created items and using knockout via 
            // knockback bridge to render list into the view. The list created is an observable collection (array).  This means knockout will dynamiclly update the UI when the 
            // collection is changed.
            renderDrawerListView: function() {

                // creating an array of new Backbone models for the individual items of the collection.
                var items = [new DrawerMenuItem({ name: 'My current address', address: 'here', position: { lat: 43.6898244, lng: -79.61650999999999 } }),
                    new DrawerMenuItem({ name: 'Cabin in the woods', address: 'here', position: { lat: 43.9898244, lng: -79.31650999999999 } }),
                    new DrawerMenuItem({ name: 'Colorado Springs Home', address: 'here', position: { lat: 43.7898244, lng: -79.21650999999999 } }),
                    new DrawerMenuItem({ name: 'Sports complex Indiana', address: 'here', position: { lat: 43.6398244, lng: -79.91650999999999 } }),
                    new DrawerMenuItem({ name: 'Florida Home Resort', address: 'here', position: { lat: 43.7398244, lng: -79.81650999999999 } })
                ];

                // creating a new Backbone collection and passing it to the DrawerListViewModel to create an observable collection 
                var view_model = DrawerListViewModel.createViewModel(new DrawerMenuList(items));

                // Calling ko to apply bindings, passing the created view model and the associated UI element.
                ko.applyBindings(view_model, $('#kb_collection')[0]);
                return items;
            },

            initMap: function(items) {
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

                var len = items.length;
                for (var i = 0; i < len; i++) {
                    var marker = new google.maps.Marker({
                        position: items[i].toJSON().position,
                        title: items[i].toJSON().name,
                        animation: google.maps.Animation.DROP
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: '<div><h2>' + items[i].toJSON().name + '</h2><img src="https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + items[i].toJSON().position.lat + ', ' + items[i].toJSON().position.lng + '&heading=151.78&pitch=-0.76&key=AIzaSyBSpWUS_wBjBq5kXfnbQO19ewpQPdStRDg"><button>CLICK ME</button></div>'
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
            }
        };
    });