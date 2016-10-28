'use strict';

/**
 * @ngdoc function
 * @name miniApp.controller:GifCtrl
 * @description
 * # GifCtrl
 * Controller of the miniApp
 */
angular.module('miniApp')
  .controller('MainCtrl', function ($http,$scope,$q) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.username = "juanry";
    $scope.password = "Noseyo+16.";
    $scope.change = function(){
      if($scope.user !== undefined) {
        $scope.fetch();
        $scope.fetchRepositories();
  		}
	   };
     
  	$scope.fetch = function(){
    		var deferred = $q.defer();
        var authToken = "Basic " + btoa($scope.username + ":" + $scope.password);
        var config = {
          headers: {
            'Authorization': authToken,
            'Accept': 'application/json;odata=verbose'
          }
        };
        $http.get('https://api.github.com/users/'+$scope.user,config)
        .then(function successCallback(response) {
          alert("algo que mostrar");
          deferred.resolve($scope.gifs = angular.fromJson(response.data));
        }, function errorCallback(error) {
          console.log(error);
          deferred.resolve($scope.gifs = angular.fromJson({}));
        });
        return deferred.promise;
    		/*$http.get('//api.giphy.com/v1/gifs/' +
              $scope.method +
              '?api_key=dc6zaTOxFJmzC&' +
              'q=' + $scope.search +
              '&limit=' + $scope.limit )*/
  	};
    $scope.fetchRepositories = function(){
        var deferred = $q.defer();
        var authToken = "Basic " + btoa($scope.username + ":" + $scope.password);
        var config = {
          headers: {
            'Authorization': authToken,
            'Accept': 'application/json;odata=verbose'
          }
        };
        $http.get('https://api.github.com/users/'+$scope.user+'/repos',config)
        .then(function successCallback(response) {
          deferred.resolve($scope.repositorios= angular.fromJson(response.data));
        }, function errorCallback(error) {
          console.log(error);
          deferred.resolve($scope.gifs = angular.fromJson({}));
        });
        return deferred.promise;
        /*$http.get('//api.giphy.com/v1/gifs/' +
              $scope.method +
              '?api_key=dc6zaTOxFJmzC&' +
              'q=' + $scope.search +
              '&limit=' + $scope.limit )*/
    };
});
