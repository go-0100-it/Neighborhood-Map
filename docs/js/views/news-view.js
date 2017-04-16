 define([
         'jquery',
         'backbone',
         'underscore',
         'util'
     ],
     function($, Backbone, _, tpl) {
         var NewsView = Backbone.View.extend({
             el: '#tab-container',
             initialize: function() {
                 this.template = _.template(tpl.get('news-view'));
             },
             render: function() {
                 this.$el.html(this.template());
                 return this;
             }
         });
         return NewsView;
     });