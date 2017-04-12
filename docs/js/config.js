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
        knockback: 'libs/knockback.min',
        app: 'app',
        util: 'util',

        /*Controllers*/
        main_controller: 'controllers/main-controller',
        google_maps_controller: 'controllers/google-maps-controller',

        /*ViewsModels*/
        drawer_list_view_model: 'view-models/drawer-list-view-model',
        drawer_item_view_model: 'view-models/drawer-item-view-model',
        news_list_view_model: 'view-models/news-list-view-model',
        events_list_view_model: 'view-models/events-list-view-model',
        weather_list_view_model: 'view-models/weather-list-view-model',
        real_estate_list_view_model: 'view-models/real-estate-list-view-model',

        /*Models*/
        drawer_menu_model: 'models/drawer-menu-model',
        drawer_menu_list: 'models/drawer-menu-list',

        /*Views*/
        drawer_list_view: 'views/drawer-list-view',
        navbar_filter_view: 'view-models/navbar-view',
        news_view: 'views/news-view',
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
    'knockback',
    'util'

], function($, _, bb, ko, kb, tpl) {
    tpl.loadTemplates(['drawer-list-view-tpl', 'map', 'news-view', 'events-view', 'weather-view', 'real-estate-view'], function() {
        console.log(tpl);
        require(['app'], function(app) {
            app.initialize();
        });
    });
});