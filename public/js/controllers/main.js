'use strict'
var fooditems = angular.module('foodController', []);

fooditems.controller('FoodData', ['$scope', '$http', 'Foods', 'usSpinnerService', function ($scope, $http, Foods, usSpinnerService) {
		$scope.formData = {};

		Foods.get().success(function(data) {
			$scope.foods = data;
			}). error (function(err) {
				console.log(err);	
			})	

		$scope.startSpin = function(){
        usSpinnerService.spin('spinner-1');
   		 }
	    $scope.stopSpin = function(){
	        usSpinnerService.stop('spinner-1');
	    }

	$scope.addFood = function () {
		if($scope.formData.name != undefined && $scope.formData.price != undefined && $scope.formData.description != undefined) {
			Foods.create($scope.formData).then(function (data) {
			$scope.foods = data;
			$scope.formData = {};
		}).catch(function (err) {
			console.log(err);
		});	
	}
	
		Foods.get().success(function(data) {
			$scope.foods = data;
			})		
	};

		$scope.showFoodDetails = function(food) {
			var id = food._id;
			// Foods.getItem(id);			
			$scope.yourFood = food;
		}

		$scope.deleteFood = function (id) {
			Foods.delete(id).success(function(data) {
				$scope.food = data;
			})
			// Foods.get().success(function(data) {
			// $scope.delOrder = data;
			// })
		}

		$scope.addOrder = function (argument) {
			console.log('You Ordered')
		}

		$scope.yourOrder = function (data) {
			$scope.yourOrder = data;
		}
	
}]);