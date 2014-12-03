// public/modules/core.js

/**
 * Expose application dependencies
 */
(function() {
    
    angular.module('app', ['ngRoute', 'login', 'profile', 'project', 'collection', 'test', 'httpFactory', 'common-directives', 'angular-growl']);

})();
