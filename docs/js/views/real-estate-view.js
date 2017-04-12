 define([
         'jquery',
         'backbone',
         'underscore',
         'util'
     ],
     function($, Backbone, _, tpl) {
         var RealEstateView = Backbone.View.extend({
             el: '#container-view',
             initialize: function() {
                 this.template = _.template(tpl.get('real-estate-view'));
             },
             render: function() {
                 this.$el.html(this.template());
                 return this;
             }
         });
         return RealEstateView;
     });