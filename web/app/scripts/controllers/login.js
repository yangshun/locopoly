'use strict';

/**
 * @ngdoc function
 * @name locopoly.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the locopoly
 */
angular.module('locopoly').controller('LoginCtrl', ['$scope', '$location', '$firebaseArray', 'Auth',
  function ($scope, $location, $firebaseArray, Auth) {
    $('.logo-board').addClass('animated slideInUp');
    setTimeout(function () {
      $('.green-puck').addClass('animated bounce infinite');
      $('.pink-puck').addClass('animated rubberBand infinite');
      $('.orange-puck').addClass('animated shake infinite');
    }, 1000);

    Auth.$onAuthStateChanged(function(user) {
      if (user.displayName) {
        $location.path('/explore');
      } else {
        $location.path('/');
      }
    });

    $scope.signIn = function() {
      $scope.firebaseUser = null;
      $scope.error = null;

      var provider = new firebase.auth.FacebookAuthProvider();
      Auth.$signInWithPopup(provider).then(function(firebaseUser) {
        var ref = firebase.database().ref().child('data').child('users');
        var userRef = ref.child(firebaseUser.user.uid);
        userRef.on('value', function(user) {
          userRef.set({
            uid: firebaseUser.user.uid,
            name: firebaseUser.user.displayName,
            email: firebaseUser.user.email,
            username: '',
            address: {},
            phone: '',
            image: firebaseUser.user.photoURL,
            interests: []
          });
        });
      }).catch(function(error) {
        $scope.error = error;
      });
    };
  }
]);
