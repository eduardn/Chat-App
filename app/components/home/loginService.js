
(function() {
    'use strict';

    angular.module('chatApp')
        .service('loginService', ['$q', '$localStorage', loginService]);

    function loginService($q, $localStorage){
        var service = this;
        var provider = new firebase.auth.FacebookAuthProvider();
        var provider2 = new firebase.auth.GithubAuthProvider();

        provider.addScope('user_birthday');
        provider.addScope('user_photos');
        provider.addScope('user_about_me');
        provider.addScope('user_actions.books');
        provider.addScope('user_actions.music');
        provider.addScope('user_hometown');
        provider.addScope('user_location');

        provider.setCustomParameters({
            'display': 'popup'
        });

        service.currentUser = null;

        service.isLoggedIn = function () {
            var currentUser =  firebase.auth().currentUser && firebase.auth().currentUser.providerData[0];

            var usersLoggedUserRef = firebase.database().ref('/users');
            usersLoggedUserRef.once('value', function(snap) {
                var allusers = snap.val();
                for (var ukey in allusers) {
                    if (currentUser.uid == allusers[ukey].uid) {
                        currentUser.firebaseUserKey = ukey;
                    }
                }
            });
            console.log("isLogged User: ", currentUser);
            return currentUser
        };

        service.fblogin = function(){

            return firebase.auth().signInWithPopup(provider).then(function(result) {
                // The signed-in user info.
                var user = result.user.providerData[0];
                //Save user to firebase
                var newUserKey = firebase.database().ref().child('users').push().key;
                //console.log(newUserKey);
                var updateUser = {};
                updateUser['/users/' + newUserKey] = user;
                user.firebaseUserKey = newUserKey;
                service.currentUser = user;
                console.log("Login user: ", service.currentUser);
                $localStorage.currentUser = service.currentUser;

                return firebase.database().ref().update(updateUser);
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        };

        service.githublogin = function() {
            var deferred = $q.defer();

            firebase.auth().signInWithPopup(provider2).then(function(result) {
                // The signed-in user info.
                var user = result.user.providerData[0];
                console.log(result);
                //Save user to firebase
                var newUserKey = firebase.database().ref().child('users').push().key;
                //console.log(newUserKey);
                var updateUser = {};
                updateUser['/users/' + newUserKey] = user;
                user.firebaseUserKey = newUserKey;
                service.currentUser = user;
                console.log("Login user: ", service.currentUser);
                $localStorage.currentUser = service.currentUser;

                firebase.database().ref().update(updateUser);

                deferred.resolve();
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

            return deferred.promise;
        };

        service.logout = function() {
            var deferred = $q.defer();

            removeFromUsers()
                .then(removeFromRooms)
                .then(function(){
                    return firebase.auth().signOut()
                        .then(function() {
                            console.log("User logged out");
                            service.currentUser = null;
                            $localStorage.currentUser = null;

                            deferred.resolve();
                        }, function(error) {
                            console.log("An error happened")
                        });
                });
            return deferred.promise;
        };


        function removeFromUsers() {
            var deferred = $q.defer();

            var usersLoggedUserRef = firebase.database().ref('/users');
                usersLoggedUserRef.once('value', function(snap){
                    var allusers = snap.val();
                    console.log("All users: ", allusers);
                    for( var ukey in allusers){
                        console.log("All users key: ", allusers[ukey]);
                        console.log("Logout from users: ", service.currentUser);
                        if(service.currentUser.uid == allusers[ukey].uid){
                            console.log("user ID matched => remove from user: ", ukey, allusers[ukey].displayName)
                            // usersLoggedUserRef.child(ukey).remove();
                            usersLoggedUserRef.child(ukey).remove();
                        }
                    }
                deferred.resolve();
            });
            console.log(usersLoggedUserRef);

            return deferred.promise;
        }

        function removeFromRooms() {
            var deferred = $q.defer();
            var  userRef  = firebase.database().ref('/rooms/');
            userRef.once('value',  function(snap) {
                var usersArray = snap.val();
                console.log("usersArray: ", usersArray);
                for (var ukey in usersArray) {
                    // console.log("ukey: ", ukey);
                    // console.log("Logout from users: ", service.currentUser);
                    for (var ukeyUser in usersArray[ukey].users) {
                        // console.log("ukeyUser: ", ukeyUser);
                        if(service.currentUser.uid == usersArray[ukey].users[ukeyUser].uid){
                            // console.log("user ID matched => remove from rooms: ", ukey, usersArray[ukey].users[ukeyUser].displayName)
                            firebase.database().ref('/rooms/' + ukey + '/users/' + ukeyUser ).remove();
                        }
                    }
                }
                deferred.resolve();
            });
            return deferred.promise;
        }

    }
})();