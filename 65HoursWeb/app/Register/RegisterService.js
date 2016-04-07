(function () {


    var appRegister = angular.module('appRegister');

    appRegister.factory('RegisterService', ['$http', 'config', function ($http, config) {

        var registerService = {};

        registerService.register = function (data) {

            var promise = $http({
                method: 'POST',
                url: config.hoursApiUrl + '/api/Account/Register',
                headers: {
                    contentType: 'application/json; charset=utf-8'
                },
                data: JSON.stringify(data)
            }).then(function (response) {
                console.log(response);
                return response;
            }, function (error) {
                console.log(error);
                return error;
            });

            return promise;
        };

        return registerService;

    }]);

})();