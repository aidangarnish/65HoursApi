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
                console.log(response);
                return response;
            }, function (error) {
                console.log(error);
            });

            return promise;
        };

        profileService.save = function (user) {
            var promise = $http({
                method: 'POST',
                url: config.hoursApiUrl + '/api/Account/UpdateUser',
                data: user,
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });

            return promise;
        };

        profileService.getUserSkills = function () {
            var promise =
               $http({
                   method: 'GET',
                   url: config.hoursApiUrl + '/api/UserSkill/CurrentUserSkills',
                   headers: { 'Content-Type': 'application/json'}
               }).then(function (response) {
                   console.log(response);
                   return response;
               }, function (error) {
                   console.log(error);
               });

            return promise;
        };

        profileService.saveUserSkill = function(userSkill){
            var promise = $http({
                method: 'POST',
                url: config.hoursApiUrl + '/api/UserSkill/Save',
                data: userSkill,
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                console.log(response);
                return response;
            }, function (error) {
                console.log(error);
            });

            return promise;
        };

        profileService.deleteUserSkill = function (userSkillId) {
            var promise = $http({
                method: 'Delete',
                url: config.hoursApiUrl + '/api/UserSkill/Delete?id=' + userSkillId,
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });

            return promise;
        };


        profileService.saveUserRequest = function (userRequest) {
            var promise = $http({
                method: 'POST',
                url: config.hoursApiUrl + '/api/UserRequest/Save',
                data: userRequest,
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                console.log(response);
                return response;
            }, function (error) {
                console.log(error);
            });

            return promise;
        };
        return profileService;

    }]);

})();