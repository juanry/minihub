'use strict';

/**
 * @ngdoc overview
 * @name miniApp
 * @description
 * # miniApp
 *
 * Main module of the application.
 */

angular
  .module('miniApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .factory("Datos", function() {
    return {
      data: {}
    };
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/index', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/index'
      });
  });
