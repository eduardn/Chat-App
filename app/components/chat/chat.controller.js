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

        $scope.addButton = function() {
            document.getElementById('toggleProfile').addEventListener('click', function() {
                [].map.call(document.querySelectorAll('.profile'), function(el) {
                    el.classList.toggle('profile--open');
                });
            });
        }

        $scope.hideRooms = (localStorage.getItem('hidenList') === 'true');
        console.log($scope.hideRooms);
        $scope.$storage = $localStorage.$default();
        $scope.userName = $scope.$storage.loggedUsername;
        if (!$scope.userName) {
            console.log("should redirect to login");
            $location.path('/home');
        }
        //console.log("loggedUsername: ", $scope.userName);
        $scope.name = "";
        $scope.rooms = [];


        $scope.logout = function() {
        $scope.$storage = $localStorage.$reset();
        var  userRef  = firebase.database().ref('/rooms/');

            userRef.once('value',  function(snap) {
                var usersArray = snap.val();
                for (var ukey in usersArray) {
                    for (var ukeyUser in usersArray[ukey].users) {
                        console.log(usersArray[ukey].users[ukeyUser] + " ukeyUser");
                        console.log(localStorage.getItem('userNameLogged'));
                        if (usersArray[ukey].users[ukeyUser] === localStorage.getItem('userNameLogged')) {
                            //console.log(ukeyUser + ' tadaaaaaaaaaaaaaaa')
                            var remove = firebase.database().ref('/rooms/' + ukey + '/users/' + ukeyUser ).remove();
                   
                                                }
                    }
                }
                  });

                    

            var userLoggedUserRef = firebase.database().ref('/users/');
            userLoggedUserRef.once('value', function(snap){ 
            var users = snap.val();
        console.log(users);
        for(var ukeyUser in users){
                        if(users[ukeyUser]===$scope.userName){
                            console.log(users[ukeyUser] + " ukeyUser");
                            var removeUser = firebase.database().ref('/users/'+ ukeyUser).remove();
                        }
                    
        }
        });

            localStorage.clear();
            console.log("Logged out");
            $state.go('home');
        };



  

        /*
         *GAD team code
         *list rooms
         */
        var database = firebase.database();

        $scope.listRooms = function() {
            database.ref('/rooms').on('value', function(snap) {
                $scope.rooms = snap.val();
                //console.log($scope.rooms);
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
            $scope.ok = false;

            //localStorage.setItem('lockJoin', false);
            var roomName = localStorage.getItem('roomJoined');
            //$scope.ok = false;
            console.log(roomName);
            var starCountRef = firebase.database().ref('rooms/' + roomName + '/users');
            starCountRef.on('value', function(snapshot) {
                $scope.ok = false;
                // console.log(snapshot.val());
                var roomUsers = snapshot.val();
                for (var counter in roomUsers) {
                    if ($scope.userName == roomUsers[counter]) {
                        $scope.ok = true
                            //localStorage.setItem('lockJoin', true);
                    }
                }
                return $scope.ok;
                //return localStorage.getItem('lockJoin')
            });
            return $scope.ok;
            //return localStorage.getItem('lockJoin')
        };

        /*
         *Join a room as
         *user, from the available rooms
         */
        $scope.joinRoom = function(room) {
            //$scope.hideRooms = true;
            localStorage.setItem('hidenList', true);
            $scope.hideRooms = (localStorage.getItem('hidenList') === 'true');
            localStorage.setItem('roomJoined', room);
            if ($scope.checkUnique()) {
                console.log('problem');
                $scope.userInRomm = true;
                return;
            } else {
                console.log('here');
                $scope.ok = false;
                $scope.userInRomm = false;
                var newUserKey = firebase.database().ref('/users/').push().key;

                var updateUser = {};
                updateUser['/rooms/' + room + '/users/' + newUserKey] = $scope.userName;
                firebase.database().ref().update(updateUser);

                $state.go('chat.room', { roomName: room });
            };

        }


        /*  $scope.$on('toggleRooms', function(event, arg) {
              $scope.hideRooms = arg;
          });*/
    }
})();