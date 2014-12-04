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
                 })
                .error (function (data) {
                    console.log("error: " + data);
                });
        };
        
        $scope.removeProfile = function () {
            var box = document.getElementById('profileSelect');
            var selected = box.options[box.selectedIndex].value;
            alert(selected);
            $http.delete('/api/profiles/' + selected)
                .success (function (data) {
                    $location.path('/profiles');
                })
                .error (function (data){
                    console.log("error: " + data);
                });
        };
    }]);
})();

