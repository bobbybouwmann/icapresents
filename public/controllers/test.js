// public/controllers/test.js

/**
 * Expose test controllers and routes
 */
(function() {

	angular.module('test', [])
		.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
			$routeProvider
				.when('/tests', {
					templateUrl: '/views/tests.html',
					controller: 'TestViewController',
					controllerAs: 'test'
				})
				.when('/tests/:_id', {
					templateUrl: '/views/edittest.html',
					controller: 'TestEditController',
					controllerAs: 'test'
				});

			$locationProvider.html5Mode({ enabled: true, requireBase: false });
		}])
		.controller('TestViewController', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
			$http.get('/api/tests')
				.success(function (data) {					
					$scope.tests = data;
				});

			$http.get('/api/collections')
				.success(function (data) {
					$scope.collections = data;
				});

			$scope.createTest = function () {
				$http.post('/api/tests', $scope.formData)
					.success (function (data) {
						$scope.formData = {};
						$scope.tests = data;
					})
					.error (function (data) {
						console.log('Error: ' + data);
					});
			};
		}])
		.controller('TestEditController', ['$http', '$scope', '$routeParams', '$location', '$window', function ($http, $scope, $routeParams, $location, $window) {
			var id = $routeParams._id;

			$http.get('/api/collections')
				.success(function (data) {
					$scope.collections = data;
				});

			$http.get('/api/tests/' + id)
				.success (function (data) {
					console.log(data);
					$scope.test = data;
				})
				.error (function (data) {
					console.log('Error: ' + data);
				});

			$scope.updateTest = function () {
				$http.put('/api/tests/' + id, $scope.test)
					.success (function (data) {
						$location.path('/tests');
					})
					.error (function (data) {
						console.log('Error: ' + data);
					});
			};

			$scope.deleteTest = function () {
				$http.delete('/api/tests/' + id)
					.success(function (data) {
						$location.path('/tests');
					})
					.error (function (data) {
						console.log('Error: ' + data);
					});
			};

			$scope.runTest = function () {
				var url = $scope.test.url;
				var method = $scope.test.method;
				var urlData = $scope.test.data;
				var param = $scope.test.param;

				if (method === 'get') {
					$http.get(url)
						.success (function (data) {
							$scope.result = data;
						})
						.error (function (data) {
							console.log('Error: ' + data);
						});
				} else if (method === 'post') {
					$http.post(url, urlData)
						.success (function (data) {
							$scope.result = data;
						})
						.error (function (data) {
							console.log('Error: ' + data);
						});
				} else if (method === 'delete') {
					$http.delete(url + '/' + param)
						.success (function (data) {
							$scope.result = data;
						})
						.error (function (data) {
							console.log('Error: ' + data);
						});
				} else if (method === 'put') {
					$http.put(url + '/' + param, urlData)
						.success (function (data) {
							$scope.result = data;
						})
						.error (function (data) {
							console.log('Error: ' + data);
						});
				}
			}
		}]);

})();
