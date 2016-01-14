(function () {

    var appSession = angular.module('appSession', []);

    appSession.service('SessionService', function () {
        this.create = function (userId, authToken) {
            this.userId = userId;
            this.authToken = authToken;
        };
        this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
        };
    });

})();