(function () {

    var appApplication = angular.module('appApplication', ['appLogin', 'appSession']);


    appApplication.controller('ApplicationController', ['LoginService', 'SessionService', '$location', function (LoginService, SessionService, $location) {

        this.isAuthenticated = SessionService.isAuthenticated();

        this.userName = SessionService.userName;

        this.logout = function () {
            LoginService.logout();
            this.isAuthenticated = false;
            $location.path('/home');
        };
    }]);

})();