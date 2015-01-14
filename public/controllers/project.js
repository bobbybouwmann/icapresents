// public/controllers/project.js

/**
 * Expose project controllers and routes
 */
(function() {
    
    angular.module('project', [])
        
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
                
            /**
             * Check if the current user is logged in.
             */
            var checkLoggedinRedirect = function ($q, $timeout, $http, $location, $rootScope) {
                var deferred = $q.defer();

                $http.get('/loggedin')
                    .success(function (user) {
                        if (user !== '0') {
                            $rootScope.user = user;
                            $rootScope.loggedin = true;
                            $timeout(deferred.resolve, 0);
                        } else {
                            $timeout(function () {
                                deferred.reject();
                            }, 0);
                            $location.path('/login');
                        };
                    });

                return deferred.promise;
            };

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
                .when('/addproject', {
                    templateUrl: '/views/addproject.html',
                    controller: 'ProjectAddController',
                    resolve: {
                        loggedin: checkLoggedinRedirect
                    }
                })
                .when('/projects', {
                    templateUrl: '/views/projects.html',
                    controller: 'ProjectsViewController',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/editproject/:_id', {
                    templateUrl: '/views/editproject.html',
                    controller: 'ProjectEditController',
                    resolve: {
                        loggedin: checkLoggedinRedirect
                    }
                })
                .when('/project/:_id', {
                    templateUrl: '/views/project.html',
                    controller: 'ProjectViewController',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                });
                
            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])

        /**
         * Set some defaults and get the semesters for creating a new project.
         */
        .controller('ProjectAddController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            $scope.formData = { 
                title: '',
                semesterid: '',
                banner: '',
                logo: '',
                content: ''
            };

            $http.get('/api/semesters')
                .success (function (data) {
                    $scope.semesters = data;
                });
        }])

        /**
         * Show all the projects.
         */
        .controller('ProjectsViewController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            $http.get('/api/projects')
                .success (function (data) {
                    $scope.projects = data;
                })
                .error (function (data){
                    console.log("error: " + data);
                });
                
            $http.get('/api/semesters')
                .success (function (data) {
                    $scope.semesters = data;
                })
                .error (function (data){
                    console.log("error: " + data);
                });
        }])

        /**
         * Show a single project based on the provided id.
         */
        .controller('ProjectViewController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            var id = $routeParams._id;

            $http.get ('/api/projects/' + id)
                .success (function (data) {
                    $scope.project = data.project;
                })
                .error (function (data){
                    console.log("error: " + data);
                }); 
        }])

        /**
         * Edit a project by getting the correct data based on the provided id.
         */
        .controller('ProjectEditController', ['$http', '$scope', '$routeParams', '$location', function($http, $scope, $routeParams, $location) {
            var id = $routeParams._id;

            $http.get('/api/semesters')
                .success (function (data) {
                    $scope.semesters = data;
                });

            $http.get('/api/projects/' + id) 
                .success (function (data) {
                    $scope.project = data.project;
                });
        }]);

})();
