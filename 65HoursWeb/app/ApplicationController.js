(function () {

    var appApplication = angular.module('appApplication', ['appLogin', 'appSession']);


    appApplication.controller('ApplicationController', ['LoginService', 'SessionService', function (LoginService, SessionService) {
        this.currentUser = null;

        this.isAuthenticated = LoginService.isAuthenticated();

        this.userName = SessionService.userId;

        this.setCurrentUser = function (user) {
            this.currentUser = user;
        };
    }]);

})();