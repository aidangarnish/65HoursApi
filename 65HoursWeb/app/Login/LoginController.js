(function () {

    var appLogin = angular.module('appLogin');
    appLogin.controller('LoginController', ['$http', '$scope', 'LoginService', function ($http, $scope, LoginService) {

        this.credentials = {
            username: '',
            password: ''
        };

        this.login = function () {

            LoginService.login(this.credentials).then(function (user) {
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