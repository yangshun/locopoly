'use strict';

/**
 * @ngdoc function
 * @name locopoly.controller:ActivityCtrl
 * @description
 * # ActivityCtrl
 * Controller of the locopoly
 */
angular.module('locopoly')
  .controller('ActivityCtrl', function ($scope) {
    var defaultActivity = {
      current_attendees: 0,
      impressions: 0,
      hearts: 0
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
        creator: 558978353,
        verified: _.sample([true, false]),
        startTime: moment(fakeDate).add(1, 'day').format('X'),
        endTime: moment(fakeDate).add(_.sample([2, 3, 4], 'day')).format('X'),
        latitude: 1.331892 + _.sample([0.01, 0.005, 0.003, -0.01, -0.005, -0.003]),  // Toa Payoh
        longitude:  103.849388 + _.sample([0.01, 0.005, 0.003, -0.01, -0.005, -0.003]), // Toa Payoh
        cost: faker.finance.amount(),
        maxAllowed: _.sample([3,5,8,13,21])
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
