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
			Foods.create($scope.formData).then(function ( data ) {
			$scope.foods = data;
			$scope.formData = {};
		}).catch(function (err) {
			console.log(err);
		});	
	}
	
		Foods.get().success( function ( data ) {
			$scope.foods = data;
			})		
	};

		$scope.showFoodDetails = function ( food ) {
			var id = food._id;
			console.log(id);
			// Foods.getItem(id);			
			$scope.yourFood = food;
		}

		$scope.deleteFood = function (id) {
			Foods.delete(id).success( function ( data ) {
				$scope.deleteFoodItem = data;
				console.log($scope.deleteFoodItem);
				Foods.get().success( function ( data ) {
				$scope.foods = data;
				});
			});
			// Foods.get().success(function(data) {
			// $scope.delOrder = data;
			// })
		}

		$scope.addOrder = function ( food ) {
			var id = food._id;
			$scope.orderedFood = food;
			console.log( $scope.orderedFood );

		}

		$scope.yourOrder = function (data) {
			$scope.yourOrder = data;
		}
	
}]);