define([
        'jquery',
        'backbone',
        'underscore',
        'knockback',
        'knockout',
        'drawer_menu_model'
    ],
    function($, Backbone, _, kb, ko, DrawerMenuItem) {
        var DrawerListViewModel = function(places) {
            console.log(this.places);
            var _this = this;
            this.streetName = ko.observable('');
            this.location = '';
            this.formattedStreetName = ko.computed(function() {
                console.log(_this.streetName().split(' ').join('+'));
                var geocoder = new google.maps.Geocoder();
                //var location = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY';
                geocoder.geocode({ 'address': _this.streetName() }, function(results, status) {
                    if (status == 'OK') {
                        console.log(results[0].geometry.location.toJSON());
                        _this.location = (results[0].geometry.location.toJSON());
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            });
            this.addressInputVisible = ko.observable(false);
            this._places = places;
            this.places = kb.collectionObservable(places);
            this.onClick = function(place) {
                console.dir(place);
                var obj = { name: place.name(), address: place.address(), position: place.position() };
                console.dir(obj);
                Backbone.history.navigate('#news/' + obj.name + '/' + obj.address + '/' + obj.position, { trigger: true });
            };

            this.searchAddress = function(value) {
                console.log(value);
                console.log(_this.streetName());
                _this.toggleAddressInput();
            };

            this.addPlace = function() {
                console.log(_this.places());
                _this.places().push(new DrawerMenuItem({ name: 'New Place', address: _this.streetName(), position: _this.location }));
                //_this.places = (_this.places);
            };

            this.removePlace = function() {
                _this.places.remove(this);
            };

            this.toggleAddressInput = function() {
                if (_this.addressInputVisible()) {
                    _this.addressInputVisible(false);
                } else {
                    _this.addressInputVisible(true);
                }
                console.log("calling function: " + _this.addressInputVisible());
            };
            return this;
        };
        return DrawerListViewModel;
    });