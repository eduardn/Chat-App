
(function(){
    'use strict';

    angular.module('chatApp')
        .controller('ChatController',ChatController);

    ChatController.$inject=['$scope', '$state','$firebaseArray','$timeout'];

    function ChatController($scope, $state,$firebaseArray, $timeout){

        $scope.name = "";
        $scope.rooms = [];
        $scope.roomsNames = [];

        $scope.logout = function(){
            console.log("Logged out");
            $state.go('home');
        }

        var database = firebase.database();

        database.ref('/rooms').once('value').then(function(snap){
            $scope.rooms = snap.val();
            console.log($scope.rooms);
        
            $timeout(function(){
                for( var key in $scope.rooms){
                $scope.roomsNames.push($scope.rooms[key].roomName);
                }
             console.log($scope.roomsNames);},5);
        });
    }

})();
