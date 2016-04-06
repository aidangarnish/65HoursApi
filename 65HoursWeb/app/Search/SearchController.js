(function () {

    var appSearch = angular.module('appSearch', []);
    appSearch.controller('SearchController', ['SearchService', function (SearchService) {

        var vm = this;

        vm.search()
        {
            SearchService.search(vm.searchQuery).then(function (response) {
                vm.searchResults = response.data;
            });
        }
    }]);
})();      