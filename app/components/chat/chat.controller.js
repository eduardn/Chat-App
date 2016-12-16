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


    ChatController.$inject = ['$scope', '$state', '$location', 'loginService', '$localStorage', '$stateParams', '$firebaseObject', '$timeout', '$rootScope', '$q'];


    function ChatController($scope, $state, $location, loginService, $localStorage, $stateParams, $firebaseObject, $timeout, $rootScope, $q) {
        var loggedUserKey = $stateParams.userKey;
        console.log("loggedUserKey:", loggedUserKey);

        var loggedUserRef = firebase.database().ref('/users/' + loggedUserKey);
            loggedUserRef.once('value', function(snap){
                $scope.loggedUser = snap.val();
                console.log("Logged User", $scope.loggedUser)
            });



        $scope.hideRooms = (localStorage.getItem('hidenList') === 'false');
        console.log($scope.hideRooms);
        $scope.$storage = $localStorage.$default();
        $scope.userName = $scope.$storage.loggedUsername;
        if (!$scope.loggedUser) {
            console.log("should redirect to login");
            $location.path('/home');
        }
        //console.log("loggedUsername: ", $scope.userName);
        $scope.name = "";
        $scope.rooms = [];

        $scope.fblogout = function(){
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                console.log("User logged out");
            }, function(error) {
                // An error happened.
            });
        };


        $scope.logout = function() {
            //$scope.$storage = $localStorage.$reset();
            var  userRef  = firebase.database().ref('/rooms/');

            userRef.once('value',  function(snap) {
                var usersArray = snap.val();
                for (var ukey in usersArray) {
                    for (var ukeyUser in usersArray[ukey].users) {
                        console.log(usersArray[ukey].users[ukeyUser] +  ukeyUser);
                        if (usersArray[ukey].users[ukeyUser] == loggedUserKey) {
                            firebase.database().ref('/rooms/' + ukey + '/users/' + ukeyUser ).remove();

                        }
                    }
                }
            });


            var userLoggedUserRef = firebase.database().ref('/users/');
            userLoggedUserRef.once('value', function(snap){
                var users = snap.val();
                for(var ukeyUser in users){
                    if(users[ukeyUser] == loggedUserKey){
                        console.log(users[ukeyUser] +  ukeyUser);
                        firebase.database().ref('/users/'+ ukeyUser).remove();
                        $state.go('home');
                    }

                }
            });
          //  localStorage.clear();
            console.log("Logged out");
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
                var roomImages = [];
                for (var key in $scope.rooms) {
                    roomNames.push($scope.rooms[key].roomName);
                    roomImages.push($scope.rooms[key].imageUrl)
                }
                $scope.roomsNames = [];
                $timeout(function() {
                    $scope.roomNames = roomNames;
                    $scope.roomImages = roomImages;
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
        $scope.imagesUrls = ['http://www.imarijuana.com/wp-content/uploads/2011/10/Romania-Marijuana-Laws.png',
            'http://pix.iemoji.com/images/emoji/apple/ios-9/256/christmas-tree.png',
            'http://icons.veryicon.com/png/Sport/Sport/Basketball.png',
            'https://65.media.tumblr.com/avatar_ee6f82e163e3_128.png',
            'http://pix.iemoji.com/images/emoji/apple/ios-9/256/beer-mug.png',
            'http://pix.iemoji.com/images/emoji/apple/ios-9/256/party-popper.png',
            'https://s-media-cache-ak0.pinimg.com/564x/36/92/52/36925231de3dea90fd0d3c8fd9510d74.jpg',
            'http://icons.iconarchive.com/icons/visualpharm/animals/256/Panda-icon.png',
            'http://www.iconarchive.com/download/i86393/atyourservice/service-categories/Makeup.ico'];

        $scope.saveRoomImage = function(imageUrl){
            console.log(imageUrl);
            $scope.roomImage = imageUrl;
        };

        $scope.writeRoomData = function(roomName) {
            var roomName = $scope.roomNameCreate;

            var messageObject = {
                sender: "RoomBot",
                senderPhotoURL: "https://avatars1.githubusercontent.com/u/6422482?v=3&s=400",
                text: "Welcome to this room!"
            };
            // Get a key for a new Post.
            var newPostKey = firebase.database().ref().child('rooms').child($scope.roomNameCreate).child('messageObj').push().key;
            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/rooms/' + $scope.roomNameCreate + '/roomName'] = $scope.roomNameCreate;
            updates['/rooms/' + $scope.roomNameCreate + '/messageObj/' + newPostKey] = messageObject;
            updates['/rooms/' + $scope.roomNameCreate + '/creator'] = $scope.loggedUser.displayName;
            updates['/rooms/' + $scope.roomNameCreate + '/imageUrl'] = $scope.roomImage;


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

                //write user to room

                var updateUser = {};
                updateUser['/rooms/' + room + '/users/' + loggedUserKey] = $scope.loggedUser;
                firebase.database().ref().update(updateUser);

                $state.go('chat.room', { roomName: room, userKey: loggedUserKey});
            };

        }


        /*  $scope.$on('toggleRooms', function(event, arg) {
         $scope.hideRooms = arg;
         });*/
    }
})();
