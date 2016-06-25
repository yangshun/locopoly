'use strict';

/**
 * @ngdoc function
 * @name locopoly.controller:ActivityCtrl
 * @description
 * # ActivityCtrl
 * Controller of the locopoly
 */
angular.module('locopoly')
  .controller('ActivityCtrl', function ($scope, $firebaseObject, $routeParams) {
    var ref = firebase.database().ref().child('data').child('activities').child($routeParams.activityId);
    $scope.activity = $firebaseObject(ref);
  });
