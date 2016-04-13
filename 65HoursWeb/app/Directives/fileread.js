(function () {

    var appFileRead = angular.module('appFileRead', []);
     appFileRead.directive("fileread", [function () {
         return {
             scope: {
                 fileread: "="
             },
             link: function (scope, element, attributes) {
                 element.bind("change", function (changeEvent) {
                     var fileread = {};
                     fileread.name = changeEvent.target.files[0].name;
                     var reader = new FileReader();
                     reader.onload = function (loadEvent) {
                         scope.$apply(function () {
                             fileread.data = loadEvent.target.result;
                             scope.fileread = fileread;
                             
                         });
                     }
                     reader.readAsDataURL(changeEvent.target.files[0]);
                 });
             }
         }
     }]);  
})();