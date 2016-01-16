(function () {

    var appLogin = angular.module('appLogin');
    appLogin.controller('LoginController', ['config', '$http', '$scope', 'LoginService', function (config, $http, $scope, LoginService) {

        this.credentials = {
            username: '',
            password: ''
        };

        this.login = function () {

            LoginService.login(this.credentials, config).then(function (user) {
                $scope.applicationCtrl.isAuthenticated = true;
                $scope.applicationCtrl.userName = user.userName;
            }, function () {
                alert('failed');
            });
        };


        this.logout = function () {
            sessionStorage.removeItem(tokenKey);
        };

    }]);

})();