(function () {

    var tokenKey = 'accessToken';

    var appLogin = angular.module('appLogin');
    appLogin.factory('LoginService', ['$http', 'SessionService', function ($http, SessionService) {

        var loginService = {};

        loginService.login = function (credentials, config) {
            var promise = $http({
                method: 'POST',
                url: config.hoursApiUrl + '/Token',
                data: "userName=" + credentials.username +
                     "&password=" + credentials.password +
                     "&grant_type=password",
                headers: { contentType: 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                alert(response.data.access_token);
                sessionStorage.setItem(tokenKey, response.data.access_token);
                SessionService.create(response.data.userName, response.data.access_token);
                return response.data;
            }, function (error) {
                alert(error.data.error_description);
            });

            return promise;
        };

        loginService.isAuthenticated = function () {
            return !!SessionService.userId;
        };


        loginService.logout = function () {
            sessionStorage.removeItem(tokenKey);
        };

        return loginService;

    }]);

})();