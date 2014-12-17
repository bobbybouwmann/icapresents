(function() {
    
    angular.module('pages', [])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider    
                .when('/about', {
                    templateUrl: '/views/about.html',
                    controller: 'AboutController',
                    controllerAs: 'about'
                })

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])
        .controller('AboutController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            //Custom Profile functionality
        }]);
})();
