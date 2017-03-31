// More description

define(['jquery', 'backbone', 'underscore', 'knockback', 'knockout', 'drawer_menu_list', 'drawer_menu_model', 'drawer_list_view_model'],
    function($, backbone, _, kb, ko, DrawerMenuList, DrawerMenuItem, DrawerListViewModel) {
        return {
            // Returning function that can be called to create drawer menu items, creates a collection from created items and using knockout via 
            // knockback bridge to render list into the view. The list created is an observable collection (array).  This means knockout will dynamiclly update the UI when the 
            // collection is changed.
            renderDrawerListView: function() {

                // creating an array of new Backbone models for the individual items of the collection.
                var items = [new DrawerMenuItem({ name: 'My current address', address: 'here' }), new DrawerMenuItem({ name: 'Cabin in the woods', address: 'here' }), new DrawerMenuItem({ name: 'Colorado Springs Home', address: 'here' }), new DrawerMenuItem({ name: 'Sports complex Indiana', address: 'here' }), new DrawerMenuItem({ name: 'Florida Home Resort', address: 'here' })];

                // creating a new Backbone collection and passing it to the DrawerListViewModel to create an observable collection 
                var view_model = DrawerListViewModel.createViewModel(new DrawerMenuList(items));

                // Calling ko to apply bindings, passing the created view model and the associated UI element.
                ko.applyBindings(view_model, $('#kb_collection')[0]);
            }
        };
    });