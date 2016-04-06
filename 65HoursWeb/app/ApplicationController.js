(function () {

    var appApplication = angular.module('appApplication', ['appLogin', 'appSession']);


    appApplication.controller('ApplicationController', ['LoginService', 'SessionService', '$location', function (LoginService, SessionService, $location) {

        var applicationCtrl = this;

        applicationCtrl.isAuthenticated = SessionService.isAuthenticated();

        applicationCtrl.userName = SessionService.userName;

        applicationCtrl.logout = function () {
            LoginService.logout();
            this.isAuthenticated = false;
            $location.path('/home');
        };

        applicationCtrl.closeAlert = function (index) {
            applicationCtrl.alerts.splice(index, 1);
        };

    }]);

})();