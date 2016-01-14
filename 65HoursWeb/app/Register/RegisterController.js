(function () {

    var appRegister = angular.module('appRegister', []);

    appRegister.controller('RegisterController', ['$http', 'RegisterService', function ($http, RegisterService) {

        this.register = function () {
            var data = {
                Email: this.email,
                Password: this.password,
                ConfirmPassword: this.password2
            };
            RegisterService.register(data);
        };

    }]);

})();