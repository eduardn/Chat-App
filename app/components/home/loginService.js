angular.module('chatApp')
    .service('loginService', loginService);

  function loginService(){
    var username = "";

    this.setUsername = function(loggedUsername){
        username = loggedUsername;
    };

    this.getUsername = function(){
        return username;
    };
};