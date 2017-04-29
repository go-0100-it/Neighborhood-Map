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
        var Map = function() {
            var _this = this;
            this.searching = false;
            this.map = {};
            this.init = function(places) {
                if (typeof google === 'object' && typeof google.maps === 'object') {
                    
                    var mapView = new MapView().render();
                    var firstPlace = { lat: places[0].lat, lng: places[0].lng };
                    _this.map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 8,
                        center: firstPlace
                    });

                    _this.initMarkers(places);
                    google.maps.InfoWindow.prototype.opened = false;

                } else {
                    //Do something else because Google maps is unavailable
                    alert("Google's Maps API is currently unavailable");
                }
            };

            this.refreshMap = function(place, map) {
                google.maps.event.trigger(map, 'resize');
                _this.centerOnLocation(place);
            };

            this.toggleMarker = function(_infowindow, _map, _marker, _place) {
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
                    }, 1500);
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
                    position: { lat: place.lat, lng: place.lng },
                    title: place.name,
                    animation: google.maps.Animation.DROP
                });

                _this.markers.push(marker);
                var infowindow = new google.maps.InfoWindow({
                    content: '<div>' +
                        '<h1>' + place.name + '</h1>' +
                        '<img id="info-img" src="https://maps.googleapis.com/maps/api/streetview?size=400x200&location=' + place.lat + ', ' + place.lng + '&heading=151.78&pitch=-0.76&key=AIzaSyBSpWUS_wBjBq5kXfnbQO19ewpQPdStRDg">' +
                        '<h3>' + place.address + '</h3>' +
                        '<h3>Latitude: ' + place.lat + '&nbsp&nbsp Longitude: ' + place.lng + '</h3>' +
                        '<button type="submit" class="map-info-btn" id="infoWin-' + i + '">Get Info</button>' +
                        '</div>',
                    place: place,
                    clickListenerAdded: false
                });



                (function(_infowindow, _map, _marker, _place, _i) {
                    google.maps.event.addDomListener(_infowindow, 'domready', function() {
                        console.log(_infowindow.clickListenerAdded);
                        if (!_infowindow.clickListenerAdded) {
                            $('#infoWin-' + _i).click(function() {
                                Backbone.history.navigate('#events/' + _infowindow.place.name + '/' + _infowindow.place.address + '/' + _infowindow.place.lat + '/' + _infowindow.place.lng, { trigger: true });
                            });
                            _infowindow.clickListenerAdded = true;
                        }
                    });
                    _marker.addListener('click', function() {
                        _this.toggleMarker(_infowindow, _map, _marker, _place);
                    });
                    setTimeout(function() {
                        _marker.setMap(_map);
                    }, i * 300);
                })(infowindow, _this.map, marker, place, i);
            };

            this.removeMarker = function(index) {
                _this.markers[index].setMap(null);
                _this.markers.splice(index, 1);
            };

            this.centerOnLocation = function(place) {
                requestedLocation = new google.maps.LatLng({ lat: place.lat, lng: place.lng });
                _this.map.panTo(requestedLocation);
            };

            this.searchAddress = function(value, searchResults) {
                if (typeof google === 'object' && typeof google.maps === 'object' && !_this.searching) {
                    _this.searching = true;
                    var geocoder = new google.maps.Geocoder();
                    searchResults([]);
                    geocoder.geocode({ 'address': value }, function(results, status) {
                        if (status == 'OK' && value !== '' && value !== ' ') {
                            var i = 0;
                            results.forEach(function(result) {
                                if (i < 5) {
                                    searchResults.push(result);
                                }
                                i += 1;
                            });
                        } else {
                            console.log('Geocode was not successful. Status Code: ' + status);
                            searchResults([]);
                        }
                        console.dir(searchResults());
                    });
                } else {
                    console.log("Google's Geocoder API is currently unavailable.");
                }
                _this.searching = false;
            };
        };
        return Map;
    });