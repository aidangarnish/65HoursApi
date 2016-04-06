(function () {

    var appSearch = angular.module('appSearch');
    appSearch.factory('SearchService', ['config', '$http', function (config, $http) {

        var searchService = {};

        seacrchService.search(searchQuery) = function () {
            var promise =
               $http({
                   method: 'GET',
                   url: config.hoursApiUrl + '/api/Search/Query',
                   headers: { 'Content-Type': 'application/json' }
               }).then(function (response) {
                   console.log(response);
                   return response;
               }, function (error) {
                   console.log(error);
               });

            return promise;
        };

        return searchService;

    }]);

})();