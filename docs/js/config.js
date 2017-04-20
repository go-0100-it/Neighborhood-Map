requirejs.config({
    //By default load any module IDs from js
    baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        /* Libraries */
        jquery: 'libs/jquery.min',
        underscore: 'libs/underscore.min',
        backbone: 'libs/backbone.min',
        knockout: 'libs/knockout.min',
        app: 'app',
        util: 'util',
        events_API: 'https://api.eventful.com/js/api',

        /*Controllers*/
        main_controller: 'controllers/main-controller',
        map_controller: 'controllers/map-controller',
        data_controller: 'controllers/data-controller',

        /*ViewsModels*/
        drawer_list_view_model: 'view-models/drawer-list-view-model',
        tabs_view_model: 'view-models/tabs-view-model',
        events_list_view_model: 'view-models/events-list-view-model',
        weather_list_view_model: 'view-models/weather-list-view-model',
        real_estate_list_view_model: 'view-models/real-estate-list-view-model',

        /*Views*/
        drawer_list_view: 'views/drawer-list-view',
        navbar_filter_view: 'view-models/navbar-view',
        tabs_view: 'views/tabs-view',
        weather_view: 'views/weather-view',
        events_view: 'views/events-view',
        real_estate_view: 'views/real-estate-view',
        map_view: 'views/map-view'
    },

    shim: {
        'underscore': {
            exports: '_'
        }
    }

});
// Start the main app logic.
requirejs([
    'jquery',
    'underscore',
    'backbone',
    'knockout',
    'util'

], function($, _, bb, ko, tpl) {
    tpl.loadTemplates(['drawer-list-view', 'map', 'tabs-view', 'events-view', 'weather-view', 'real-estate-view'], function() {
        require(['app'], function(app) {
            app.initialize();
        });
    });
});