/**
 * Created by bcojocariu on 11/3/2016.
 */
(function() {
    'use strict';

    angular.module('chatApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', '$rootScope', '$stateParams', 'loginService'];

    function HomeController($scope, $state, $rootScope, $stateParams, loginService) {



        $scope.addButton = function() {
            document.getElementById('$toggleProfile').addEventListener('click', function() {
                [].map.call(document.querySelectorAll('.profile'), function(el) {
                    el.classList.toggle('profile--open');
                });
            });
        };

        var database = firebase.database();

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $scope.$storage = {};
        $scope.username = "";
        $scope.usercolor = getRandomColor();
        console.log($scope.usercolor);

        $scope.myStyle = { 'color': getRandomColor() };
        $scope.login = function(username) {
            localStorage.setItem('userNameLogged', username);
            if (username) {
                localStorage.setItem('userNameLogged', JSON.stringify({
                    loggedUsername: username,
                    usercolor: $scope.usercolor
                }));
                $scope.$storage = JSON.parse(localStorage.getItem('userNameLogged'));
                //Save user to firebase
                var newUserKey = firebase.database().ref().child('users').push().key;
                //console.log(newUserKey);
                var updateUser = {};
                updateUser['/users/' + newUserKey] = username;
                firebase.database().ref().update(updateUser);
                $state.go('chat');
            } else {
                $scope.loginError = true;
            }

        };

        database.ref('/users').once('value').then(function(snap) {
            console.log(snap.val());
        });

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }



    }

})();