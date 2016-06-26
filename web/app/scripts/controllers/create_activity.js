'use strict';

/**
 * @ngdoc function
 * @name locopoly.controller:CreateActivityCtrl
 * @description
 * # CreateActivityCtrl
 * Controller of the locopoly
 */
/*
*/
angular.module('locopoly')
  .controller('CreateActivityCtrl', function ($scope, $location, currentAuth) {
    var defaultActivity = {
      views: 0,
      likes: 0,
      type: 'games',
      verified: false,
      createdAt: Date.now()
    };
    $scope.activity = _.assign({}, defaultActivity);

    var currentLocation = [1.3320410607812756, 103.84692311797335];
    var map = L.mapbox.map('create-map').setView(currentLocation, 18);
    L.mapbox.styleLayer('mapbox://styles/sebastianquek/cipsbnqto0023ckngkhywj5v1').addTo(map);
    map.removeControl(map.zoomControl);
    map.setView(currentLocation);
    L.marker(currentLocation).addTo(map);

    var USE_FAKER = true;
    if (USE_FAKER) {
      var fakeDate = faker.date.future();
      $scope.activity = _.assign({}, $scope.activity, {
        title: 'HDB Cool Ideas Hack',
        description: 'Singapore’s vision for our future is indeed ambitious. We’re becoming the world’s first Smart Nation that provides opportunities for all and creates the conditions for a caring and gracious society, whilst doing so in a sustainable manner in our built environment.',
        address: 'Toa Payoh HDB Hub',
        type: 'event',
        creator: {
          uid: currentAuth.uid,
          name: currentAuth.displayName,
          image: currentAuth.photoURL
        },
        verified: false,
        startTime: moment().format('X') + '000',
        endTime: moment().add(2, 'day').format('X') + '000',
        latitude: 1.333030,
        longitude:  103.848182,
        cost: 15,
        maxAllowed: 100,
        bounty: 10,
        image: "http://www.upsingapore.com/wp-content/uploads/2016/05/FA_HDB_Web-Banner_1920x600px-05.png",
        tags: ['Yoga']
      });
    }

    $scope.addActivity = function () {
      var activityRef = firebase.database().ref().child('data').child('activities');
      var newActivityKey = activityRef.push().key;
      var updates = {};
      updates[newActivityKey] = $scope.activity;
      activityRef.update(updates);
      $scope.activity = _.assign({}, defaultActivity);
      $location.path('/explore');
    };
  });
