
define(['router', 'main_controller'],
    function(Router, MainController) {
        var router = new Router();
        var msg = function(msg){
            alert(msg);
        }
        msg('app is loading');
        return {
            msg: msg
        }
    });