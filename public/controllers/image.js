// public/controllers/image.js

/**
 * Expose image controller and routes
 */
(function () {

    angular.module('imageuploadfile', [])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider    
                .when('/images', {
                    templateUrl: '/views/images.html',
                    controller: 'ImageController'
                })
                .when('/images/uploads/:_id', {
                    controller: 'ViewImageController'
                });

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])
        .controller('ImageController', ['$http', '$scope', function ($scope, $http) {
            
        }])
        .controller('ViewImageController', ['$http', '$scope', function ($scope, $http) {
            alert('Get Image');
        }]);

})();
