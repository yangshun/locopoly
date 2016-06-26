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
    var TYPE_MAPPING = {
      event: '#24ceA9',
      games: '#f13d75',
      favour: '#f1cb08',
      buying: '#eb6642',
      selling: '#a16897'
    };

    var circle = null;
    var map = L.mapbox.map('activity-map').setView([1.333092, 103.850388], 18);
    L.mapbox.styleLayer('mapbox://styles/sebastianquek/cipsbnqto0023ckngkhywj5v1').addTo(map);
    map.removeControl(map.zoomControl);
    ref.on('value', function (snapshot) {
      var activity = snapshot.val();
      if (circle) {
        map.removeLayer(circle);
      }
      circle = L.circleMarker([activity.latitude, activity.longitude], {
        fillColor: TYPE_MAPPING[activity.type],
        fillOpacity: 1,
        stroke: false
      });

      map.setView([activity.latitude, activity.longitude]);
      var marker = L.marker([activity.latitude, activity.longitude], {
        icon: L.divIcon({
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, 0],
          shadowSize: [0, 0],
          className: 'animated-circle activity-type-background-' + activity.type
        })
      });

      circle.addTo(map);
      marker.addTo(map);
    });

    var orderedCommentsRef = ref.child('comments').orderByChild('createdAt');
    $scope.comments = $firebaseArray(orderedCommentsRef);

    var commentsRef = ref.child('comments');

    $scope.comment = {
      text: ''
    };
    $scope.sendComment = function(text) {
      var newMessageKey = commentsRef.push().key
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
      commentsRef.update(updates);
      $scope.comment.text = '';
    };
    $scope.addAttendee = function() {
      var ref = firebase.database().ref().child('data').child('activities').child($routeParams.activityId).child('attendance');
      var key = ref.push().key;
      var attendee = {
        uid: currentAuth.uid,
        name: currentAuth.displayName,
        image: currentAuth.photoURL
      };
      var updates = {};
      updates[key] = attendee;
      ref.update(updates);
    };
  });
