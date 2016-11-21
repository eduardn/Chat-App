/**
 * Created by bcojocariu on 11/3/2016.
 */
(function(){
    'use strict';

    angular.module('chatApp')
        .controller('HomeController',HomeController);

    HomeController.$inject=['$scope', '$state','$rootScope', '$stateParams', 'loginService', '$localStorage'];

    function HomeController($scope, $state, $rootScope, $stateParams, loginService, $localStorage){

        var database = firebase.database();

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $scope.username = "";

        $scope.login = function(username){
            if(username){
                // loginService.setUsername(username);

                $scope.$storage = $localStorage.$default({
                    loggedUsername: username
                });

                console.log("Username: ", username);

                console.log("LocalStorage: ", $scope.$storage.loggedUsername);
                $state.go('chat');
            } else {
                $scope.loginError = true;
            }

        };

        database.ref('/users').once('value').then(function(snap){
            console.log(snap.val());
        });
    }

})();
