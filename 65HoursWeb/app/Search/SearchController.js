(function () {

    var appSearch = angular.module('appSearch', []);
    appSearch.controller('SearchController', ['SearchService', function (SearchService) {

        var vm = this;

        vm.search = function() {
            SearchService.search(vm.searchQuery).then(function (response) {
                vm.searchResults = response.data.Data;
            });
        };

       
    }]);
})();      