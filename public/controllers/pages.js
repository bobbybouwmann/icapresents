// public/controllers/pages.js

/**
 * Expose routes for simple pages
 */
(function() {
    
    angular.module('pages', [])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider    
                .when('/about', {
                    templateUrl: '/views/about.html',
                    controller: 'AboutController'
                });

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])

        /**
         * Controller for the About page (empty at this time)
         */
        .controller('AboutController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            // No extra functions yet
        }]);
        
})();
