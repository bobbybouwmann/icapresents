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
                        controller: 'AddProjectController',
                    })
            .when('/projects', {
                templateUrl: '/views/projects.html',
                controller: 'ViewProjectsController',
            })

    }])
    .controller('AddProjectController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
        $scope.addProject = function () {
            $http.post('/api/projects', $scope.formData)
             .success (function (data) {
                console.log(data); 
             })
             .error (function (data) {
                console.log("error: " + data);
             });
        };

    }])
    .controller('ViewProjectsController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
        $http.get('/api/projects')
        .success (function (data) {
            $scope.projects=data;
        })
        .error (function (data){
            console.log("error: " + data);
        });
    }]);
})();

