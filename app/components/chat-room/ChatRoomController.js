(function() {
    'use strict';

    angular.module('chatApp')
        .controller('ChatRoomController', ChatRoomController);

    ChatRoomController.$inject = ['$scope', '$state', '$firebaseArray', '$firebaseObject', '$rootScope', '$q', '$stateParams'];
    function ChatRoomController($scope, $state, $firebaseArray, $firebaseObject, $rootScope, $q, $stateParams) {
       $scope.room = $stateParams.roomName;

        var database = firebase.database();

        //Get messages from room Bogdan.
        $scope.messages = [];
        var messagesArray = [];
        var messageRef = firebase.database().ref('/rooms/'+$scope.room+'/messageObj');
        messageRef.on('value', function(snap){

            messagesArray = snap.val();
            // console.log("Messages: ", messagesArray);
            var messageKeys = Object.keys(messagesArray);
            // console.log("Message Keys: ",messageKeys );

            for(var mkey in messagesArray){
                $scope.messages.push(messagesArray[mkey]);
                // console.log("Messages: ", $scope.messages);
            }

        });

        $scope.sendMessage = function(messageText){
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

    }
    })();