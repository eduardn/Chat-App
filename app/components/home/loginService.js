
(function() {
    'use strict';

    angular.module('chatApp')
        .service('loginService', loginService);

    function loginService(){
        var username = "";
        var hideRoomsFromChat = "";

        this.setUsername = function(loggedUsername){
            username = loggedUsername;
        };

        this.getUsername = function(){
            return username;
        };
    };

})();