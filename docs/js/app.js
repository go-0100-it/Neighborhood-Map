define(['util', 'router'], function(tpl, Router) {
    var msg = function(msg) {
        alert(msg);
    };
    return {
        initialize: function() {
            tpl.loadTemplates(['drawer-menu-item'], function() {
                var router = new Router();
            });
        },
        msg: msg
    };
});