angular.module('foodService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Foods', ['$http', 'usSpinnerService',function($http, usSpinnerService) {
		return {
			get : function() {
				return $http.get('/api/foods');
			},
			create : function(foodData) {
				return $http.post('/api/foods', foodData);
			},
			delete : function(id) {
				return $http.delete('/api/foods/' + id);
			},
			total : function() {
				return $http.get('/api/total');
			}
			// getItem : function(id) {
			// 	return $http.get('/api/foods/' + id);
			// }
		}
	}]);