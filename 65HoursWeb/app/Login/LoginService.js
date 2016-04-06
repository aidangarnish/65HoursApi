(function () {

    var tokenKey = 'accessToken';

    var appLogin = angular.module('appLogin');
    appLogin.factory('LoginService', ['$http', 'SessionService', 'config', '$cookies', function ($http, SessionService, config, $cookies) {

        var loginService = {};

        loginService.login = function (userName, password) {
            var promise = $http({
                method: 'POST',
                url: config.hoursApiUrl + '/Token',
                data: "userName=" + userName +
                     "&password=" + password +
                     "&grant_type=password",
                headers: { contentType: 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                $cookies.put("username", response.data.userName);
                $cookies.put("accessToken", response.data.access_token);
                SessionService.create(response.data.userName, response.data.access_token);
                return response.data;
            }, function (error) {
                console.log(error);
            });

            return promise;
        };

        loginService.logout = function () {
            $cookies.remove("username");
            $cookies.remove("accessToken");
            SessionService.userName = '';
            SessionService.accessToken = '';
        };

        return loginService;

    }]);

})();