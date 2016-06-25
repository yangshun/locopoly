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
  .controller('CreateActivityCtrl', function ($scope, currentAuth) {
    var defaultActivity = {
      views: 0,
      likes: 0,
      type: 'games',
      verified: false,
      createdAt: Date.now()
    };
    $scope.activity = _.assign({}, defaultActivity);

    var USE_FAKER = true;
    if (USE_FAKER) {
      var fakeDate = faker.date.future();
      $scope.activity = _.assign({}, $scope.activity, {
        title: _.capitalize(faker.lorem.words()),
        description: faker.lorem.sentences(),
        address: faker.address.streetAddress(),
        type: _.sample(['games', 'event', 'buying', 'selling']),
        creator: {
          uid: currentAuth.uid,
          name: currentAuth.displayName,
          image: currentAuth.photoURL
        },
        verified: _.sample([true, false]),
        startTime: moment(fakeDate).add(1, 'day').format('X'),
        endTime: moment(fakeDate).add(_.sample([2, 3, 4], 'day')).format('X'),
        latitude: 1.331892 + _.sample([0.01, 0.005, 0.003, -0.01, -0.005, -0.003]),  // Toa Payoh
        longitude:  103.849388 + _.sample([0.01, 0.005, 0.003, -0.01, -0.005, -0.003]), // Toa Payoh
        cost: faker.finance.amount(),
        maxAllowed: _.sample([3,5,8,13,21]),
        bounty: _.sample([3,5,8,13,21])
      });
    }

    $scope.addActivity = function () {
      var newActivityKey = database.ref().child('activities').push().key;
      var updates = {};
      updates['/activities/' + newActivityKey] = $scope.activity;
      database.ref().update(updates);
      $scope.activity = _.assign({}, defaultActivity);
    };
  });
