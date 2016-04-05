(function () {

    var appProfile = angular.module('appProfile', []);
    appProfile.controller('ProfileController', ['$scope', 'ProfileService', 'config', '$http', 'SessionService', '$uibModal', function ($scope, ProfileService, config, $http, SessionService, $uibModal) {

        var vm = this;
        
        ProfileService.getUser().then(function (response) {
            vm.user = response.data;
        });

        vm.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'profileEdit.html',
                controller: 'ModalProfileEditCtrl',
                controllerAs: 'vmModal',
                size: size,
                resolve: { userResponse: ProfileService.getUser() }
            });
        };

    }]);

    angular.module('appProfile').controller('ModalProfileEditCtrl', ['ProfileService', '$uibModalInstance', 'SessionService', 'userResponse',
        function (ProfileService, $uibModalInstance, SessionService, userResponse) {

            this.user = userResponse.data;

        this.ok = function () {
            ProfileService.save(this.user);
            $uibModalInstance.close();
        };

        this.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

})();


