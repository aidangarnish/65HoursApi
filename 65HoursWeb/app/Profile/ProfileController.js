(function () {

    var appProfile = angular.module('appProfile', []);
    appProfile.controller('ProfileController', ['$scope', '$filter', 'ProfileService', 'config', '$http', 'SessionService', '$uibModal', 'FileStorageService', 'azureBlob',
        function ($scope, $filter, ProfileService, config, $http, SessionService, $uibModal, FileStorageService, azureBlob) {

            var vm = this;
            vm.config = {};
        
        ProfileService.getUser().then(function (response) {
            vm.user = response.data;
        });

        ProfileService.getUserSkills().then(function (response) {
            vm.userSkills = response.data.Data;
        });

        ProfileService.getUserRequests().then(function (response) {
            vm.userRequests = response.data.Data;
        });

        vm.UploadFile = function () {
            var fileToUpload = vm.uploadme;
            var extension = fileToUpload.name.split('.').pop();

            FileStorageService.getFileUploadParams(extension).then(function (response) {

           vm.config =
           {
               baseUrl: response.data.BlobURL,
               sasToken: response.data.BlobSASToken,
               file: fileToUpload.data,
               blockSize: 1024 * 32,

               progress: function (amount) {
                   console.log("Progress - " + amount);
                   console.log(amount);
               },
               complete: function () {
                   console.log("Completed!");
                   //uploadSvc.postItem(
                   //    {
                   //        'ID': results.ID,
                   //        'ServerFileName': results.ServerFileName,
                   //        'StorageAccountName': results.StorageAccountName,
                   //        'BlobURL': results.BlobURL
                   //    }).success(function () {
                   //        $scope.uploadComplete = true;
                   //    }).error(function (err) {
                   //        console.log("Error - " + err);
                   //        $scope.error = err;
                   //        $scope.uploadComplete = false;
                   //    });
               },
               error: function (data, status, err, config) {
                   console.log("Error - " + data);
               }
           };
                azureBlob.upload(vm.config);


                //var config = {};
                //config.baseUrl = response.data.BlobURL;
                //config.sasToken = response.data.BlobSASToken;
                //config.file = file.data;
                //blockSize = 1024 * 32;

                //azureBlob.upload(config).complete(function (response) {
                //    var response = response;
                //}, function (error) {
                //    console.log(error);
                //});
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


