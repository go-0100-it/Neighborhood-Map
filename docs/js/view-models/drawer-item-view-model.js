define([
        'jquery',
        'backbone',
        'underscore',
        'knockback'
    ],
    function($, Backbone, _, kb) {
        var createViewModel = function(item) {
            var view_model = kb.viewModel(item, {
                read_only: false
            });
            return view_model;
        };
        return {
            createViewModel: createViewModel
        };
    });