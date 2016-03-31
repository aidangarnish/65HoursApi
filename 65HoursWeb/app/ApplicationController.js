(function () {

    var appApplication = angular.module('appApplication', ['appLogin', 'appSession']);


    appApplication.controller('ApplicationController', ['LoginService', 'SessionService', function (LoginService, SessionService) {

        this.isAuthenticated = SessionService.isAuthenticated();

        this.userName = SessionService.userName;

        this.logout = function () {
            LoginService.logout();
            this.isAuthenticated = false;
        };
    }]);

})();