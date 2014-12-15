// public/controllers/profile.js

/**
 * Expose profile controllers and routes
 */
(function() {
    
    angular.module('profile', [])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider    
                .when('/profile', {
                    templateUrl: '/views/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'profile'
                })
                .when('/editprofile', {
                    templateUrl: '/views/editprofile.html',
                    controller: 'EditProfileController',
                    controllerAs: 'editprofile'
                });

            $locationProvider.html5Mode(true);
        }])
        .controller('ProfileController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            //Custom Profile functionality
            $http.get('/api/userData')
                .success(function(data) {
                    $scope.user = data; //Expose the user data to your angular scope
                });
        }])

        .controller('EditProfileController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            //Custom Profile functionality
            $http.get('/api/userData')
                .success(function(data) {
                    $scope.user = data; //Expose the user data to your angular scope
                });
            $http.get('/api/profiles')
                .success (function (data) {
                    console.log(data);
                    $scope.profiles = data;
                });
            $http.get('/api/semesters')
                .success (function (data) {
                    $scope.semesters = data;
                }); 
        }]);
})();
