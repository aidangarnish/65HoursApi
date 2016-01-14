(function () {


    var appRegister = angular.module('appRegister');

    appRegister.factory('RegisterService', ['$http', function ($http) {

        var registerService = {};

        registerService.register = function (data) {

            var promise = $http({
                method: 'POST',
                url: 'https://localhost:44300/api/Account/Register',
                headers: {
                    contentType: 'application/json; charset=utf-8'
                },
                data: JSON.stringify(data)
            }).then(function (response) {
                alert('done');
            }, function (error) {
                alert(error.data.Message);
            });

            return promise;
        };

        return registerService;

    }]);

})();