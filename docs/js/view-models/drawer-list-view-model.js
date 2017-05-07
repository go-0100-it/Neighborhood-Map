/**
 * Using Require.js to define a module responsible for...
 */
define([
        'jquery',
        'backbone',
        'underscore',
        'knockout',
        'util'
    ],
    function($, Backbone, _, ko, tpl) {

        /**
         * @param {function} func - The title of the book.
         * @param {string} id - The author of the book.
         */
        var DrawerListViewModel = function(places) {
            var _this = this;
            this.id = ko.observable();
            this.name = ko.observable();

            /**
             */
            this.name.subscribe(function() {
                _this.nameRequestVisible(false);
            });
            this.searchResults = ko.observableArray([]);
            this.selectedPlace = ko.observable({});
            this.selectedFormattedAddress = ko.observable('');
            this.query = ko.observable('');
            this.addressSearchVisible = ko.observable(false);
            this.searchInputVisible = ko.observable(true);
            this.selectedPlaceDisplayVisible = ko.observable(false);
            this.addButtonVisible = ko.observable(false);
            this.nameRequestVisible = ko.observable(false);
            this.places = ko.observableArray(places);
            this.expanded = ko.observable(false);
            this.expandedClass = ko.observable('');

            /**
             */
            this.toggleDrawerList = function() {
                if (_this.expanded()) {
                    _this.expandedClass('');
                } else {
                    _this.expandedClass('responsive');
                }
                _this.expanded(!_this.expanded());
            };

            this.onClick = function(place) {

                if ($('#map').is(":hidden")) {
                    console.log('Map is hidden');
                    Backbone.history.navigate('#places/' + place.id + '/' + place.name + '/' + place.address + '/' + place.lat + '/' + place.lng, { trigger: true });
                    _this.centerLocation(place);
                } else {
                    _this.centerLocation(place);
                }
            };

            /**
             * @param {} place - The title of the book.
             */
            this.onSelectAddress = function(place) {
                _this.selectedPlace(place);
                _this.selectedFormattedAddress(_this.selectedPlace().formatted_address);
                _this.toggleSearchInput();
                _this.toggleSelectedPlace();
                _this.toggleAddButton();
                _this.searchResults([]);
            };


            /**
             * @param {function} func - The title of the book.
             * @param {string} id - The author of the book.
             */
            this.searchAddress = function(value) {
                _this.map.searchAddress(value, _this.searchResults);
            };


            /**
             * @param {function} func - The title of the book.
             * @param {string} id - The author of the book.
             */
            this.addPlace = function() {
                if (_this.name()) {
                    _this.nameRequestVisible(false);
                    var place = { id: _this.selectedPlace().place_id, name: _this.name(), address: _this.selectedPlace().formatted_address, lat: _this.selectedPlace().geometry.location.lat(), lng: _this.selectedPlace().geometry.location.lng() };
                    _this.pushPlace(place);
                    _this.updatePlacesData(place);
                    _this.toggleAddressSearch();
                    _this.resetSearchView();
                    _this.name('');
                    _this.query('');
                } else {
                    _this.nameRequestVisible(true);
                }
            };


            /**
             * @param {function} func - The title of the book.
             */
            this.pushPlace = function(place) {
                console.log(place);
                _this.map.addMarker(place);
                _this.places.push(place);
            };


            /**
             * 
             */
            this.removePlace = function() {
                _this.map.removeMarker(_this.places.indexOf(this));
                _this.places.remove(this);
                _this.removePlaceData(this);
            };


            /**
             * 
             */
            this.toggleAddressSearch = function() {
                _this.addressSearchVisible(!_this.addressSearchVisible());
            };


            /**
             * 
             */
            this.toggleSearchInput = function() {
                _this.searchInputVisible(!_this.searchInputVisible());
            };


            /**
             * 
             */
            this.toggleSelectedPlace = function() {
                _this.selectedPlaceDisplayVisible(!_this.selectedPlaceDisplayVisible());
            };


            /**
             * 
             */
            this.toggleAddButton = function() {
                _this.addButtonVisible(!_this.addButtonVisible());
            };


            /**
             * @param {function} place - The title of the book.
             * 
             */
            this.centerLocation = function(place) {
                var index = _this.places.indexOf(place);
                var loc = { lat: place.lat, lng: place.lng };
                _this.map.centerOnLocation(loc);
                if (_this.map.openWindow !== _this.map.infoWindows[index]) {
                    _this.map.toggleWindowsMarkers(_this.map.infoWindows[index], _this.map.markers[index], _this.map);
                }
            };


            /**
             * 
             */
            this.resetSearchView = function() {
                _this.nameRequestVisible(false);
                _this.toggleSearchInput();
                _this.toggleSelectedPlace();
                _this.toggleAddButton();
            };


            /**
             * 
             */
            this.query.subscribe(this.searchAddress);

            /** */
            return this;
        };

        /** */
        return DrawerListViewModel;
    });