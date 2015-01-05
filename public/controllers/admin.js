// public/controllers/admin.js

/**
 * Expose admin controllers and routes
 */
(function() {

    angular.module('admin', [])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/admin', {
                    templateUrl: '/views/adminpanel.html',
                    controller: 'AdminPanelController'
                })
                .when('/admin/editproject/:_id', {
                    templateUrl: '/views/editproject.html',
                    controller: 'AdminPanelEditProjectController'
                });

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])
        .controller('AdminPanelEditProjectController', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
            var id = $routeParams._id;

            $http.get('/api/projects/' + id) 
                .success (function (data) {
                    $scope.project = data.project;
                });
        }])
        .controller('AdminPanelController', ['$http', '$scope', '$routeParams', '$filter', '$location', function ($http, $scope, $routeParams, $filter, $location) {
            var orderBy = $filter('orderBy');
            var tab = 1;

            $scope.showEditProfile = false;
            $scope.showEditSemester = false;

            $http.get('/api/profiles')
                .success (function (data) {
                    $scope.profiles = data;
                });

            $http.get('/api/semesters')
                .success (function (data) {
                    $scope.semesters = data;
                });  

            $http.get('/api/projects')
                .success (function (data) {
                    $scope.projects = data;
                });  

            $scope.isSet = function(checkTab) {
                return tab === checkTab;
            };

            $scope.setTab = function(setTab) {
                tab = setTab;
            };

            $scope.orderProfiles = function (predicate, reverse) {
                $scope.profiles = orderBy($scope.profiles, predicate, reverse);
            };

            $scope.orderSemesters = function (predicate, reverse) {
                $scope.semesters = orderBy($scope.semesters, predicate, reverse);  
            };

            $scope.orderProfiles('name', false);
            $scope.orderSemesters('name', false);

            $scope.addProfile = function () {
                $http.post('/api/profiles', $scope.formDataProfile)
                    .success (function (data) {
                        $scope.profiles = data;
                        $scope.formDataProfile = {};
                    })
                    .error (function (data) {
                        console.log("error: " + data);
                    });
            };
            
            $scope.removeProfile = function (id) {
                $http.delete('/api/profiles/' + id)
                    .success (function (data) {
                        $scope.profiles = data;
                        $scope.showEditProfile = false;
                    })
                    .error (function (data){
                        console.log("error: " + data);
                    });
            };

            $scope.getProfileData = function (id) {
                $scope.showEditProfile = true;

                $http.get('/api/profiles/' + id)
                    .success (function (data) {
                        $scope.profile = data;
                    });
            };

            $scope.editProfile = function () {
                $http.put('/api/profiles/' + $scope.profile._id, $scope.profile)
                    .success (function (data) {
                        $scope.profile = "";
                        $scope.profiles = data;
                        $scope.showEditProfile = false;
                    })
                    .error (function (data){
                        console.log("error: " + data);
                    });
            };

            $scope.addSemester = function () {            
                $http.post('/api/semesters', $scope.formDataSemester)
                    .success (function (data) {
                        $scope.semesters = data;
                        $scope.formDataSemester = {};
                    })
                    .error (function (data) {
                        console.log("error: " + data);
                    });
            };

            $scope.removeSemester = function (id) {
                $http.delete('/api/semesters/' + id)
                    .success (function (data) {
                        $scope.semesters = data;
                    })
                    .error (function (data){
                        console.log("error: " + data);
                    });
            };

            $scope.getSemesterData = function (id) {
                $scope.showEditSemester = true;
                
                $http.get('/api/semesters/' + id)
                    .success (function (data) {
                        $scope.semester = data;
                    })
                    .error (function (data) {
                        console.log("error: " + data);
                    });
            };

            $scope.editSemester = function () {
                $http.put('/api/semesters/' + $scope.semester._id, $scope.semester)
                    .success (function (data) {
                        $scope.semester = "";
                        $scope.semesters = data;
                        $scope.showEditSemester = false;
                    })
                    .error (function (data){
                        console.log("error: " + data);
                    });
            };

            $scope.removeProject = function (id) {
                $http.delete('/api/projects/' + id)
                    .success (function (data) {
                        $scope.projects = data;
                    })
                    .error (function (data){
                        console.log("error: " + data);
                    });
            };

            $scope.getProjectData = function (id) {
                $location.path('/admin/editproject/' + id);
            };

            $scope.editProject = function () {
                $http.put('/api/semesters/' + $scope.project._id, $scope.project)
                    .success (function (data) {
                        $scope.project = "";
                        $scope.showEditProject = false;
                    })
                    .error (function (data){
                        console.log("error: " + data);
                    });
            };

            
        }]);

})();
