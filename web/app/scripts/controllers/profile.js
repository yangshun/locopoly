'use strict';

/**
 * @ngdoc function
 * @name locopoly.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the locopoly
 */
angular.module('locopoly').controller('ProfileCtrl', ['$scope', 'currentAuth',
  function ($scope, currentAuth) {
    console.log(currentAuth);
    $scope.currentUser = currentAuth;
  }
]);
