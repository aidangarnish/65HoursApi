(function () {

    var app = angular.module('angularApp', ['ui.bootstrap', 'appLogin', 'appRegister', 'appSession', 'appApplication', 'ngRoute', 'ngCookies', 'appProfile']);


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

    //interceptor to add API access token to $http requests
    angular.module("angularApp").factory('authInterceptor', [
      "$q", "$window", "$location", "SessionService", function ($q, $window, $location, SessionService) {
          return {
              request: function (config) {
                  if ($location.$$path !== '/login' && $location.$$path !== '/register'  && SessionService)
                  {
                      config.headers = config.headers || {};
                      config.headers.Authorization = 'Bearer ' + SessionService.accessToken;
                  }
                 
                  return config;
              },
              response: function (response) {
                  return response || $q.when(response);
              },
              responseError: function (rejection) {
                  // your error handler
              }
          };
      }
    ]);

    //wire up interceptor
    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }])

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
            controller: 'LoginController',
            access: {
                requiresLogin: false
            }
        })
        .when('/register', {
            templateUrl: 'app/Register/register.html',
            controller: 'RegisterController',
            access: {
                requiresLogin: false
            }
        })
        .when('/profile', {
            templateUrl: 'app/Profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'vm',
            access: {
                requiresLogin: true
            }
        })
        .when('/profiletest', {
            templateUrl: 'app/ProfileTest/profiletest.html',
            controller: 'ProfileTestController',
            controllerAs: 'vm',
            access: {
                requiresLogin: true
            }
        })
        .when('/home', {
            templateUrl: 'app/Home/home.html',
            access: {
                requiresLogin: false
            }
        })
        .otherwise({
            redirectTo: '/home'
        });

        //$locationProvider.html5Mode(true);
    });
    
})();