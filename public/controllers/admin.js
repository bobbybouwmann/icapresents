// public/controllers/admin.js

/**
 * Expose admin controllers and user admin routes
 */
(function() {

    angular.module('admin', [])

        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            
            /**
             * Check if the current user is logged in as an admin.
             */
            var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
                var deferred = $q.defer();

                $http.get('/loggedinadmin')
                    .success(function (user) {
                        if (user !== '0') {
                            $rootScope.user = user;
                            $rootScope.loggedin = true;
                            $timeout(deferred.resolve, 0);
                        } else {
                            $timeout(function () {
                                deferred.reject();
                            }, 0);
                            $location.path('/login');
                        };
                    });

                return deferred.promise;
            };

            /**
             * Admin routes
             */
            $routeProvider
                .when('/admin', {
                    templateUrl: '/views/adminpanel.html',
                    controller: 'AdminController',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/admin/editproject/:_id', {
                    templateUrl: '/views/editproject.html',
                    controller: 'AdminEditProjectController',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                });

            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }])
        
        /**
         * Edit a project as an admin. 
         */
        .controller('AdminEditProjectController', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
            var id = $routeParams._id;

            $http.get('/api/semesters')
                .success (function (data) {
                    $scope.semesters = data;
                });

            $http.get('/api/projects/' + id) 
                .success (function (data) {
                    $scope.project = data.project;
                });
        }])

        /**
         * Fill the $scope with data from the database and provide
         * functions to update that data. 
         */
        .controller('AdminController', ['$http', '$scope', '$routeParams', '$filter', '$location', function ($http, $scope, $routeParams, $filter, $location) {
            var orderBy = $filter('orderBy');
            var tab = 1;

            $scope.mainprofiles = [{
                number: 1, name: 'Business IT & Management'
            }, {
                number: 2, name: 'Communication & Multimedia Design'
            }, {
                number: 3, name: 'Informatics'
            }, {
                number: 4, name: 'Technical Informatics'
            }];

            $scope.showEditProfile = false;
            $scope.showEditSemester = false;
            $scope.showEditUser = false;

            $http.get('/api/profiles')
                .success (function (data) {
                    $scope.profiles = data;
                });

            $http.get('/api/semesters')
                .success (function (data) {
                    $scope.semesters = data;
                });  

            $http.get('/api/projects')
                .success (function (data) {
                    $scope.projects = data;
                });  

            $http.get('/api/users')
                .success (function (data) {
                    $scope.users = data;
                })

            $scope.isSet = function(checkTab) {
                return tab === checkTab;
            };

            $scope.setTab = function(setTab) {
                tab = setTab;
            };

            $scope.orderProfiles = function (predicate, reverse) {
                $scope.profiles = orderBy($scope.profiles, predicate, reverse);
            };

            $scope.orderSemesters = function (predicate, reverse) {
                $scope.semesters = orderBy($scope.semesters, predicate, reverse);  
            };

            $scope.orderUsers = function (predicate, reverse) {
                $scope.users = orderBy($scope.users, predicate, reverse);  
            };

            $scope.orderProfiles('name', false);
            $scope.orderSemesters('name', false);
            $scope.orderUsers('firstname', false);

            $scope.addProfile = function () {
                $http.post('/api/profiles', $scope.formDataProfile)
                    .success (function (data) {
                        $scope.profiles = data;
                        $scope.formDataProfile = {};
                    })
                    .error (function (data) {
                        console.log("error: " + data);
                    });
            };
            
            $scope.removeProfile = function (id) {
                $http.delete('/api/profiles/' + id)
                    .success (function (data) {
                        $scope.profiles = data;
                        $scope.showEditProfile = false;
                    })
                    .error (function (data){
                        console.log("error: " + data);
                    });
            };

            $scope.getProfileData = function (id) {
                $scope.showEditProfile = true;

                $http.get('/api/profiles/' + id)
                    .success (function (data) {
                        $scope.profile = data;
                    });
            };

            $scope.editProfile = function () {
                $http.put('/api/profiles/' + $scope.profile._id, $scope.profile)
                    .success (function (data) {
                        $scope.profile = "";
                        $scope.profiles = data;
                        $scope.showEditProfile = false;
                    })
                    .error (function (data){
                        console.log("error: " + data);
                    });
            };

            $scope.addSemester = function () {            
                $http.post('/api/semesters', $scope.formDataSemester)
                    .success (function (data) {
                        $scope.semesters = data;
                        $scope.formDataSemester = {};
                    })
                    .error (function (data) {
                        console.log("error: " + data);
                    });
            };

            $scope.removeSemester = function (id) {
                $http.delete('/api/semesters/' + id)
                    .success (function (data) {
                        $scope.semesters = data;
                    })
                    .error (function (data){
                        console.log("error: " + data);
                    });
            };

            $scope.getSemesterData = function (id) {
                $scope.showEditSemester = true;
                
                $http.get('/api/semesters/' + id)
                    .success (function (data) {
                        data.startdate = new Date(data.startdate);
                        data.enddate = new Date(data.enddate);

                        $scope.semester = data;
                    })
                    .error (function (data) {
                        console.log("error: " + data);
                    });
            };

            $scope.editSemester = function () {
                $http.put('/api/semesters/' + $scope.semester._id, $scope.semester)
                    .success (function (data) {
                        $scope.semester = "";
                        $scope.semesters = data;
                        $scope.showEditSemester = false;
                    })
                    .error (function (data){
                        console.log("error: " + data);
                    });
            };

            $scope.removeUser = function (id) {
                $http.delete('/api/users/' + id)
                    .success (function (data) {
                        $scope.users = data;
                    })
                    .error (function (data) {
                        console.log("error: " + data);
                    });
            }

            $scope.getUserData = function (id) {
                $scope.showEditUser = true;

                $http.get('/api/users/' + id)
                    .success (function (data) {
                        console.log(data.user);
                        $scope.user = data.user;
                        $scope.profileid = data.user.profileid;
                    })
                    .error (function (data) {
                        console.log("error: " + data);
                    });
            }

            $scope.editUser = function () {
                $http.put('/api/users/' + $scope.user._id, $scope.user)
                    .success (function (data) {
                        $scope.user = "";
                        $scope.users = data;
                        $scope.showEditUser = false;
                    })
                    .error (function (data) {
                        console.log("error: " + data);
                    });
            }

            $scope.removeProject = function (id) {
                $http.delete('/api/projects/' + id)
                    .success (function (data) {
                        $scope.projects = data;
                    })
                    .error (function (data){
                        console.log("error: " + data);
                    });
            };

            $scope.editProject = function (id) {
                $location.path('/admin/editproject/' + id);
            };
        }]);

})();
