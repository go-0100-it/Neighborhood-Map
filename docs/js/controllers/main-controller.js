// More description

define(['jquery', 'backbone', 'underscore', 'drawer_menu_view', 'drawer_menu_list', 'drawer_menu_model'],
    function($, backbone, _, DrawerMenuView, DrawerMenuList, DrawerMenuItem) {
        return {
            renderDrawerListView: function() {
                var items = [new DrawerMenuItem({ name: 'me', address: 'here' }), new DrawerMenuItem({ name: 'me', address: 'here' }), new DrawerMenuItem({ name: 'me', address: 'here' }), new DrawerMenuItem({ name: 'me', address: 'here' }), new DrawerMenuItem({ name: 'me', address: 'here' })];
                var list = new DrawerMenuList(items);

                var drawerListView = new DrawerMenuView({ model: list }).render();
            }
        };
    });