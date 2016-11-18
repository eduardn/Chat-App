/**
 * Created by bcojocariu on 11/3/2016.
 */
(function(){
    'use strict';

    angular.module('chatApp',['ui.router', 'firebase'])
        .config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider, $stateProvider){
            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('home',{
                    url: '/home',
                    //template: '<h1>HomePage</h1>',
                    templateUrl: 'components/home/home.html',
                    controller: 'HomeController'
                })

                .state('chat',{
                    url: '/chat',
                    templateUrl: 'components/chat/chat.html',
                    controller: 'ChatController'
                })

        }])

})();