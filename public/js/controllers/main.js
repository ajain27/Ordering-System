'use strict'
var fooditems = angular.module('foodController', []);

fooditems.controller('FoodData', ['$scope', '$http', 'Foods', function ($scope, $http, Foods) {
		$scope.formData = {};

		Foods.get().success(function(data) {
			$scope.foods = data;
			}). error (function(err) {
				console.log(err);	
			})

	$scope.addFood = function () {
		if($scope.formData.name != undefined && $scope.formData.price != undefined && $scope.formData.description != undefined) {
			Foods.create($scope.formData).success(function ( data ) {
			$scope.foods = data;
			$scope.formData = {};
		}).catch(function (err) {
			console.log(err);
		});	
	}	
};

		$scope.showFoodDetails = function ( food ) {
			var id = food._id;
			$scope.yourFood = food;
		}

		$scope.deleteFood = function (id) {
			Foods.delete(id).success( function ( data ) {
				$scope.deleteFoodItem = data;
				Foods.get().success( function ( data ) {
				$scope.foods = data;
				});
			});
		}
		$scope.addOrder = function ( food ) {
			var order = {
				food: food, 
				price: food.price
			}
			Foods.order(order).then(function (result) {
			$scope.orderedFood = result.data;

			Foods.total().success(function (data) {
				$scope.total = data.total;
			});			
		})
	}
	
}]);