(function () {

    var appProfile = angular.module('appProfile');
    appProfile.factory('ProfileService', ['config', '$http', 'SessionService', '$cookies', function (config, $http, SessionService, $cookies) {

        var profileService = {};

        profileService.getUser = function () {
            var promise =
                $http({
                method: 'GET',
                url: config.hoursApiUrl + '/api/Account/GetUser',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + SessionService.accessToken }
            }).then(function (response) {
                return response;
            }, function (error) {
                alert(error.data.error_description);
            });

            return promise;
        };

        profileService.getUserStatic = function () {
            return  { FirstName: 'AidanStatic', LastName: 'GarnishedStatic'};
        };

        profileService.save = function (user) {
            var promise = $http({
                method: 'POST',
                url: config.hoursApiUrl + '/api/Account/UpdateUser',
                data: user,
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                alert(response);               
            }, function (error) {
                alert(error.data.error_description);
            });

            return promise;
        };

        return profileService;

    }]);

})();