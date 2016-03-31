(function () {

    var appSession = angular.module('appSession', []);

    appSession.service('SessionService', ['$cookies', function ($cookies) {
        this.create = function (userId, authToken) {
            this.userId = userId;
            this.authToken = authToken;
        };
        this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
        };
        this.isAuthenticated = function () {

            if (!!this.authToken) {
                return true;
            }
            else if (!!$cookies.get("accessToken")) {
                this.authToken = $cookies.get("accessToken");
                this.userName = $cookies.get("username");
                return true;
            }
            else {
                return false;
            }
        };
    }]);

})();