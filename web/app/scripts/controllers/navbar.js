'use strict';

angular.module('locopoly')
  .controller('NavCtrl', ['$scope', 'Auth',
    function ($scope, Auth) {
      $scope.auth = Auth;
      $scope.user = null;

      $scope.auth.$onAuthStateChanged(function(user) {
        $scope.user = user;
        $scope.$apply();
      });
    }
  ]);
