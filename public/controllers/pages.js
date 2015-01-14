// public/controllers/pages.js

/**
 * Expose routes for simple pages
 */
(function() {
    
    angular.module('pages', [])
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
                            $timeout(deferred.resolve, 0);
                        }
                    });

                return deferred.promise;
            };

            $routeProvider    
                .when('/about', {
                    templateUrl: '/views/about.html',
                    controller: 'AboutController',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                });

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])

        /**
         * Controller for the About page (empty at this time)
         */
        .controller('AboutController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            // No extra functions yet
        }]);
        
})();
