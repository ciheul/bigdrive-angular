'use strict';

/**
 * @ngdoc overview
 * @name bigdriveAngularApp
 * @description
 * # bigdriveAngularApp
 *
 * Main module of the application.
 */
angular
  .module('bigdriveAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/api', {
        templateUrl: 'views/api.html',
        controller: 'ApiCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
