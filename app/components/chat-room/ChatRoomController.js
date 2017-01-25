(function() {
    'use strict';

    angular.module('chatApp')
        .controller('ChatRoomController', ChatRoomController);

    ChatRoomController.$inject = ['$scope', '$timeout', '$state', '$firebaseArray', '$firebaseObject', '$rootScope', '$q', '$stateParams', 'loggedUser','$uibModal'];

    function ChatRoomController($scope, $timeout, $state, $firebaseArray, $firebaseObject, $rootScope, $q, $stateParams, loggedUser, $uibModal) {
        $scope.room = $stateParams.roomName;
        $scope.loggedUserKey = loggedUser.firebaseUserKey;
        $scope.loggedUser = loggedUser;
        $rootScope.config.hideRooms = true;

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

        $scope.checkIfImg = function(mess) {
            return !(mess.indexOf('.jpg') == -1 && mess.indexOf('.jpeg') == -1 && mess.indexOf('.png') == -1)
            // pentru formatele https://youtube.com/watch?v=VUkUi260Sn8
        };

            $scope.checkIfYoutubelink = function(mess) {
                return !(mess.indexOf('youtube.com') == -1 && mess.indexOf('youtu.be') == -1 )
                // pentru formatele https://youtube.com/watch?v=VUkUi260Sn8
            };

            $scope.getYouTubeId = function(mess){
                if(mess.indexOf('youtube.com') != -1){
                    return mess.split('=')[1]

                }else{
                    return mess.split('youtu.be/')[1]
                }
            };


        $scope.sendMessage = function(messageText) {
            var date = new Date();
            console.log("Date: ", date);
            var momentDate = moment(date).format("hh:mm");
            console.log("Moment Date: ", momentDate);
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
            $rootScope.config.hideRooms = false;
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
                    if ($scope.loggedUser.uid == usersArray[ukey].uid) {

                        userRef.child(ukey).remove();
                        console.log(ukey + " Removed");
                        // var  otherRef = firebase.database().ref('/rooms/' + $scope.room + '/users/' + ukey).set(null);
                        /*otherRef.on('value',  function(snap) {
                            // console.log(snap.val());
                        });*/
                    }
                }
            });
            //localStorage.setItem('hidenList', false);
            $state.go('chat');
        };

        $scope.userDetails = function(user){
            console.log("User details: ", user);
            var modalInsance = $uibModal.open({
                ariaLabeledBy: 'User Details',
                ariaDescribedBy: 'Body',
                windowClass: 'app-modal-window',
                templateUrl: 'components/chat-room/user-details.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    user: function(){
                        return user;
                    }
                }
            })
        };

         $scope.kick = function(user){
             console.log("kicked user: ", user);
            if($scope.loggedUser.displayName == $scope.roomCreator){
                $rootScope.$broadcast('kick', {user: user});
                var  usersArray  = [];
                var  users  = [];
                var  userRef  = firebase.database().ref('/rooms/' + $scope.room + '/users');
                userRef.once('value',  function(snap) {
                    usersArray = snap.val();
                    console.log("Users array: ", usersArray);
                    for (var ukey in usersArray) {
                        console.log("cheile ",ukey);
                        console.log("usersArray.userid: ", usersArray[ukey]);
                        console.log("usersArray[ukey].uid: ", usersArray[ukey].uid);
                        console.log("usersArray[ukey].displayName: ", usersArray[ukey].displayName);

                        console.log("user uid: YOLO ", user.uid, usersArray[ukey].uid);
                        if (usersArray[ukey].uid == user.uid) {
                            console.log("user uid: ", user.uid, usersArray[ukey].uid);
                            console.log(usersArray[ukey].displayName + " Removed");
                            userRef.child(ukey).remove();
                        }
                    }
                });
            }
        };

        var userKeysRef = firebase.database().ref('rooms/' + $scope.room + '/users/');
        userKeysRef.on('value', function(snap) {
            var userKeys = snap.val();
            console.log("Users", userKeys);
            var usersIDs = [];
            for(var ukey in userKeys){
                usersIDs.push(userKeys[ukey].uid);
            }
            console.log("userIDS: ", usersIDs, $scope.loggedUser.uid);
            if(usersIDs.indexOf($scope.loggedUser.uid) == -1){
                console.log("You have been disconnected");
                $state.go('chat');
            }
        });
    }
})();