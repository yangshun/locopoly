'use strict';

/**
 * @ngdoc function
 * @name locopoly.controller:ExploreCtrl
 * @description
 * # ExploreCtrl
 * Controller of the locopoly
 */
angular.module('locopoly')
  .controller('ExploreCtrl', function ($scope, $firebaseArray) {
    var TYPE_MAPPING = {
      event: '#24ceA9',
      games: '#f13d75',
      favour: '#f1cb08',
      buying: '#eb6642',
      selling: '#a16897'
    };

    var ref = firebase.database().ref().child('activities');
    $scope.activities = $firebaseArray(ref);

    var map = L.mapbox.map('map').setView([1.331892, 103.849388], 15);
    map.removeControl(map.zoomControl);
    L.mapbox.styleLayer('mapbox://styles/sebastianquek/cipsbnqto0023ckngkhywj5v1').addTo(map);

    var locations = L.mapbox.featureLayer().addTo(map);
    var circles = [];

    ref.on('value', function () {
      $scope.$apply();
      _.each(circles, function (circle) {
        circle.removeLayer(map);
      });

      circles = _.map($scope.activities, function (activity) {
        return L.circleMarker([activity.latitude, activity.longitude], {
          fillColor: TYPE_MAPPING[activity.type],
          fillOpacity: 1,
          stroke: false
        });
      });

      _.each(circles, function (circle) {
        circle.addTo(map);
      });
    });
  });
