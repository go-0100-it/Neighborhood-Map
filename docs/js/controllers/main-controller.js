// More description

define(['jquery', 'backbone', 'underscore', 'main_controller'],
    function($, backbone, _, MainController) {
        return {
            initialize: function() {
                $(document).ready(function() {
                    var renderNavbar = function() {
                        var navbar = new NavbarView().render();
                        $(navbar).on('clickFromNav', function(evt, clickedEl) {
                            alert('Event received from ' + clickedEl);
                            // Initialize Dropdown View
                        });
                        //return navbar;
                    };
                    var renderDrawerMenu = function() {
                        var drawerMenu = new DrawerView().render();
                        //return drawerMenu;
                    };
                    var initialRender = function() {
                        renderNavbar();
                        renderDrawerMenu();
                    }();
                });
                setTimeout(function() {
                    $.hideLoading();
                }, 2000);
            },
        };
    });