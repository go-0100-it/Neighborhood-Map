 define([
         'jquery',
         'backbone',
         'underscore',
         'util'
     ],
     function($, Backbone, _, tpl) {
         var DrawerListView = Backbone.View.extend({
             el: '#drawer-menu',
             initialize: function() {
                 this.template = _.template(tpl.get('drawer-list-view'));
             },
             render: function() {
                 this.$el.html(this.template());
                 return this;
             }
         });
         return DrawerListView;
     });