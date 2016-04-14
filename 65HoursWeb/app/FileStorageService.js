(function () {

    var appFileStorage = angular.module('appFileStorage', []);
    appFileStorage.factory('FileStorageService', ['$http', 'config', function ($http, config) {

        var fileStorageService = {};

        fileStorageService.getFileUploadParams = function (extension) {
            var promise =
               $http({
                   method: 'GET',
                   url: config.hoursApiUrl + '/api/FileStorage/ClientFileUploadParams?extension=' + extension,
                   headers: { 'Content-Type': 'application/json' }
               }).then(function (response) {
                   console.log(response);
                   return response;
               }, function (error) {
                   console.log(error);
                   return error;
               });

            return promise;
        };

        

        return fileStorageService;

    }]);

})();