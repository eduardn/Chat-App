/**
 * Created by bcojocariu on 11/3/2016.
 */
(function() {
    'use strict';

    angular.module('chatApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', '$rootScope', '$stateParams', 'loginService', '$localStorage'];

    function HomeController($scope, $state, $rootScope, $stateParams, loginService, $localStorage) {

        //facebook login setup
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        provider.addScope('user_photos');
        provider.addScope('user_about_me');

        provider.setCustomParameters({
            'display': 'popup'
        });


        $scope.fblogin = function(){

            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user.providerData[0];
                console.log(user);
                console.log("display name: ", user.displayName);

                //save user in firebase
                    //Save user to firebase
                    var newUserKey = firebase.database().ref().child('users').push().key;
                    //console.log(newUserKey);
                    var updateUser = {};
                    updateUser['/users/' + newUserKey] = user;
                    firebase.database().ref().update(updateUser);
                    $state.go('chat',{userKey: newUserKey});


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


//github Login setup
var provider2 = new firebase.auth.GithubAuthProvider();

//github Login
$scope.githublogin = function(){

firebase.auth().signInWithPopup(provider2).then(function(result) {
  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user.providerData[0];
    console.log(user);
       var newUserGit = firebase.database().ref().child('users').push().key;
               
                    
                    var updateUser = {};
                    updateUser['/users/' + newUserGit] = user;
                      
                    firebase.database().ref().update(updateUser);
                      console.log("key: ", newUserGit); 
                             
                    $state.go('chat',{userKey: newUserGit});
                
               

  // ...
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






   

        var database = firebase.database();

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $scope.$storage = $localStorage.$reset();
        $scope.username = "";
        $scope.usercolor = getRandomColor();
        console.log($scope.usercolor);

        $scope.myStyle = { 'color': getRandomColor() };
        $scope.login = function(username) {
            localStorage.setItem('userNameLogged', username);
            if (username) {
                $scope.$storage = $localStorage.$default({
                    loggedUsername: username,
                    usercolor: $scope.usercolor
                });
                //Save user to firebase
                var newUserKey = firebase.database().ref().child('users').push().key;
                //console.log(newUserKey);
                var updateUser = {};
                updateUser['/users/' + newUserKey] = username;
                firebase.database().ref().update(updateUser);
                $state.go('chat');
            } else {
                $scope.loginError = true;
            }

        };

        database.ref('/users').once('value').then(function(snap) {
            console.log(snap.val());
        });

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

    }

})();