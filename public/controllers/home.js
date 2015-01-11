// public/controllers/home.js

/**
 * Expose homepage controller and home route
 */
(function() {
    
    angular.module('home', [])

        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider    
                .when('/', {
                    templateUrl: '/views/home.html',
                    controller: 'HomePageController',
                })
                .otherwise({ 
                    redirectTo: '/' 
                });

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])

        /**
         * Show the homepage with some projects.
         */
        .controller('HomePageController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            $http.get('/api/projects/')
                .success (function (data) {
                    $scope.projects = data;
                })
                .error (function (data) {
                    console.log(data);
                });
        }]);

})();
