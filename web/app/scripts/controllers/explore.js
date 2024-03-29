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
    $scope.loaded = false;
    var TYPE_MAPPING = {
      event: '#24ceA9',
      games: '#f13d75',
      favour: '#f1cb08',
      buying: '#eb6642',
      selling: '#a16897'
    };
    var currentLocation = [1.3320410607812756, 103.84692311797335];
    var mapCenter = [1.3331726468496001,103.84689093146517];
    var map = L.mapbox.map('map').setView(mapCenter, 17);
    L.mapbox.styleLayer('mapbox://styles/sebastianquek/cipsbnqto0023ckngkhywj5v1').addTo(map);
    map.removeControl(map.zoomControl);

    L.marker(currentLocation).addTo(map); // current location

    var ref = firebase.database().ref().child('data').child('activities');
    $scope.activities = $firebaseArray(ref);

    var locations = L.mapbox.featureLayer().addTo(map);
    var circles = [];
    $scope.chosenActivityId = null;

    ref.on('value', function (snapshot) {
      setTimeout(function () {
        $scope.loaded = true;
        _.each(circles, function (circle) {
          map.removeLayer(circle);
        });

        circles = _.map($scope.activities, function (activity) {
          var circle = L.circleMarker([activity.latitude, activity.longitude], {
            fillColor: TYPE_MAPPING[activity.type],
            fillOpacity: 1,
            stroke: false
          });

          circle.on('click', function () {
            $scope.chosenActivityId = activity.$id;
            $scope.$apply();
          });
          return circle;
        });

        _.each(circles, function (circle) {
          circle.addTo(map);
        });
      }, 0);
    });
  });
