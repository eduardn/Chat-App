/**
 * Created by bcojocariu on 11/3/2016.
 */
(function(){
    'use strict';

    angular.module('chatApp')
        .controller('ChatController',ChatController);

    ChatController.$inject=['$scope', '$state'];

    function ChatController($scope, $state){

        $scope.name = "";

        $scope.logout = function(){
            console.log("Logged out");
            $state.go('home');
        }


    }

})();
