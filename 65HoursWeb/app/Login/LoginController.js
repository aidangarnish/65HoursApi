(function () {

    var appLogin = angular.module('appLogin', []);
    appLogin.controller('LoginController', ['LoginService', '$location', 'SessionService', '$scope', function (LoginService, $location, SessionService, $scope) {

        var vm = this;
      
        $scope.applicationCtrl.alerts = [];

        

        this.login = function () {

            LoginService.login(vm.credentials.username, vm.credentials.password).then(function (user) {
                $scope.applicationCtrl.isAuthenticated = true;
                $scope.applicationCtrl.userName = user.userName;
                $location.path(SessionService.postLogInRoute);
            }, function (error) {
                console.log(error);
                $scope.applicationCtrl.alerts.push({ type: 'danger', msg: 'Another alert!' });
            });
        };

    }]);

})();