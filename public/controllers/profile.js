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
                .when('/profile/:_id', {
                    templateUrl: '/views/profile.html',
                    controller: 'ProfileIdController'
                })
                .when('/editprofile', {
                    templateUrl: '/views/editprofile.html',
                    controller: 'EditProfileController',
                    controllerAs: 'editprofile'
                });

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])
        .controller('ProfileController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            $http.get('/api/userData')
                .success (function (data) {
                    $scope.user = data.user;
                    $scope.projects = data.projects;

                    console.log($scope.user);

                    $http.get('/api/profiles/' + data.user.profileid)
                        .success (function (data) {
                            $scope.profile = data;
                        });
                })
                .error (function (data) {
                    console.log("error:" + data);
                });
        }])
        .controller('ProfileIdController', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
            var id = $routeParams._id;

            $http.get('/api/users/' + id)
                .success (function (data) {
                    $scope.user = data.user;
                    $scope.projects = data.projects;
                })
                .error (function (data) {
                    console.log("error:" + data);
                });
        }])
        .controller('EditProfileController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            //Custom Profile functionality

            $http.get('/api/userData')
                .success(function(data) {
                    console.log(data);
                    $scope.user = data; //Expose the user data to your angular scope
                });
            $http.get('/api/profiles')
                .success (function (data) {
                    $scope.profiles = data;
                });
            $http.get('/api/semesters')
                .success (function (data) {
                    $scope.semesters = data;
                });
        }]);
})();
