// public/controllers/project.js

/**
 * Expose project controllers and routes
 */
(function() {
    angular.module('project', [])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/addproject', {
                templateUrl: '/views/addproject.html',
                controller: 'AddProjectController'
            })
            .when('/projects', {
                templateUrl: '/views/projects.html',
                controller: 'ViewProjectsController'
            })
            .when('/editproject/:_id', {
                templateUrl: '/views/editproject.html',
                controller: 'EditProjectController'
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
                console.log(data);
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
                $scope.project = data;
            })
            .error (function (data){
                console.log("error: " + data);
            });
    }]);
})();
