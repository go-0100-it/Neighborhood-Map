define([
        'jquery',
        'backbone',
        'underscore',
        'knockback'
    ],
    function($, Backbone, _, kb) {
        var createViewModel = function(list) {
            view_model = {
                list: kb.collectionObservable(list, { view_model: kb.ViewModel })
            };
            return view_model;
        };
        return {
            createViewModel: createViewModel
        };
    });