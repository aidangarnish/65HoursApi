(function () {

    var app = angular.module('angularApp', ['appLogin', 'appRegister', 'appSession', 'appApplication']);

    //placed first declaration of the module here to create it
    //other files that are part of this module are declared using
    //var appLogin = angular.module('appLogin'); - i.e. without the array param
    //var appLogin = angular.module('appLogin'); - assumes the module has already been created
    //is this the correct approach???
    var appLogin = angular.module('appLogin', []);

})();