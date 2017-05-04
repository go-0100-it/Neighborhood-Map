/**
 * Using Require.js to define a module....
 */ 
define(['jquery'],
    function($) {

        /**
         * @param {function} func - The title of the book.
         * @param {array} args - The author of the book.
         */
        var UserAuth = function() {
            var _this = this;
            this.uid = '';
            this.initAuth = function(func1, func2) {

                /**
                 * 
                 */
                firebase.auth().onAuthStateChanged(function(user) {

                    // Checking if user has been logged in.
                    if (user) {

                        // User is signed in.
                        var isAnonymous = user.isAnonymous;
                        _this.uid = user.uid;

                        // User is signed in.
                        func1(func2, _this.uid);

                    // User is signed in.
                    } else {

                        /**
                         * 
                         */
                        firebase.auth().signInAnonymously().catch(function(error) {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            console.error(errorCode + ': ' + errorMessage);
                            alert('There was an during authentication (error: ' + errorCode + '). The app is not connected to the database!');
                        });
                    }
                });
            };
        };

        /**
         * 
         */
        return new UserAuth();
    });