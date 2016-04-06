(function () {

    var appRegister = angular.module('appRegister', []);

    appRegister.controller('RegisterController', ['RegisterService', 'LoginService', '$location', '$scope', function (RegisterService, LoginService, $location, $scope) {

        var vm = this;

        this.register = function () {
           
            RegisterService.register(vm).then(function (response) {
                LoginService.login(vm.email, vm.password).then(function (response) {
                    $scope.applicationCtrl.isAuthenticated = true;
                    $scope.applicationCtrl.userName = vm.email;
                    $location.path('/profile');
                });

            });
        };

    }]);

})();