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
            database.ref('/rooms').once('value').then(function(snap) {
                $scope.rooms = snap.val();
                $scope.roomsNames = [];
                $timeout(function() {
                    for (var key in $scope.rooms) {
                        $scope.roomsNames.push($scope.rooms[key].roomName);
                    }
                }, 2);
            });
        }


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

        listUsers();

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
            roomName = $scope.roomNameCreate;
            //console.log(roomName);
            firebase.database().ref('rooms/' + roomName).set({
                "messageObj": {
                    "data": "18/11/2016",
                    "sender": $scope.userName,
                    "text": "1st Message"
                },
                "roomName": roomName,
                "users": {}
            });
            /*
             *Call again function to
             *list rooms to refresh
             *interface
             */
            $scope.roomNameCreate = null;
            $scope.listRooms();

            //  ` $scope.alert = {type: 'error', msg: 'Oh snap! Please insert a valid name!', show: true} ;      
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
            var starCountRef = firebase.database().ref('rooms/' + roomName + '/users');
            starCountRef.on('value', function(snapshot) {
                $scope.ok = false;
                console.log(snapshot.val());
                var roomUsers = snapshot.val();
                for (var counter in roomUsers) {
                    if ($scope.userName == roomUsers[counter]) {
                        $scope.ok = true
                    }
                }
                return $scope.ok;
            });
            return $scope.ok;
        };

        /*
         *Join a room as
         *user, from the available rooms
         */
        $scope.joinRoom = function(room) {
            if ($scope.checkUnique()) {
                console.log("user alrady in room");
                return;
            } else {
                console.log('user added');
                firebase.database().ref('rooms/' + room + '/users/').push($scope.userName);
                localStorage.setItem('roomJoined', room);
                $state.go('chat.room', { roomName: room });

                var roomUsersRef = firebase.database().ref('rooms/' + room + '/users/');
                roomUsersRef.on('value', function(snap) {})
            }
        }
    }
})();