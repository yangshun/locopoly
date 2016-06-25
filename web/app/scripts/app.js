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
  .filter('time', function() {
    return function (input) {
      return moment(parseInt(input)).format('Do MMM');
    };
  })
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
        controllerAs: 'Activity',
        resolve: {
          'currentAuth': ['Auth', function(Auth) {
            return Auth.$requireSignIn();
          }]
        }
      })
      .when('/explore', {
        templateUrl: 'views/explore.html',
        controller: 'ExploreCtrl',
        controllerAs: 'Explore',
        resolve: {
          'currentAuth': ['Auth', function(Auth) {
            return Auth.$requireSignIn();
          }]
        }
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'Profile',
        resolve: {
          'currentAuth': ['Auth', function(Auth) {
            return Auth.$requireSignIn();
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
