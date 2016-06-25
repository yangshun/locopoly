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
    $scope.currentUser = {
      name: currentAuth.displayName,
      email: currentAuth.email,
      photo: currentAuth.photoURL,
      interests: ''
    };
    $scope.save = function(user) {
      console.log(user);
    };
  }
]);
