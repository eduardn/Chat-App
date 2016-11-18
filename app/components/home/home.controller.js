/**
 * Created by bcojocariu on 11/3/2016.
 */
(function(){
    'use strict';

    angular.module('chatApp')
        .controller('HomeController',HomeController);

    HomeController.$inject=['$scope', '$state','$rootScope', '$stateParams', '$firebaseObject'];

    function HomeController($scope, $state, $rootScope, $stateParams, $firebaseObject){

        var database = firebase.database();

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $scope.name = "";

        $scope.login = function(username){
            console.log("Username: ", username);
            $state.go('chat');
        };

        database.ref('/users').once('value').then(function(snap){
            console.log(snap.val());
        });
    }

})();
