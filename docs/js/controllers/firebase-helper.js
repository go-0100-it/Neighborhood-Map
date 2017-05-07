/**
 * Using Require.js to define a module responsible for creating a UserAuth object.
 */
define(['jquery'],
    function($) {


        /**
         * A function constructor to create a new UserAuth object. The UserAuth object created handles the user log-in details,
         * monitors log in state and updates the app via callback functions upon login state changes.
         * @constructor
         * @return - returns a new UserAuth object.
         */
        var UserAuth = function() {
            var _this = this;
            this.uid = '';
            this.initialized = false;

            /**
             * A function to initiate the user sign in to firebase.
             * @param {function} func1 - the callback function to execute upon user sign in.
             * @param {function} func2 - the function to be passed to the callback function(func1) when the callback function is being executed.
             * The callback(func1) being passed in, in this case, is a function to query the database.  This callback(func1) also requires a callback(func2) to be passed in.
             * The callback(func2) passed in will be called once the results are returned from the database query.
             */
            this.initAuth = function(func1, func2, request) {

                /**
                 * 
                 */
                firebase.auth().onAuthStateChanged(function(user) {
                    // Checking if user has been logged in.
                    if (user) {
                        console.log("State changed: Logged in");
                        // User is signed in, assigning the uid, passed back from firebase,
                        // to a variable encapsulated within this UserAuth objects exection context for later reference.
                        _this.uid = user.uid;

                        // 
                        if (!_this.initialized) {
                            func1(func2, _this.uid, request);
                            _this.initialized = true;
                        }

                        // User is not signed in.
                    } else {
                        console.log("State changed: Logged out");
                        /**
                         * Requesting an anonymous user sign-in to firebase.
                         */
                        firebase.auth().signInAnonymously().catch(function(error) {

                            // Retriving the error code from the error object passed back.
                            var errorCode = error.code;

                            // Retriving the error message from the error object passed back.
                            var errorMessage = error.message;

                            // Printing the error details to the console.
                            console.error(errorCode + ': ' + errorMessage);

                            // Alerting user of the login error and error code.
                            alert('There was an during authentication (error: ' + errorCode + '). The app is not connected to the database!');
                        });
                    }
                });
            };
        };

        return new UserAuth();
    });