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

        /*Controllers*/
        main_controller: 'controllers/main-controller',

        /*Views*/
        drawer_menu_view: 'views/drawer-menu-view',
        drawer_item_view: 'views/drawer-menu-item',
        dropdown_view: 'views/dropdown-view',
        navbar_filter_view: 'views/navbar-view',

        /*Models*/
        drawer_menu_model: 'models/drawer-menu-model',
        drawer_menu_list: 'models/drawer-menu-list'
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
    'app'

], function($, _, bb, ko, kb, app) {
    //console.log(app);
    app.initialize();
});