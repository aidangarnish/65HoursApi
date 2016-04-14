(function () {

    var appProfile = angular.module('appProfile', []);
    appProfile.controller('ProfileController', ['$scope', '$filter', 'ProfileService', 'config', '$http', 'SessionService', '$uibModal', 'FileStorageService', 'azureBlob',
        function ($scope, $filter, ProfileService, config, $http, SessionService, $uibModal, FileStorageService, azureBlob) {

            var vm = this;
            vm.uploadConfig = {};
            $scope.applicationCtrl.alerts = [];
        
        ProfileService.getUser().then(function (response) {
            vm.user = response.data;
        });

        ProfileService.getProfileImageSasUrl().then(function (response) {
            vm.user.ProfilePicSasUri = response.data;
            vm.showProfilePic = (response.data != null && response.data != '') ? true : false;
        });

        ProfileService.getUserSkills().then(function (response) {
            vm.userSkills = response.data.Data;
        });

        ProfileService.getUserRequests().then(function (response) {
            vm.userRequests = response.data.Data;
        });

        vm.UploadProfilePic = function () {

            if (!vm.fileToUpload)
            {
                //setup warning and return
                $scope.applicationCtrl.alerts.push({ type: 'danger', msg: 'Please select a file' });
                return;
            }
            var extension = vm.fileToUpload.name.split('.').pop();

            FileStorageService.getFileUploadParams(extension).then(function (response) {
   
                vm.profilePicUploadParams = response;

                   vm.uploadConfig =
                   {
                       baseUrl: response.data.BlobURL,
                       sasToken: response.data.BlobSASToken,
                       file: vm.fileToUpload,
                       blockSize: 1024 * 32,

                       progress: function (amount) {
                           console.log("Progress - " + amount);
                           console.log(amount);
                           vm.FileUploadProgress = amount;
                       },
                       complete: function () {
                           console.log("Completed!");
                           var user = vm.user;
                           user.ProfilePic = vm.profilePicUploadParams.data.ServerFileName;

                           //call service to update user with profile image filename
                           ProfileService.save(user).then(function () {
                               //call service to get profile image sas url
                               ProfileService.getProfileImageSasUrl().then(function (response) {
                                   vm.user.ProfilePicSasUri = response.data;
                                   vm.showProfilePic = (response.data != null && response.data != '') ? true : false;
                               });
                           });                       
                       },
                       error: function (data, status, err, config) {
                           console.log("Error - " + data);
                       }
                   };

                   azureBlob.upload(vm.uploadConfig);

            });
        };

        vm.deleteUserSkill = function (userSkillId) {
            ProfileService.deleteUserSkill(userSkillId).then(function (response) {
                vm.userSkills = $filter('filter')(vm.userSkills, { Id: '!' + userSkillId });
            });
        };

        vm.deleteUserRequest = function (userRequestId) {
            ProfileService.deleteUserRequest(userRequestId).then(function (response) {   
                vm.userRequests = $filter('filter')(vm.userRequests, { Id: '!' + userRequestId });
            });
        };

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

            modalInstanceAddSkill.result.then(function (userSkill) {
                vm.userSkills.push(userSkill);
            });
        };

        vm.openRequest = function (userRequest) {
            var modalInstanceAddRequest = $uibModal.open({
                animation: true,
                templateUrl: 'requestModal.html',
                controller: 'ModalRequestCtrl',
                controllerAs: 'vmRequestModal',
                resolve: { userRequest: function () { return userRequest; } }
            });

            modalInstanceAddRequest.result.then(function (userRequest) {
                var request = $filter('filter')(vm.userRequests, { Id: userRequest.Id });
                if (!request || request.length <= 0) {
                    vm.userRequests.push(userRequest);
                }
            });
        };

    }]);

    angular.module('appProfile').controller('ModalProfileEditCtrl', ['ProfileService', '$uibModalInstance', 'SessionService', 'userResponse',
        function (ProfileService, $uibModalInstance, SessionService, userResponse) {

            this.user = userResponse.data;

            this.ok = function () {
                var file = this.fileToUpload;
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
                ProfileService.saveUserSkill(vmSkillModal.userSkill).then(function (response) {
                    console.log(response);
                    $uibModalInstance.close(response.data.Data);
                }, function (error) {
                    console.log(error);
                    $uibModalInstance.close();
                });;
                
            };

            vmSkillModal.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);


    angular.module('appProfile').controller('ModalRequestCtrl', ['ProfileService', '$uibModalInstance', 'userRequest',
       function (ProfileService, $uibModalInstance, userRequest) {

           var vmRequestModal = this;

           if (userRequest === 0)
           {
               vmRequestModal.title = "Add Request";
           }
           else
           {
               vmRequestModal.title = "Edit Request";
               vmRequestModal.userRequest = userRequest;
           }
           vmRequestModal.ok = function () {
               ProfileService.saveUserRequest(vmRequestModal.userRequest).then(function (response) {
                   console.log(response);
                   $uibModalInstance.close(response.data.Data);
               }, function (error) {
                   console.log(error);
                   $uibModalInstance.close();
               });;

           };

           vmRequestModal.cancel = function () {
               $uibModalInstance.dismiss('cancel');
           };
       }]);

})();


