// public/controllers/profiles.js

/**
 * Expose profiles controllers and routes
 */
(function() {
    
    angular.module('profiles', [])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider    
                .when('/profiles', {
                    templateUrl: '/views/profiles.html',
                    controller: 'ProfilesController'
                })
                .when('/profiles/:_id', {
                    templateUrl: '/views/semesters.html',
                    controller: 'SemesterController'
                });              

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])
        .controller('ProfilesController', ['$http', '$scope', '$routeParams', '$location', function ($http, $scope, $routeParams, $location) {
            $http.get('/api/profiles')
                .success (function (data) {
                    $scope.profiles = data;
                })
                .error (function (data) {
                    console.log('error: ' + data);
                });
        }])
        .controller('SemesterController', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
            var id = $routeParams._id;

            $http.get('/api/profilesemesters/' + id)
                .success (function (data) {
                    $scope.semesters = data;
                })
                .error (function (data) {
                    console.log('error: ' + data);
                });

        }]);
})();
