(function() {

	angular.module('collection', [])
		.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
			$routeProvider
				.when('/collections', {
					templateUrl: '/views/collections.html',
					controller: 'CollectionViewController',
					controllerAs: 'collection'
				})
				.when('/collections/:_id', {
					templateUrl: '/views/editcollection.html',
					controller: 'CollectionEditController',
					controllerAs: 'collection'
				});

			$locationProvider.html5Mode(true);
		}])
		.controller('CollectionViewController', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
			$http.get('/api/collections')
				.success(function (data) {					
					$scope.collections = data;
				});

			$scope.createCollection = function () {
				$http.post('/api/collections', $scope.formData)
					.success (function (data) {
						$scope.formData = {};
						$scope.collections = data;
					})
					.error (function (data) {
						console.log('Error: ' + data);
					});
			};
		}])
		.controller('CollectionEditController', ['$http', '$scope', '$routeParams', '$location', '$window', function ($http, $scope, $routeParams, $location, $window) {
			var id = $routeParams._id;

			$http.get('/api/collectionTests/' + id)
				.success (function (data) {
					$scope.tests = data;
				});

			$http.get('/api/collections/' + id)
				.success (function (data) {
					$scope.collection = data;
				})
				.error (function (data) {
					console.log('Error: ' + data);
				});

			$scope.updateCollection = function () {
				$http.put('/api/collections/' + id, $scope.collection)
					.success (function (data) {
						$location.path('/collections');
					})
					.error (function (data) {
						console.log('Error: ' + data);
					});
			};

			$scope.deleteCollection = function () {
				$http.delete('/api/collections/' + id)
					.success(function (data) {
						$location.path('/collections');
					})
					.error (function (data) {
						console.log('Error: ' + data);
					});
			};
		}]);

})();