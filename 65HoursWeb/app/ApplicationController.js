(function () {

    var appApplication = angular.module('appApplication', ['appLogin', 'appSession']);


    appApplication.controller('ApplicationController', ['LoginService', 'SessionService', function (LoginService, SessionService) {
        this.currentUser = null;

        this.isAuthenticated = SessionService.isAuthenticated();

        this.userName = SessionService.userName;

        this.setCurrentUser = function (user) {
            this.currentUser = user;
        };

        this.logOut = function () {
            LoginService.logOut();
            this.isAuthenticated = false;
        };
    }]);

})();