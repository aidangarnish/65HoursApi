(function () {

    var appProfile = angular.module('appProfile', []);
    appProfile.controller('ProfileController', ['ProfileService', 'config', '$http', 'SessionService', '$uibModal', function (ProfileService, config, $http, SessionService, $uibModal) {

        this.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'profileEdit.html',
                controller: 'ModalProfileEditCtrl',
                controllerAs: 'vmModal',
                size: size,
                resolve: { appuser: ProfileService.getUser() }
            });
        };

    }]);

    angular.module('appProfile').controller('ModalProfileEditCtrl', ['ProfileService', '$uibModalInstance', 'SessionService', 'appuser', function (ProfileService, $uibModalInstance, SessionService, appuser) {

        this.user = appuser;

        this.ok = function () {
            ProfileService.save(this.user);
            $uibModalInstance.close();
        };

        this.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

})();


