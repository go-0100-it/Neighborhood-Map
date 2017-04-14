define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'map_controller'
    ],
    function($, Backbone, _, ko, MapController) {
        var DrawerListViewModel = function(places) {
            var _this = this;
            this.name = '';
            this.address = ko.observable('');
            this.location = '';
            this.query = ko.observable('');
            this.searchResults = ko.observableArray([]);
            this.formattedStreetName = ko.computed(function() {
                if (typeof google === 'object' && typeof google.maps === 'object') {
                    var geocoder = new google.maps.Geocoder();
                    //var location = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY';
                    geocoder.geocode({ 'address': _this.address() }, function(results, status) {
                        if (status == 'OK') {
                            _this.location = (results[0].geometry.location.toJSON());
                        } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                } else {
                    console.log("Google's Geocoder API is currently unavailable.");
                }
            });
            this.addressInputVisible = ko.observable(false);
            this.places = ko.observableArray(places);
            this.onClick = function(place) {
                var obj = { name: place.name, address: place.address, position: place.position };
                Backbone.history.navigate('#news/' + obj.name + '/' + obj.address + '/' + obj.position, { trigger: true });
            };

            this.searchAddress = function(value) {
                if (typeof google === 'object' && typeof google.maps === 'object') {
                    var geocoder = new google.maps.Geocoder();
                    _this.searchResults([]);
                    //var location = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY';
                    geocoder.geocode({ 'address': value }, function(results, status) {
                        if (status == 'OK' && value !== '' && value !== ' ') {
                            var i = 0;
                            results.forEach(function(result) {
                                if (i < 5) {
                                    _this.searchResults.push(result);
                                }
                                i++;
                            });
                        } else {
                            console.log('Geocode was not successful. Status Code: ' + status);
                            _this.searchResults([]);
                        }
                        console.dir(_this.searchResults());
                    });
                } else {
                    console.log("Google's Geocoder API is currently unavailable.");
                }
            };

            this.addPlace = function() {
                var place = ({ name: _this.name, address: _this.address(), position: _this.location });
                MapController().addMarker(place);
                _this.places.push(place);

                //_this.places = (_this.places);
            };

            this.removePlace = function() {
                MapController().removeMarker(_this.places.indexOf(this));
                _this.places.remove(this);
            };

            this.toggleAddressInput = function() {
                _this.addressInputVisible(!_this.addressInputVisible());
            };

            this.query.subscribe(this.searchAddress);

            return this;
        };
        return DrawerListViewModel;
    });