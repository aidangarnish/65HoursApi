(function () {

    var appProfile = angular.module('appProfile', []);
    appProfile.controller('ProfileController', ['$scope', 'ProfileService', 'config', '$http', 'SessionService', '$uibModal', function ($scope, ProfileService, config, $http, SessionService, $uibModal) {

        var vm = this;
        
        ProfileService.getUser().then(function (response) {
            vm.user = response.data;
        });

        vm.openEditProfile = function () {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'profileEdit.html',
                controller: 'ModalProfileEditCtrl',
                controllerAs: 'vmModal',
                resolve: { userResponse: ProfileService.getUser() }
            });

            modalInstance.result.then(function (user) {
                 vm.user = user;
            });

        };

        vm.openAddSkill = function () {
            var modalInstanceAddSkill = $uibModal.open({
                animation: true,
                templateUrl: 'addSkill.html',
                controller: 'ModalAddSkillCtrl',
                controllerAs: 'vmSkillModal'
            });

            modalInstanceAddSkill.result.then(function (skill) {
                //update list with new skill
            });
        };

    }]);

    angular.module('appProfile').controller('ModalProfileEditCtrl', ['ProfileService', '$uibModalInstance', 'SessionService', 'userResponse',
        function (ProfileService, $uibModalInstance, SessionService, userResponse) {

            this.user = userResponse.data;

        this.ok = function () {
            ProfileService.save(this.user);
            $uibModalInstance.close(this.user);
        };

        this.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);


    angular.module('appProfile').controller('ModalAddSkillCtrl', ['ProfileService', '$uibModalInstance', 
        function (ProfileService, $uibModalInstance) {

            var vmSkillModal = this;
            vmSkillModal.ok = function () {
               // ProfileService.saveSkill(this.skill);
                $uibModalInstance.close(this.skill);
            };

            vmSkillModal.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);

})();


