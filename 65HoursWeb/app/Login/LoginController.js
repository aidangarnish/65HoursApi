(function () {

    var appLogin = angular.module('appLogin', []);
    appLogin.controller('LoginController', ['config', '$http', '$scope', 'LoginService', '$location', function (config, $http, $scope, LoginService, $location) {

        this.credentials = {
            username: '',
            password: ''
        };

        this.login = function () {

            LoginService.login(this.credentials, config).then(function (user) {
                $scope.applicationCtrl.isAuthenticated = true;
                $scope.applicationCtrl.userName = user.userName;
                $location.path('/profile');
            }, function () {
                alert('failed');
            });
        };


        this.logout = function () {
            LoginService.logout();
        };

    }]);

})();