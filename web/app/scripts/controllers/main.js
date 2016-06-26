'use strict';

angular.module('locopoly')
  .controller('MainCtrl', ['$scope', '$location', 'Auth',
    function ($scope, $location, Auth) {
      $scope.auth = Auth;
      $scope.user = null;

      $scope.auth.$onAuthStateChanged(function(user) {
        $scope.user = user;
        $scope.$apply();
      });

      $scope.signOut = function() {
        Auth.$signOut();
        $location.path('/')
      };

      $scope.filterSearch = '';
    }
  ]);
