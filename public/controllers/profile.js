// public/controllers/profile.js

/**
 * Expose profile controllers and routes
 */
(function() {
    
    angular.module('profile', [])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider    
                .when('/profile', {
                    templateUrl: '/views/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'profile'
                })
                .when('/editprofile', {
                    templateUrl: '/views/editprofile.html',
                    controller: 'ProfileEditController',
                    controllerAs: 'editprofile'
                });                

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])
        .controller('ProfileController', ['$http', '$scope', '$routeParams', '$location', function($http, $scope, $routeParams, $location) {
            $http.get('/api/userData')
                .success (function (data) {
                    $scope.user = data.user;
                    $scope.projects = data.projects;

                    $http.get('/api/profiles/' + data.user.profileid)
                        .success (function (data) {
                            $scope.profile = data;
                        });
                })
                .error (function (data) {
                    console.log("error:" + data);
                });
        }])
        .controller('ProfileEditController', ['$http', '$scope', '$routeParams', '$location', '$route', function($http, $scope, $routeParams, $location, $route) {
            $http.get('/api/userData')
                .success(function(data) {
                    $scope.user = data.user;
                    $scope.projects = data.projects;

                    $http.get('/api/profiles/' + data.user.profileid)
                        .success (function (data) {
                            $scope.profile = data;
                        });
                });

            $http.get('/api/profiles')
                .success (function (data) {
                    $scope.profiles = data;
                });

            $scope.removeProject = function (id) {
                $http.delete('/api/projects/' + id)
                    .success (function (data) {
                        $route.reload();
                    })
                    .error (function (data){
                        console.log("error: " + data);
                    });
            };

            $scope.editProject = function (id) {
                $location.path('/editproject/' + id);
            }; 
        }]);
})();
