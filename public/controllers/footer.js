(function() {
    angular.module('footer', [])    
        .controller('FooterController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            setInterval(function(){
                var bodyHeight = $(".margin-view").height();
                var vwptHeight = $(window).height();
                if (vwptHeight > bodyHeight) {
                    $(".footer").css("position","absolute").css("bottom",-200)
              }
             else{
                 $(".footer").css("position","relative").css("bottom",0);
             }
                
            
            }, 500);
       }]);
})();
                                         