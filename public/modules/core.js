// public/modules/core.js

/**
 * Expose application dependencies
 *
 * @main app
 */
(function() {
    
    angular.module('app', ['ngRoute', 'angular-growl', 'httpFactory', 'admin', 'footer', 'home', 'login', 'pages', 'profile', 'profiles', 'project', 'directives']);

})();
