(function () {
  
    var appApplication = angular.module('appApplication');
    appApplication.factory('ApplicationService', [ function () {

        var applicationService = {};

        applicationService.displayModelStateErrors = function (modelState) {
            var alerts = [];

            for (var key in modelState) {
                for (var i = 0; i < modelState[key].length; i++) {
                    alerts.push({ type: 'danger', msg: modelState[key][i] });
                }
            }

            return alerts;
        };

        return applicationService;

    }]);

})();