/**
 * Using Require.js to define a module responsible for...
 */
define([
        'jquery',
        'backbone',
        'underscore',
        'knockout'
    ],
    function($, Backbone, _, ko) {
        var EventsListViewModel = function(place, data, isError, main) {
            var _this = this;
            var Main = main;
            this.id = ko.observable(place.id);
            this.name = ko.observable(place.name);
            this.address = ko.observable(place.address);
            this.lat = ko.observable(place.lat);
            this.lng = ko.observable(place.lng);
            this.data = ko.observableArray(data.events.event);
            this.isErr = ko.observable(isError);
            this.addToMap = function(place){
                var newPlace = {
                    name: place.venue_name,
                    lat: place.latitude,
                    lng: place.longitude,
                    address: place.venue_address,
                    id: place.id + place.venue_id
                }
                alert('Adding new place ')
                console.dir(newPlace);
            };
            return this;
        };
        return EventsListViewModel;
    });