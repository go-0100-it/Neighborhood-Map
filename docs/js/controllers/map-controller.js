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
                if (google) {
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
                    console.log('Google Maps is unavailable');
                }
            };

            this.toggleMarker = function(_infowindow, _map, _marker) {
                if (_marker.getAnimation() !== null) {
                    _marker.setAnimation(null);
                    _infowindow.close(_map, _marker);
                } else {
                    _marker.setAnimation(google.maps.Animation.BOUNCE);
                    _infowindow.open(_map, _marker);
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
                    content: '<div><h2>' + place.name + '</h2><img src="https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + place.position.lat + ', ' + place.position.lng + '&heading=151.78&pitch=-0.76&key=AIzaSyBSpWUS_wBjBq5kXfnbQO19ewpQPdStRDg"><button>CLICK ME</button></div>'
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