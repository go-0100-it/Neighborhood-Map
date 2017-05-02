define(['jquery'],
    function($) {
        var UserAuth = function() {
            var _this = this;
            this.uid = '';
            this.initAuth = function(func1, func2) {
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        // User is signed in.
                        var isAnonymous = user.isAnonymous;
                        _this.uid = user.uid;
                        func1(func2, _this.uid);
                        // ...
                    } else {
                        firebase.auth().signInAnonymously().catch(function(error) {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            console.error(errorCode + ': ' + errorMessage);
                            alert('There was an during authentication (error: ' + errorCode + '). The app is not connected to the database!');
                            // ...
                        });
                    }
                    // ...
                });
            };
        };
        return new UserAuth();
    });