// More description

define(['jquery', 'backbone', 'underscore', 'knockback', 'knockout', 'drawer_menu_view', 'drawer_menu_list', 'drawer_menu_model'],
    function($, backbone, _, kb, ko, DrawerMenuView, DrawerMenuList, DrawerMenuItem) {
        return {
            renderDrawerListView: function() {
                var items = [new DrawerMenuItem({ name: 'My current address', address: 'here' }), new DrawerMenuItem({ name: 'Cabin in the woods', address: 'here' }), new DrawerMenuItem({ name: 'Colorado Springs Home', address: 'here' }), new DrawerMenuItem({ name: 'Sports complex Indiana', address: 'here' }), new DrawerMenuItem({ name: 'Florida Home Resort', address: 'here' })];
                var list = new DrawerMenuList(items);
                var view_model = {
                    list: kb.collectionObservable(list, { view_model: kb.ViewModel })
                };
                ko.applyBindings(view_model, $('#kb_collection')[0]);
                //var drawerListView = new DrawerMenuView({ model: list }).render();
            }
        };
    });