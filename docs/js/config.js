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
        dropdown_view: 'views/dropdown-view',
        navbar_view: 'views/navbar-view',

        /*Models*/
        navbar_model: 'models/navbar-model'
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
            'app', 
            'util'
        ], function($, _, bb, ko, kb, app, tpl) {
            require([
                'util'
                ], function(tpl) {
                    tpl.loadTemplates([
                                    'drawer-list-item'
                                ],function(){
                                    console.log(app);
                                    app.msg('app is loaded and available');
                                });
            });
});