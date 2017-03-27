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
        knockback: 'libs/knockback.min'
    },

    shim: {
        'underscore': {
            exports: '_'
        }
    }

});
// Start the main app logic.
requirejs(['jquery', 'underscore', 'backbone', 'knockout', 'knockback'], function($, _, bb, ko, kb) {
    
    console.log($);
    console.log(_);
    console.log(bb);
    console.log(ko);
    console.log(kb);
    
});