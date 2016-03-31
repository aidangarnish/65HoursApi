(function () {

    var app = angular.module('angularApp', ['appLogin', 'appRegister', 'appSession', 'appApplication', 'ngRoute']);

    

    //set up config constants
    app.constant('config', {
        hoursApiUrl: 'https://localhost:44300'
    });

    //placed first declaration of the module here to create it
    //other files that are part of this module are declared using
    //var appLogin = angular.module('appLogin'); - i.e. without the array param
    //var appLogin = angular.module('appLogin'); - assumes the module has already been created
    //is this the correct approach???
   // var appLogin = angular.module('appLogin', []);

    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/login', {
            templateUrl: 'app/Login/login.html',
            controller: 'LoginController'
        })
        .when('/register', {
            templateUrl: 'app/Register/register.html',
            controller: 'RegisterController'
        })
        .when('/profile', {
            templateUrl: 'app/Profile/profile.html',
            controller: 'ProfileController',
            access: {
                requiresLogin: true
            }
        })
        .when('/home', {
            templateUrl: 'app/Home/home.html'
        })
        .otherwise({
            redirectTo: '/home'
        });

        //$locationProvider.html5Mode(true);
    });

    
    
})();