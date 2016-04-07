(function () {

    var appLogin = angular.module('appLogin', []);
    appLogin.controller('LoginController', ['LoginService', '$location', 'SessionService', '$scope', function (LoginService, $location, SessionService, $scope) {

        var vm = this;
      
        $scope.applicationCtrl.alerts = [];

        

        this.login = function () {

            LoginService.login(vm.credentials.username, vm.credentials.password).then(function (response) {
                if (!response.status) {
                    $scope.applicationCtrl.isAuthenticated = true;
                    $scope.applicationCtrl.userName = response.userName;
                    $location.path(SessionService.postLogInRoute);
                }
                else
                {
                    $scope.applicationCtrl.alerts.push({ type: 'danger', msg: response.data.error_description });
                }
            }, function (error) {
                console.log(error);
               
            });
        };

    }]);

})();