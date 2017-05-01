define([],
    function() {
        require(['jquery'],
            function($) {
                firebase.auth().signInAnonymously().catch(function(error) {
                    alert('There was an during authentication (error: ' + error.code + '). The app is not connected to the database!')
                        // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                });

                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        // User is signed in.
                        var isAnonymous = user.isAnonymous;
                        window.uid = user.uid;
                        console.log(uid);
                        // ...
                    } else {

                    }
                    // ...
                });
            });
    });