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
    var map = L.mapbox.map('map', 'mapbox.k8xv42t9').setView([1.331892, 103.849388], 15);
    var ref = firebase.database().ref().child('activities');
    $scope.activities = $firebaseArray(ref);
    // database.ref().child('activities').on('value', function (snapshot) {
    //   $scope.activities = snapshot.val();
    //   $scope.$apply();

    //   var geojson = [{
    //     type: 'FeatureCollection',
    //     features: _.map($scope.activities, function (activity) {
    //       return {
    //         type: 'Feature',
    //         geometry: {
    //           type: 'Point',
    //           coordinates: [
    //             activity.longitude,
    //             activity.latitude
    //           ]
    //         }
    //       };
    //     })
    //   }];

    //   map.featureLayer
    //     .setGeoJSON(geojson);
    // });
  });
