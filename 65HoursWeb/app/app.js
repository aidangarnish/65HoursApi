(function () {

    var app = angular.module('angularApp', ['appLogin', 'appRegister', 'appSession', 'appApplication', 'ngRoute', 'ngCookies']);

    angular.module('angularApp').run(function ($rootScope, $location, SessionService) {

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            // if route requires auth and user is not logged in capture the current path and direct to login
            if (next.$$route.access.requiresLogin && !SessionService.isAuthenticated()) {                
                SessionService.postLogInRoute = $location.path();
                // redirect back to login
                $location.path('/login');
            }
        });
    });


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