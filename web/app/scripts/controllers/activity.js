'use strict';

/**
 * @ngdoc function
 * @name locopoly.controller:ActivityCtrl
 * @description
 * # ActivityCtrl
 * Controller of the locopoly
 */
angular.module('locopoly')
  .controller('ActivityCtrl', function ($scope, $firebaseObject, $firebaseArray, $routeParams, currentAuth) {
    var ref = firebase.database().ref().child('data').child('activities').child($routeParams.activityId);
    $scope.activity = $firebaseObject(ref);

    var orderedMessagesRef = ref.child('comments').orderByChild('createdAt');
    $scope.messages = $firebaseArray(orderedMessagesRef);

    var messagesRef = ref.child('comments');

    $scope.message = {
      text: ''
    };
    $scope.sendMessage = function(text) {
      var newMessageKey = messagesRef.push().key
      var message = {
        message: text,
        createdAt: Date.now(),
        author: {
          uid: currentAuth.uid,
          name: currentAuth.displayName,
          image: currentAuth.photoURL
        }
      };
      var updates = {};
      updates[newMessageKey] = message;
      messagesRef.update(updates);
      $scope.message.text = '';
    };
  });
