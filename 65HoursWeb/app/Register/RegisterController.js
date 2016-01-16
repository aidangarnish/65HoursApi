(function () {

    var appRegister = angular.module('appRegister', []);

    appRegister.controller('RegisterController', ['config', '$http', 'RegisterService', function (config, $http, RegisterService) {

        this.register = function () {
            var data = {
                Email: this.email,
                Password: this.password,
                ConfirmPassword: this.password2
            };
            RegisterService.register(data, config);
        };

    }]);

})();