define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'map_view'
    ],
    function(
        $,
        backbone,
        _,
        ko,
        MapView
    ) {
        var map = function(places) {
            var _this = this;
            this.init = function(places) {
                if (typeof google === 'object' && typeof google.maps === 'object') {
                    _this.map = {};
                    var mapView = new MapView().render();
                    var uluru = { lat: 43.6898244, lng: -79.61650999999999 };
                    _this.map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 8,
                        center: uluru
                    });

                    _this.initMarkers(places);
                    google.maps.InfoWindow.prototype.opened = false;

                } else {
                    //Do something else because Google maps is unavailable
                    alert("Google's Maps API is currently unavailable");
                }
            };

            this.toggleMarker = function(_infowindow, _map, _marker) {
                if (_marker.getAnimation() !== null) {
                    _marker.setAnimation(null);
                    _infowindow.close(_map, _marker);
                } else {
                    _marker.setAnimation(google.maps.Animation.BOUNCE);
                    _infowindow.open(_map, _marker);
                    setTimeout(function() {
                        var btnOverlay = $("img[src$='maps.gstatic.com/mapfiles/transparent.png']")[0];
                        var closeBtn = $("img[src$='maps.gstatic.com/mapfiles/api-3/images/mapcnt6.png']")[0];
                        if (typeof btnOverlay === 'object') {
                            btnOverlay.addEventListener('click', function() {
                                _marker.setAnimation(null);
                            });
                        }
                        if (typeof closeBtn === 'object') {
                            closeBtn.addEventListener('click', function() {
                                _marker.setAnimation(null);
                            });
                        }
                    }, 200);
                }
            };

            this.initMarkers = function(places) {
                _this.markers = [];
                var len = places.length;
                for (var i = 0; i < len; i++) {
                    _this.addMarker(places[i], i);
                }
            };

            this.addMarker = function(place, i) {
                i = i ? i : 1;
                var marker = new google.maps.Marker({
                    position: place.position,
                    title: place.name,
                    animation: google.maps.Animation.DROP
                });

                _this.markers.push(marker);

                var infowindow = new google.maps.InfoWindow({
                    content: '<div>' +
                        '<h1>' + place.name + '</h1>' +
                        '<img src="https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + place.position.lat + ', ' + place.position.lng + '&heading=151.78&pitch=-0.76&key=AIzaSyBSpWUS_wBjBq5kXfnbQO19ewpQPdStRDg">' +
                        '<h3>' + place.address + '</h3>' +
                        '<h3>Latitude: ' + place.position.lat + '&nbsp&nbsp Longitude: ' + place.position.lng + '</h3>' +
                        '</div>'
                });

                (function(_infowindow, _map, _marker) {
                    _marker.addListener('click', function() {
                        _this.toggleMarker(_infowindow, _map, _marker);
                    });
                    setTimeout(function() {
                        _marker.setMap(_map);
                    }, i * 300);
                })(infowindow, _this.map, marker);
            };

            this.removeMarker = function(index) {
                _this.markers[index].setMap(null);
                _this.markers.splice(index, 1);
            };

            return this;
        };
        return map;
    });