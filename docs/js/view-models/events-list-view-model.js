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
            this.addPlace = function(place) {
                console.dir(place);
                var newPlace = {
                    name: place.venue_name,
                    lat: Number(place.latitude),
                    lng: Number(place.longitude),
                    address: place.venue_address + ', ' + place.city_name,
                    id: place.id + place.venue_id
                };
                alert('Adding new place ');
                console.dir(newPlace);
                Main.eventsViewModel.addPlace(newPlace);
            };
            return this;
        };
        return EventsListViewModel;
    });