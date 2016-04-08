angular.module('foodDirective', [])

.directive('yourFood', function () {
	return {
		restrict: 'E', 
		templateUrl:'yourFood.html', 
	};
});