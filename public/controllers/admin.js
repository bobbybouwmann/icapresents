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

        $locationProvider.html5Mode(true);
    }])
    .controller('AdminPanelController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
       $http.get('/api/profiles')
            .success (function (data) {
                $scope.profiles = data;
            });

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

            // $http.get('/api/profiles/' + id) 
            //     .success (function (data) {
            //         $scope.profile=data;
            //         console.log(data);
            //     })
            //     .error (function (data){
            //         console.log("error: " + data);
            //     });

            console.log($scope.profile);

            $http.put('/api/profiles/' + id, $scope.profile)
                .success (function (data) {
                    $scope.profile = "";
                    $scope.profiles = data;
                })
                .error (function (data){
                    console.log("error: " + data);
            });
        };
    }]);
})();

