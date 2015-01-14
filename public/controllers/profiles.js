// public/controllers/profiles.js

/**
 * Expose profiles controllers and routes
 */
(function() {
    
    angular.module('profiles', [])
        
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            
            /**
             * Check if the current user is logged in. If so set the rootScope
             */
            var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
                var deferred = $q.defer();

                $http.get('/loggedin')
                    .success(function (user) {
                        if (user !== '0') {
                            $rootScope.user = user;
                            $rootScope.loggedin = true;
                            $timeout(deferred.resolve, 0);
                        }
                    });

                return deferred.promise;
            };

            $routeProvider    
                .when('/profiles', {
                    templateUrl: '/views/profiles.html',
                    controller: 'ProfilesController',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/profiles/:_id', {
                    templateUrl: '/views/semesters.html',
                    controller: 'SemesterController',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                });              

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])

        /**
         * Show all the profiles
         */
        .controller('ProfilesController', ['$http', '$scope', '$routeParams', '$location', function ($http, $scope, $routeParams, $location) {
            $http.get('/api/profiles')
                .success (function (data) {
                    $scope.profiles = data;
                })
                .error (function (data) {
                    console.log('error: ' + data);
                });
        }])

        /**
         * Show all the semesters that belong to the id of the clicked profile.
         */
        .controller('SemesterController', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
            var id = $routeParams._id;

            $http.get('/api/profiles/' + id)
                .success (function (data) {
                    $scope.profile = data;
                })
                .error (function (data) {
                    console.log('error: ' + data);
                });

            $http.get('/api/profilesemesters/' + id)
                .success (function (data) {
                    $scope.semesters = data;
                })
                .error (function (data) {
                    console.log('error: ' + data);
                });
        }]);
        
})();
