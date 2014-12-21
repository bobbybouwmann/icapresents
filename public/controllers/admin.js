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

        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    }])
    .controller('AdminPanelController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
       var tab =1;
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
            alert("cool");
        };

        $scope.setTab = function(setTab) {
            tab = setTab;
        };

        $scope.addProfile = function () {
            $http.post('/api/profiles', $scope.formDataProfile)
                .success (function (data) {
                    console.log(data); 
                    $scope.profiles = data;
                    $scope.formDataProfile = {};
                 })
                .error (function (data) {
                    console.log("error: " + data);
                });
                this.setTab(1);
        };
        
        $scope.removeProfile = function () {
            var box = document.getElementById('profileSelect');
            var selected = box.options[box.selectedIndex].value;
            $http.delete('/api/profiles/' + selected)
                .success (function (data) {
                    $scope.profiles = data;
                })
                .error (function (data){
                    console.log("error: " + data);
                });
        };

        $scope.getProfileData = function () {
            var box = document.getElementById('profileSelect');
            var id = box.options[box.selectedIndex].value;
            var profileNameField = document.getElementById('Profile');
            var profileDescriptionField = document.getElementById('profileDescription');
            $http.get('/api/profiles/' + id)
                .success (function (data) {
                    $scope.profile=data;
                    profileNameField.value = data.name;
                    profileDescriptionField.value = data.description;

            });
        };

        $scope.editProfile = function () {
            var box = document.getElementById('profileSelect');
            var id = box.options[box.selectedIndex].value;
            var profileNameField = document.getElementById('Profile');
            var profileDescriptionField = document.getElementById('profileDescription');

            $http.put('/api/profiles/' + id, $scope.profile)
                .success (function (data) {
                    $scope.profile = "";
                    $scope.profiles = data;
                })
                .error (function (data){
                    console.log("error: " + data);
            });
        };

        $scope.addSemester = function () {
            console.log($scope.formDataSemester);
            $http.post('/api/semesters', $scope.formDataSemester)
                .success (function (data) {
                    console.log(data); 
                    $scope.semesters = data;
                    $scope.formDataSemester = {};
                 })
                .error (function (data) {
                    console.log("error: " + data);
                });
        };

        $scope.getSemesterData = function () {
            var box = document.getElementById('semesterSelect');
            var id = box.options[box.selectedIndex].value;
            var SemesterName = document.getElementById('SemesterName');
            var SemesterDescription = document.getElementById('SemesterDescription');
            var SemesterProfile = document.getElementById('SemesterProfile');
            
            $http.get('/api/semesters/' + id)
                .success (function (data) {
                    $scope.semester = data;
                    SemesterName.value = data.name;
                    SemesterDescription.value = data.description;
                    SemesterProfile.value = data.profile;
                    console.log(data);
            })
            .error (function (data) {
                    console.log("error: " + data);
            });
        };

        $scope.editSemester = function () {
            var box = document.getElementById('semesterSelect');
            var id = box.options[box.selectedIndex].value;

            $http.put('/api/semesters/' + id, $scope.semester)
                .success (function (data) {
                    $scope.semester = "";
                    $scope.semesters = data;
                })
                .error (function (data){
                    console.log("error: " + data);
            });
        };
        
        $scope.removeSemester = function () {
            var box = document.getElementById('semesterSelect');
            var selected = box.options[box.selectedIndex].value;
            $http.delete('/api/semesters/' + selected)
                .success (function (data) {
                    $scope.semesters = data;
                })
                .error (function (data){
                    console.log("error: " + data);
                });
        };
        
        $scope.getProjectData = function () {
            var box = document.getElementById('projectSelect');
            var id = box.options[box.selectedIndex].value;
            var ProjectTitle = document.getElementById('ProjectTitle');
            var content = document.getElementById('content');
            var grade = document.getElementById('grade');
            
            $http.get('/api/projects/' + id)
                .success (function (data) {
                    $scope.project = data;
                    ProjectTitle.value = data.title;
                    content.value = data.content;
                    grade.value = data.grade;
                    console.log(data);
            })
        };
        
        $scope.removeProject = function () {
            var box = document.getElementById('projectSelect');
            var selected = box.options[box.selectedIndex].value;
            
            $http.delete('/api/projects/' + selected)
                .success (function (data) {
                    $scope.projects = data;
                })
                .error (function (data){
                    console.log("error: " + data);
                });
        };
        
        $scope.updateProject = function () {
            var box = document.getElementById('projectSelect');
            var id = box.options[box.selectedIndex].value;
            $http.put('/api/projects/' + id, $scope.project)
                .success (function (data) {
                    $scope.project = "";
                    $scope.project = data;
                })
                .error (function (data){
                    console.log("error: " + data);
            });
            
        };
    }]);
})();

