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
    $scope.activities = {};
    
    var map = L.mapbox.map('map').setView([1.331892, 103.849388], 15);
    L.mapbox.styleLayer('mapbox://styles/sebastianquek/cipsbnqto0023ckngkhywj5v1').addTo(map);
    map.removeControl(map.zoomControl);
    
    var ref = firebase.database().ref().child('activities');
    $scope.activities = $firebaseArray(ref);
    ref.on('value', function (snapshot) {
      $scope.activities = snapshot.val();
      $scope.$apply();

      var geojson = [{
        type: 'FeatureCollection',
        features: _.map($scope.activities, function (activity) {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [
                activity.longitude,
                activity.latitude
              ]
            }
          };
        })
      }];

      map.featureLayer
        .setGeoJSON(geojson);
    });
  });
