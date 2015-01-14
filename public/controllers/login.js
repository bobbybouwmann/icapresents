// public/controllers/login.js

/**
 * Expose login controllers and routes
 */
(function() {

    angular.module('login', [])
        
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

            /**
             * Check if the current user is logged in. If so set the rootScope
             */
            var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
                var deferred = $q.defer();

                $http.get('/loggedin')
                    .success(function (user) {
                        if (user !== '0') {
                            $timeout(function () {
                                deferred.reject();
                            }, 0);
                            $location.path('/login');
                        }
                    });

                return deferred.promise;
            };

            $routeProvider    
                .when('/signup', {
                    templateUrl: '/views/signup.html',
                    caseInsensitiveMatch: true,
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/login', {
                    templateUrl: '/views/login.html',
                    caseInsensitiveMatch: true,
                    resolve: {
                        loggedin: checkLoggedin
                    }
                });

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])

        /**
         * Provide a function so the user can post the form to log themself in.
         */
        .controller('LoginForm', ['$http', '$scope', '$rootScope', function($http, $scope, $rootScope) {
            $scope.login = function() {
                $http.post('/login', { 
                    email: this.email, 
                    password: this.password
                });

                $rootScope.loggedin = true;
            }
        }])

        /**
         * Provide a list of Profiles for the user to choose from when registering.
         */
        .controller('SignupForm', ['$http', '$scope', function($http, $scope) {
            $http.get('/api/profiles')
                .success(function (data) {
                    $scope.profiles = data;
                });
        }])
})();
