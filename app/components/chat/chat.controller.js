(function() {
    'use strict';

    angular.module('chatApp')
        .controller('ChatController', ChatController)
        .directive('createRoom', function() {
            return {
                // controller: 'ChatController',
                templateUrl: 'components/directives/createRoom.html'
            };
        })

    ChatController.$inject = ['$scope', '$state', 'loginService', '$localStorage', '$firebaseArray', '$firebaseObject', '$timeout', '$rootScope', '$q'];


    function ChatController($scope, $state, loginService, $localStorage, $firebaseArray, $firebaseObject, $timeout, $rootScope, $q) {


        $scope.$storage = $localStorage.$default();
        $scope.userName = $scope.$storage.loggedUsername;
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
            database.ref('/rooms').once('value').then(function(snap) {
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
         * take all active rooms
         * created on database
         */
        /*  function listRooms() {
              //var deferred = $q.defer();
              firebase.database().ref('/rooms').once('value').then(function(snapshot) {
                  var room = snapshot.val();
                  console.log(room);
                  $scope.activeRooms = [];
                  $timeout(function() {
                      for (var dataRooms in room) {
                          $scope.activeRooms.push(room[dataRooms].roomName)
                          console.log(room[dataRooms].roomName);
                      }
                  }, 5);
              });
          }*/


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
            console.log($scope.roomNameCreate);
            roomName = $scope.roomNameCreate;
            console.log(roomName);
            firebase.database().ref('rooms/' + roomName).set({
                "count": 0,
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
         *Join a room as
         *user, from the available rooms
         */
        $scope.joinRoom = function(room) {

                firebase.database().ref('rooms/' + room + '/users/').push($scope.userName);
                database.ref('rooms/' + room + '/count').once('value').then(function(snap) {
                    //console.log(snap.val());
                    // firebase.database('rooms/' + room + '/count').ref().update(updates)
                });

            }
            /*TESTING DATA FOR ROOM USERS

               firebase.database().ref('rooms/'+ 'room2' +'/users/').once('value').then(function(snapshot) {
                    var data = snapshot.val();
                    console.log(data);

                    for(var key in data ){
                        console.log(data[key]);
                    }

                });
                */
    }
})();