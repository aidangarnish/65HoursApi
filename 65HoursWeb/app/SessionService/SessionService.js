(function () {

    var appSession = angular.module('appSession', []);

    appSession.service('SessionService', ['$cookies', function ($cookies) {
        this.postLogInRoute;
        this.create = function (userName, accessToken) {
            this.userName = userName;
            this.accessToken = accessToken;    
        };
        this.destroy = function () {
            this.id = null;
            this.userName = null;
            this.userRole = null;
        };
        this.isAuthenticated = function () {

            if (!!this.accessToken) {
                return true;
            }
            else if (!!$cookies.get("accessToken")) {
                this.accessToken = $cookies.get("accessToken");
                this.userName = $cookies.get("username");
                return true;
            }
            else {
                return false;
            }
        };
    }]);

})();