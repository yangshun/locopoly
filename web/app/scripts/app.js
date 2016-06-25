'use strict';

/**
 * @ngdoc overview
 * @name locopoly
 * @description
 * # locopoly
 *
 * Main module of the application.
 */
angular
  .module('locopoly', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'Login'
      })
      .when('/activity', {
        templateUrl: 'views/activity.html',
        controller: 'ActivityCtrl',
        controllerAs: 'Activity'
      })
      .when('/explore', {
        templateUrl: 'views/explore.html',
        controller: 'ExploreCtrl',
        controllerAs: 'Explore'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'Profile'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
