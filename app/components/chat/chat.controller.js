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
            console.log("Logged out");
            $state.go('home');
            $scope.$storage = $localStorage.$reset();
        }

        /*
         *GAD team code
         *list rooms
         */
        var database = firebase.database();

        function listRooms() {
            database.ref('/rooms').once('value').then(function(snap) {
                $scope.rooms = snap.val();
                $scope.roomsNames = [];
                $timeout(function() {
                    for (var key in $scope.rooms) {
                        $scope.roomsNames.push($scope.rooms[key].roomName);
                    }
                }, 5);
            });
        }


        /* GAD team code */
        function listUsers() {
            database.ref('/rooms').on('value').then(function(snap) {
                $scope.rooms = snap.val();
                $timeout(function() {
                    for (var key in $scope.rooms) {
                        console.log(key);
                    }
                }, 5);
            });
        }

        listUsers();

        /*
         *Call function to
         *list users
         */
        listRooms();

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
            listRooms();
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
                for (var counter in roomUsers) {
                    if ($scope.userName == roomUsers[counter]) {
                        return true
                    }
                }

            });
        }


        /*
         *Join a room as
         *user, from the available rooms
         */
        $scope.joinRoom = function(room) {
            $scope.checkUnique();
            firebase.database().ref('rooms/' + room + '/users/').push($scope.userName);
            localStorage.setItem('roomJoined', room);

        }

        /* $scope.listUsersRoom = function() {
             var roomName = localStorage.getItem('roomJoined');
             console.log('users in room ' + roomName)
             if (roomName != undefined) {
                 database.ref('rooms/' + roomName + '/users').once('value').then(function(snap) {
                     var roomUsers = snap.val();
                     for (var i in roomUsers) {
                         console.log(roomUsers[i]);
                     }
                     // firebase.database('rooms/' + room + '/count').ref().update(updates)
                 });
             }
         }
         $scope.listUsersRoom();*/
    }
})();