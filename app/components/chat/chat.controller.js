(function() {
    'use strict';

    angular.module('chatApp')
        .controller('ChatController', ChatController)
        .directive('createRoom', function() {
            return {
                // controller: 'ChatController',
                templateUrl: 'components/directives/createRoom.html'
            };
        });

    ChatController.$inject = ['$scope', '$state', '$location', 'loginService', '$localStorage', '$firebaseArray', '$firebaseObject', '$timeout', '$rootScope', '$q'];


    function ChatController($scope, $state, $location, loginService, $localStorage, $firebaseArray, $firebaseObject, $timeout, $rootScope, $q) {

        $scope.$storage = $localStorage.$default();
        $scope.userName = $scope.$storage.loggedUsername;
        if (!$scope.userName) {
            console.log("should redirect to login");
            $location.path('/home');
        }
        console.log("loggedUsername: ", $scope.userName);
        $scope.name = "";
        $scope.rooms = [];


        $scope.logout = function() {
            $scope.$storage = $localStorage.$reset();
            console.log("Logged out");
            $state.go('home');

        };

        /*
         *GAD team code
         *list rooms
         */
        var database = firebase.database();

        $scope.listRooms = function() {
            database.ref('/rooms').on('value',function(snap) {
                $scope.rooms = snap.val();
                var roomNames = [];

                for (var key in $scope.rooms) {
                    roomNames.push($scope.rooms[key].roomName);
                }
                $scope.roomsNames = [];

                $timeout(function() {
                    $scope.roomNames = roomNames;
                }, 0);
            });
        };


        /* GAD team code */
        function listUsers() {
            database.ref('/rooms/Bogdan/users/').once('value').then(function(snap) {
                $scope.rooms = snap.val();
                // console.log($scope.rooms);
                $timeout(function() {
                    for (var key in $scope.rooms) {
                        // console.log($scope.rooms[key].users);
                    }
                }, 5);
            });
        }

        // listUsers();

        /*
         *Call function to
         *list users
         */
        $scope.listRooms();

        /*
         * https://firebase.google.com/docs/database/web/read-and-write
         * adding a new room to database
         * TO DO : RESOLVE WITH MESSAGES
         */
        $scope.writeRoomData = function(roomName) {
            var roomName = $scope.roomNameCreate;
            //console.log(roomName);
            var messageObject = {
                sender: "RoomBot",
                text: "Welcome to the room"
            };
            // Get a key for a new Post.
            var newPostKey = firebase.database().ref().child('rooms').child($scope.roomNameCreate).child('messageObj').push().key;
            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/rooms/' + $scope.roomNameCreate + '/roomName'] = $scope.roomNameCreate;
            updates['/rooms/' + $scope.roomNameCreate + '/messageObj/' + newPostKey] = messageObject;


            /*
             *Call again function to
             *list rooms to refresh
             *interface
             */
            $scope.roomNameCreate = null;
            $scope.listRooms();

            return firebase.database().ref().update(updates);

        }

        /*
         *count users in a room
         *and return the number
         */
        $scope.getCount = function(users) {
            var i = 0;
            for (var p in users) {
                if (users.hasOwnProperty(p)) {
                    i++
                }
            }
            return i

        };

        $scope.checkUnique = function() {
            var roomName = localStorage.getItem('roomJoined');
            console.log('user in room ' + roomName);
            database.ref('rooms/' + roomName + '/users').once('value').then(function(snap) {
                var roomUsers = snap.val();
                var userCount = 0;
                for (var counter in roomUsers) {
                    if ($scope.userName == roomUsers[counter]) {
                        userCount = userCount + 1;
                        console.log(userCount + "number of joined users")
                    }
                }
                if (userCount > 1) {
                    return true;
                } else {
                    return false;
                }

            });
        };

        /*
         *Join a room as
         *user, from the available rooms
         */
        $scope.joinRoom = function(room) {
            $scope.checkUnique();
            firebase.database().ref('rooms/' + room + '/users/').push($scope.userName);
            localStorage.setItem('roomJoined', room);
            $state.go('chat.room', { roomName: room });
            var roomUsersRef = firebase.database().ref('rooms/' + room + '/users/');
            roomUsersRef.on('value', function(snap) {})
        };

    }
})();