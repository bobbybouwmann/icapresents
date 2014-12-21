// public/modules/core.js

/**
 * Expose application dependencies
 */
(function() {
    
    angular.module('app', ['ngRoute', 'login', 'admin', 'profile', 'imageuploadfile', 'project', 'collection', 'test', 'home', 'pages', 'httpFactory', 'common-directives', 'angular-growl']);

})();
