// public/controllers/login.js

/**
 * Expose login controllers and routes
 */
(function() {
    angular.module('login', [])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider    
                .when('/signup', {
                    templateUrl: '/views/signup.html',
                    controller: 'SignupController',
                    controllerAs: 'signup',
                    caseInsensitiveMatch: true
                })
                .when('/login', {
                    templateUrl: '/views/login.html',
                    controller: 'LoginController',
                    controllerAs: 'login',
                    caseInsensitiveMatch: true
                })
                .otherwise({
                    templateUrl: '/views/landing.html',
                    controller: 'IndexController',
                    controllerAs: 'index'
                });

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])
        .controller('LoginController', ['$http', '$scope', function($http, $scope) {
            // Custom Login functionality
        }])
        .controller('IndexController', ['$http', '$scope', function($http, $scope) {
            // Custom Index functionality
        }])
        .controller('SignupController', ['$http', '$scope', function($http, $scope) {
            // Custom Signup functionality
        }])
        .controller('LoginForm', ['$http', '$scope', '$rootScope', function($http, $scope, $rootScope) {
            $scope.login = function() {
                $http.post('/login', { 
                    email: this.email, 
                    password: this.password
                });

                $rootScope.loggedin = true;
            }
        }])
        .controller('SignupForm', ['$http', '$scope', function($http, $scope) {
            $http.get('/api/profiles')
                .success(function (data) {
                    $scope.profiles = data;
                });
        }])
})();
