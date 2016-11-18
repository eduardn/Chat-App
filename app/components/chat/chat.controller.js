/**
 * Created by bcojocariu on 11/3/2016.
 */
(function(){
    'use strict';

    angular.module('chatApp')
        .controller('ChatController',ChatController);

    ChatController.$inject=['$scope', '$state', 'loginService', '$localStorage'];

    function ChatController($scope, $state,loginService, $localStorage){

        $scope.$storage = $localStorage.$default();

        $scope.username = $scope.$storage.loggedUsername;



        console.log("loggedUsername: ", $scope.username)

        $scope.logout = function(){
            console.log("Logged out");
            $state.go('home');
            $scope.$storage = $localStorage.$reset();
        }


    }

})();
