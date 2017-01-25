(function() {
    'use strict';

    angular.module('chatApp')


        .controller('ChatRoomController', ChatRoomController);

    ChatRoomController.$inject = ['$scope', '$timeout', '$state', '$firebaseArray', '$firebaseObject', '$rootScope', '$q', '$stateParams', 'loginService','moment'];


    function ChatRoomController($scope, $timeout, $state, $firebaseArray, $firebaseObject, $rootScope, $q, $stateParams, loginService,moment) {
            $scope.exampleDate = moment().hour(8).minute(0).second(0).toDate();
        $scope.room = $stateParams.roomName;
        $scope.loggedUserKey = $stateParams.userKey;
        var userRef = firebase.database().ref('/users/' + $scope.loggedUserKey );
            userRef.once('value', function(snap){
                var loggedUser = snap.val();
                console.log(loggedUser);

                $timeout(function() {
                    $scope.loggedUser = loggedUser;
                }, 1);
            });

        $scope.roomCreator = "";
        $scope.roomUsers = [];

        var usercolor = $scope.$storage.usercolor;

        $scope.myColorStyle = { 'color': usercolor };

        var database = firebase.database();

        //Get messages from room
        var messagesArray = [];
        var roomName = $scope.room;
        var messageRef = database.ref('/rooms/' + roomName + '/messageObj');

        messageRef.on('value', function(snap) {
            messagesArray = snap.val();
            var messages = [];

            for (var mkey in messagesArray) {
                messages.push(messagesArray[mkey]);
            }

            $timeout(function() {
                $scope.messages = messages;
            }, 1);
        });

        //Get userCreator
        var roomCreatorRef = database.ref('/rooms/' + roomName + '/creator');
        roomCreatorRef.once('value', function(snap){
            var roomCreator = snap.val();

            $timeout(function() {
                $scope.roomCreator = roomCreator;
            }, 1);

        });

        $scope.sendMessage = function(messageText) {
            if (messageText) {
                $scope.messages = [];
                var messageObject = {
                    sender: $scope.loggedUser.displayName,
                    senderPhotoURL: $scope.loggedUser.photoURL,
                    text: messageText
                };
                // Get a key for a new Post.
                var newPostKey = firebase.database().ref().child('rooms').child($scope.room).child('messageObj').push().key;
                // Write the new post's data simultaneously in the posts list and the user's post list.
                var updates = {};
                updates['/rooms/' + $scope.room + '/messageObj/' + newPostKey] = messageObject;
                return firebase.database().ref().update(updates);

            }
        };

        //Users from Room
        var roomUsersArray;

        var roomUsersRef = firebase.database().ref('rooms/' + $scope.room + '/users/');
        roomUsersRef.orderByChild('uid').on('value', function(snap) {
            console.log(snap.val());
            roomUsersArray = snap.val();
            var roomusers = [];
            $scope.roomUsers = [];
            for (var key in roomUsersArray) {
                var rooomuser = roomUsersArray[key];
                roomusers.push(rooomuser);
            }

            $timeout(function() {
                $scope.roomUsers = roomusers;
            }, 1);

        });

        $scope.leaveRoom  =   function(user) {
            // $rootScope.$broadcast('toggleRooms', false);
            var  usersArray  = [];
            var  users  = [];
            var  userRef  = firebase.database().ref('/rooms/' + $scope.room + '/users');
            userRef.once('value',  function(snap) {
                usersArray = snap.val();
                console.log("leave room users: ", usersArray);
                for (var ukey in usersArray) {
                    console.log("my key: ", $scope.loggedUserKey)
                    console.log("current key: ", ukey);
                    console.log("user key: ", usersArray[ukey]);
                    if (ukey == $scope.loggedUserKey) {

                        userRef.child($scope.loggedUserKey).remove();
                        console.log(ukey + " Removed");
                        // var  otherRef = firebase.database().ref('/rooms/' + $scope.room + '/users/' + ukey).set(null);
                        /*otherRef.on('value',  function(snap) {
                            // console.log(snap.val());
                        });*/
                    }
                }
            });
            //localStorage.setItem('hidenList', false);
            $state.go('chat',{ userKey: $scope.loggedUserKey, hideRooms: false });
        };

         $scope.kick = function(user){
            if($scope.loggedUsername == $scope.roomCreator){
                $rootScope.$broadcast('kick',{user: user});
                var  usersArray  = [];
                var  users  = [];
                var  userRef  = firebase.database().ref('/rooms/' + $scope.room + '/users');
                userRef.once('value',  function(snap) {
                    usersArray = snap.val();
                    for (var ukey in usersArray) {
                        if (usersArray[ukey] === user) {
                            userRef.child(ukey).remove();
                            console.log(usersArray[ukey] + " Removed");
                        }
                    }
                });
            }
        };

        var userKeysRef = firebase.database().ref('rooms/' + $scope.room + '/users/');
        userKeysRef.on('value', function(snap) {
            var userKeys = snap.val();
            console.log("Users", userKeys);
            if(userKeys.indexOf($scope.userKey) == -1){
                console.log("You have been disconnected");
                $state.go('chat',{userKey: $scope.userKey});
            }
        });
    }
})();