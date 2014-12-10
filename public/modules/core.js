// public/modules/core.js

/**
 * Expose application dependencies
 */
(function() {
    
    angular.module('app', ['ngRoute', 'login', 'admin', 'profile', 'project', 'collection', 'test', 'home', 'httpFactory', 'common-directives', 'angular-growl']);

})();
