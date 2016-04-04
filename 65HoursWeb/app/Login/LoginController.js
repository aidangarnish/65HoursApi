(function () {

    var appLogin = angular.module('appLogin', []);
    appLogin.controller('LoginController', ['config', '$http', '$scope', 'LoginService', '$location', 'SessionService', function (config, $http, $scope, LoginService, $location, SessionService) {

        this.credentials = {
            username: '',
            password: ''
        };

        this.login = function () {

            LoginService.login(this.credentials, config).then(function (user) {
                $scope.applicationCtrl.isAuthenticated = true;
                $scope.applicationCtrl.userName = user.userName;
                $location.path(SessionService.postLogInRoute);
            }, function () {
                alert('failed');
            });
        };


        this.logout = function () {
            LoginService.logout();
            $location.path('/home');
        };

    }]);

})();