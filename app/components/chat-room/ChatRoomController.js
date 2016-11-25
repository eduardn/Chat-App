(function() {
    'use strict';

    angular.module('chatApp')

    .directive('schrollBottom', function() {
            return {
                scope: {
                    schrollBottom: "="
                },
                link: function(scope, element) {
                    scope.$watchCollection('schrollBottom', function(newValue) {
                        if (newValue) {
                            $(element).scrollTop($(element)[0].scrollHeight);
                        }
                    });
                }
            }
        })
        .controller('ChatRoomController', ChatRoomController);

    ChatRoomController.$inject = ['$scope', '$timeout', '$state', '$firebaseArray', '$firebaseObject', '$rootScope', '$q', '$stateParams', 'loginService'];

    function ChatRoomController($scope, $timeout, $state, $firebaseArray, $firebaseObject, $rootScope, $q, $stateParams, loginService) {
        $scope.room = $stateParams.roomName;
        console.log($scope.room);
        $scope.roomUsers = [];

        $scope.loggedUsername = $scope.$storage.loggedUsername;

        var usercolor = $scope.$storage.usercolor;

        $scope.myColorStyle = { 'color': usercolor };

        var database = firebase.database();

        //Get messages from room
        var messagesArray = [];
        var roomName = $scope.room;
        var messageRef = database.ref('/rooms/' + roomName + '/messageObj').limitToLast(10);

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

        $scope.sendMessage = function(messageText) {
            if (messageText) {
                $scope.messages = [];
                var messageObject = {
                    sender: $scope.userName,
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
        roomUsersRef.on('value', function(snap) {
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
            $state.go('chat');
        };

        $scope.kick = function(user){
            if($scope.loggedUsername == 'admin'){
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

        var userInRoom = firebase.database().ref('rooms/' + $scope.room + '/users/');
        roomUsersRef.on('value', function(snap) {
            roomUsersArray = snap.val();
            var roomusers = [];
            for (var key in roomUsersArray) {
                var rooomuser = roomUsersArray[key];
                roomusers.push(rooomuser);
            }
            if(roomusers.indexOf($scope.loggedUsername)== -1){
                console.log("You have been disconnected");
                $state.go('chat');
            }
        });
    }
})();