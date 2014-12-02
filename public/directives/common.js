(function(){
    angular.module('common-directives', [])
        .directive('redir', ['$http', function($http) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.on('click', function(e) {
                        e.preventDefault();
                        window.location = attrs.href;
                    });
                }
            }
        }])
        .directive('logout', ['$http', function($http) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.on('click', function(e) {
                        e.preventDefault();
                        $http.post('/logout');
                    });
                }
            }
        }]);
})();