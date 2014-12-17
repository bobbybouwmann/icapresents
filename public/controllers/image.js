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
                .when('/upload', {
                    templateUrl: '/views/images.html',
                    controller: 'ImageController'
                });

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])
        .controller('ImageController', ['$http', '$scope', function ($scope, $http) {
            console.log($scope);
        }]);

})();
