// public/modules/core.js

/**
 * Expose application dependencies
 *
 * @main app
 */
(function() {
    
    angular.module('app', ['ngRoute', 'login', 'admin', 'profile', 'project', 'collection', 'profiles', 'test', 'home', 'footer', 'pages', 'httpFactory', 'common-directives', 'angular-growl']);

})();
