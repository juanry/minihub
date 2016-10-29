'use strict';

/**
 * @ngdoc function
 * @name miniApp.controller:GifCtrl
 * @description
 * # GifCtrl
 * Controller of the miniApp
 */
var username = '';
var password = '';


angular.module('miniApp')
  .controller('MainCtrl', function($http,$scope,$q, $location,Datos) {
    $scope.username = Datos.username;
    $scope.password = Datos.password;
    $scope.change = function(){
      console.log($scope.username);
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
          deferred.resolve($scope.gifs = angular.fromJson(response.data));
        }, function errorCallback(error) {
          console.log(error);
          deferred.resolve($scope.gifs = angular.fromJson({}));
        });
        return deferred.promise;
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
    };
    $scope.login = function(){
      var deferred = $q.defer();
        var authToken = "Basic " + btoa($scope.username + ":" + $scope.password);
        var config = {
          headers: {
            'Authorization': authToken,
            'Accept': 'application/json;odata=verbose'
          }
        };
        $http.get('https://api.github.com/user',config)
        .then(function successCallback(response){
          Datos.username = $scope.username;
          Datos.password = $scope.password;
          $location.path('/index');
        }, function errorCallback(error) {
            console.log(error);
           alert("Crendeciales Incorrectas");
           $location.path('/');
        });
        return deferred.promise;
    };
});

