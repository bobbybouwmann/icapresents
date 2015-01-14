// public/controllers/home.js

/**
 * Expose homepage controller and home route
 */
(function() {
    
    angular.module('home', [])

        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            
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
                        } 
                        
                        $timeout(deferred.resolve, 0);
                    });

                return deferred.promise;
            };

            $routeProvider    
                .when('/', {
                    templateUrl: '/views/home.html',
                    controller: 'HomePageController',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .otherwise({ 
                    redirectTo: '/' 
                });

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])

        /**
         * Show the homepage with some projects.
         */
        .controller('HomePageController', ['$http', '$scope', '$location', 'anchorSmoothScroll', function($http, $scope, $location, anchorSmoothScroll) {
            $scope.gotoElement = function (id) {
                $location.hash(id);
                anchorSmoothScroll.scrollTo(id);
            }

            $http.get('/api/projects/')
                .success (function (data) {
                    $scope.projects = data;
                })
                .error (function (data) {
                    console.log(data);
                });
        }]);

})();
