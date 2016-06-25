var faker = require('faker');

var tagsPool = [];

function setTags(tags) {
  tagsPool = tags;
}

function generate() {
  var temp = faker.helpers.createCard();

  var interests = [];
  for (var i = 0; i < Math.floor((Math.random() * 3) + 1); i++) {
    interests.push(tagsPool[Math.floor((Math.random() * (tagsPool.length - 1)))]);
  }
  return {
    name: temp.name,
    email: temp.email,
    username: temp.username,
    address: temp.address,
    phone: temp.phone,
    image: faker.image.avatar(),
    interests: interests
  }
}

module.exports = {
  generate: generate,
  setTags: setTags
};