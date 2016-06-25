'use strict';

/**
 * @ngdoc function
 * @name locopoly.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the locopoly
 */
angular.module('locopoly').controller('LoginCtrl', ['$scope', 'Auth',
  function ($scope, Auth) {
    $scope.signIn = function() {
      $scope.firebaseUser = null;
      $scope.error = null;

      var provider = new firebase.auth.FacebookAuthProvider();
      Auth.$signInWithPopup(provider).then(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
      }).catch(function(error) {
        $scope.error = error;
      });
    };
  }
]);
