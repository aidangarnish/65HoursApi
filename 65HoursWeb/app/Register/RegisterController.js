(function () {

    var appRegister = angular.module('appRegister', []);

    appRegister.controller('RegisterController', ['RegisterService', 'LoginService', 'ApplicationService', '$location', '$scope', function (RegisterService, LoginService, ApplicationService, $location, $scope) {

        var vm = this;

        $scope.applicationCtrl.alerts = [];

        this.register = function () {
           
            RegisterService.register(vm).then(function (response) {

                if (!response.status) {
                    LoginService.login(vm.email, vm.password).then(function (response) {
                        if (!response.status) {

                            $scope.applicationCtrl.isAuthenticated = true;
                            $scope.applicationCtrl.userName = vm.email;
                            $location.path('/profile');
                        }
                        else {
                            $scope.applicationCtrl.alerts.push({ type: 'danger', msg: response.data.error_description });
                        }
                    });
                }
                else {
                    $scope.applicationCtrl.alerts = ApplicationService.displayModelStateErrors(response.data.ModelState);                  
                }

            });
        };

    }]);

})();