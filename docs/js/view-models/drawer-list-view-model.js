define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'map_controller'
    ],
    function($, Backbone, _, ko, _Map) {
        var DrawerListViewModel = function(places) {
            var _this = this;
            this.name = ko.observable();
            this.searchResults = ko.observableArray([]);
            this.selectedPlace = ko.observable({});
            this.selectedFormattedAddress = ko.observable('');
            this.query = ko.observable('');
            this.addressSearchVisible = ko.observable(false);
            this.searchInputVisible = ko.observable(true);
            this.selectedPlaceDisplayVisible = ko.observable(false);
            this.addButtonVisible = ko.observable(false);
            this.places = ko.observableArray(places);
            this.onClick = function(place) {
                var obj = { name: place.name, address: place.address, position: place.position };
                Backbone.history.navigate('#news/' + obj.name + '/' + obj.address + '/' + obj.position, { trigger: true });
            };

            this.onSelectAddress = function(place) {
                _this.selectedPlace(place);
                _this.selectedFormattedAddress(_this.selectedPlace().formatted_address);
                _this.toggleSearchInput();
                _this.toggleSelectedPlace();
                _this.toggleAddButton();
                _this.searchResults([]);
            };

            this.searchAddress = function(value) {
                _Map().searchAddress(value, _this.searchResults);
            };

            this.addPlace = function() {
                var position = { lat: _this.selectedPlace().geometry.location.lat(), lng: _this.selectedPlace().geometry.location.lng() };
                var place = { name: _this.name(), address: _this.selectedPlace().formatted_address, position: position };
                _Map().addMarker(place);
                _this.places.push(place);
                _this.toggleAddressSearch();
                _this.resetSearchView();
                _this.name('');
                _this.query('');
            };

            this.removePlace = function() {
                _Map().removeMarker(_this.places.indexOf(this));
                _this.places.remove(this);
            };

            this.toggleAddressSearch = function() {
                _this.addressSearchVisible(!_this.addressSearchVisible());
            };

            this.toggleSearchInput = function() {
                _this.searchInputVisible(!_this.searchInputVisible());
            };

            this.toggleSelectedPlace = function() {
                _this.selectedPlaceDisplayVisible(!_this.selectedPlaceDisplayVisible());
            };

            this.toggleAddButton = function() {
                _this.addButtonVisible(!_this.addButtonVisible());
            };

            this.resetSearchView = function() {
                _this.toggleSearchInput();
                _this.toggleSelectedPlace();
                _this.toggleAddButton();
            };

            this.query.subscribe(this.searchAddress);

            return this;
        };
        return DrawerListViewModel;
    });