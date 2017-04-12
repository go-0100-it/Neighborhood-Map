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
            _this.map;
            this.init = function(places){
                if (google) {
                    var mapView = new MapView().render();
                    var uluru = { lat: 43.6898244, lng: -79.61650999999999 };
                    _this.map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 8,
                        center: uluru
                    });

                    _this.initMarkers(places);
                    
                } else {
                    //Do something else because Google maps is unavailable
                    console.log('Google Maps is unavailable');
                }
            };

            this.toggleBounce = function(marker) {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            };

            this.initMarkers = function(places){
                var len = places.length;
                for (var i = 0; i < len; i++) {
                    _this.addMarker(places[i], i);
                }
            };

            this.addMarker = function(place, i){
                console.log('Adding Marker to ' + _this.map);
                var i = i ? i : 1;
                var marker = new google.maps.Marker({
                        position: place.position,
                        title: place.name,
                        animation: google.maps.Animation.DROP
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: '<div><h2>' + place.name + '</h2><img src="https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + place.position.lat + ', ' + place.position.lng + '&heading=151.78&pitch=-0.76&key=AIzaSyBSpWUS_wBjBq5kXfnbQO19ewpQPdStRDg"><button>CLICK ME</button></div>'
                    });
                    (function(_infowindow, _map, _marker) {
                        _marker.addListener('click', function() {
                            _this.toggleBounce(_marker);
                            _infowindow.open(_map, _marker);
                        });
                        setTimeout(function() {
                            _marker.setMap(_map);
                        }, i * 300);
                    })(infowindow, _this.map, marker);
            };
            return this;
        };
        return map;
});