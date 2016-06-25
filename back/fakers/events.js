var faker = require('faker');

var baseLocation = [1.332092, 103.847100];
var typePool = ["games", "event", "buying", "selling", "favour"];

var tagsPool = [];

function setTags(tags) {
  tagsPool = tags;
}

var usersPool = [];

function setUsers(users) {
  usersPool = users;
}

function getRandomUser(excludeName) {
  var user = usersPool[Math.floor(Math.random() * (usersPool.length - 1))];
  if (user.name === excludeName) {
    return getRandomUser(excludeName);
  }
  return {
    uid: user.uid,
    name: user.name,
    image: user.image
  }
}

function getRandomGeoLocation(base) {
  var swing = Math.floor(Math.random() * 100) / 10000 - 0.005;
  return base + swing;
}

function generate(noAtt, noComm) {
  var creator = getRandomUser();

  var tags = [];
  for (var i = 0; i < Math.floor((Math.random() * 3) + 1); i++) {
    tags.push(tagsPool[Math.floor((Math.random() * (tagsPool.length - 1)))]);
  }

  var attendance = [];
  if (!noAtt) {
    for (var j = 0; j < Math.floor((Math.random() * (usersPool.length - 1)) + 1); j++) {
      attendance.push(getRandomUser(creator.name));
    }
  }

  var comments = [];
  if (!noComm) {
    for (var k = 0; k < Math.floor((Math.random() * 10) + 1); k++) {
      comments.push(
          {
            author: getRandomUser(),
            message: faker.lorem.sentence(),
            createdAt: faker.date.recent().getTime()
          });
    }
  }

  return {
    title: faker.lorem.words(),
    description: faker.lorem.sentence(),
    startTime: faker.date.recent().getTime(),
    endTime: faker.date.future().getTime(),
    createdAt: faker.date.recent().getTime(),
    creator: creator,
    address: faker.address.streetAddress(),
    image: faker.image.image(),
    verified: faker.random.boolean(),
    latitude: getRandomGeoLocation(baseLocation[0]),
    longitude: getRandomGeoLocation(baseLocation[1]),
    likes: Math.floor((Math.random() * 50) + 1),
    views: Math.floor((Math.random() * 500) + 1),
    tags: tags,
    type: typePool[Math.floor((Math.random() * 5))],
    maxAllowed: Math.floor((Math.random() * 20) + 1),
    attendance: attendance,
    comments: comments,
    bounty: Math.floor((Math.random() * 100) + 1),
    cost: Math.floor((Math.random() * 100) + 1)
  };
}

module.exports = {
  generate: generate,
  setTags: setTags,
  setUsers: setUsers
};
