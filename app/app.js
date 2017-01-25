/**
 * Created by bcojocariu on 11/3/2016.
 */
(function() {
    'use strict';

    angular.module('chatApp', ['ui.router', 'firebase', 'ngStorage', 'ngEmoji', 'ngSanitize', 'ngScrollGlue','angularMoment'])
        .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'components/home/home.html',
                    controller: 'HomeController'
                })

            .state('chat', {
                url: '/chat',
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

    .run(['$emoji', function($emoji) {
        $emoji.setConfig({
            img_dir: 'http://hassankhan.github.io/emojify.js/images/emoji'
        })
    }]);
//     myapp.run(function(amMoment) {
//     amMoment.changeLocale('de');
// });

})();