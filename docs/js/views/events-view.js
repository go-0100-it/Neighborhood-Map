 define([
         'jquery',
         'backbone',
         'underscore',
         'util'
     ],
     function($, Backbone, _, tpl) {
         var EventsView = Backbone.View.extend({
             el: '#container-view',
             initialize: function() {
                 this.template = _.template(tpl.get('events-view'));
             },
             render: function() {
                 this.$el.html(this.template());
                 return this;
             }
         });
         return EventsView;
     });