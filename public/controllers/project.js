// public/controllers/project.js

/**
 * Expose project controllers and routes
 */
(function() {
    angular.module('project', [])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            
        var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();

            $http.get('/loggedin')
                .success(function (user) {
                    if (user !== '0') {
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

        $routeProvider
            .when('/addproject', {
                templateUrl: '/views/addproject.html',
                controller: 'AddProjectController',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/projects', {
                templateUrl: '/views/projects.html',
                controller: 'ViewProjectsController'
            })
            .when('/editproject/:_id', {
                templateUrl: '/views/editproject.html',
                controller: 'EditProjectController',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/project/:_id', {
                templateUrl: '/views/project.html',
                controller: 'ViewProjectController'
            });
            
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    }])
    .controller('AddProjectController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
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
    .controller('ViewProjectsController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
        $http.get('/api/projects')
            .success (function (data) {
                $scope.projects = data;
            })
            .error (function (data){
                console.log("error: " + data);
            });
        $http.get('/api/semesters')
            .success (function (data) {
                console.log(data);
                $scope.semesters = data;
            })
            .error (function (data){
                console.log("error: " + data);
            });
    }])
    .controller('ViewProjectController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
        var id = $routeParams._id;

        $http.get ('/api/projects/' + id)
            .success (function (data) {
                $scope.project = data.project;
                $scope.content = data.project.content;
            })
            .error (function (data){
                console.log("error: " + data);
            }); 
    }])
    .controller('EditProjectController', ['$http', '$scope', '$routeParams', '$location', function($http, $scope, $routeParams, $location) {
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
