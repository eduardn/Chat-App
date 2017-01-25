/**
 * Created by bcojocariu on 11/3/2016.
 */
(function() {
    'use strict';

    angular.module('chatApp', ['ui.router','ui.bootstrap', 'firebase', 'ngStorage', 'ngEmoji', 'ngSanitize', 'ngScrollGlue'])
        .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {


            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'components/home/home.html',
                    controller: 'HomeController',
                    onEnter: ['loginService', '$state', function (loginService, $state) {
                        if (loginService.isLoggedIn()) {
                            console.log("From Home state: ", loginService.isLoggedIn());
                            $state.go('chat');
                        }
                    }]
                })
            .state('chat', {
                url: '/chat',
                onEnter: ['loginService', '$state', function (loginService, $state) {
                    if (!loginService.isLoggedIn()) {
                        $state.go('home');
                    }
                }],
                resolve: {
                    loggedUser: ['$localStorage', function($localStorage) {
                        console.log("LocalStorage User: ", $localStorage.currentUser);
                        return $localStorage.currentUser;

                    }]
                        // ['loginService', function (loginService) {
                        // console.log("State resolve: ", loginService.isLoggedIn());
                        // var user = loginService.isLoggedIn();
                        // return user;
                    // }]
                },
                params:{
                    userKey: null
                },
                templateUrl: 'components/chat/chat.html',
                controller: 'ChatController'
            })

            .state('chat.room', {
                url: '/:roomName',
                params:{
                    userKey: null
                },
                templateUrl: 'components/chat-room/chat.room.html',
                controller: 'ChatRoomController'
            })
        }])

    .run(['$emoji', '$rootScope', function($emoji,$rootScope) {
        //$rootScope.config.hideRooms = false;
        $rootScope.config = {
            hideRooms: false
        };

        $emoji.setConfig({
            img_dir: 'http://hassankhan.github.io/emojify.js/images/emoji'
        })
    }]);

})();