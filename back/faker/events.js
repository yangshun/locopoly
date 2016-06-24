var faker = require('faker');

var baseLocation = [1.332092, 103.847100];
var typePool = ["games", "event", "buying", "selling"];

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
  for (var i = 0; i < Math.floor((Math.random() * (tagsPool.length - 2)) + 2); i++) {
    tags.push(tagsPool[i]);
  }

  if (!noAtt) {
    var attendance = [];
    for (var j = 0; j < Math.floor((Math.random() * (usersPool.length - 1)) + 1); j++) {
      attendance.push(getRandomUser(creator.name));
    }
  }

  if (!noComm) {
    var comments = [];
    for (var k = 0; k < Math.floor((Math.random() * 10) + 1); k++) {
      comments.push(
          {
            author: getRandomUser(),
            message: faker.lorem.sentence(),
            createdAt: faker.date.recent()
          });
    }
  }

  return {
    title: faker.lorem.words(),
    description: faker.lorem.sentence(),
    startTime: faker.date.recent(),
    endTime: faker.date.future(),
    createdAt: faker.date.recent(),
    creator: creator,
    image: faker.image.image(),
    verified: faker.random.boolean(),
    latitude: getRandomGeoLocation(baseLocation[0]),
    logititude: getRandomGeoLocation(baseLocation[1]),
    likes: Math.floor((Math.random() * 50) + 1),
    views: Math.floor((Math.random() * 500) + 1),
    tags: tags,
    type: typePool[Math.floor((Math.random() * 4))],
    max_allowed: Math.floor((Math.random() * 20) + 1),
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