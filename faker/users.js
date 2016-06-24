var faker = require('faker');

var tagsPool = [];

function setTags(tags){
  tagsPool = tags;
}

function generate() {
  var temp = faker.helpers.createCard();

  var interests = [];
  for (var i = 0; i < Math.floor((Math.random() * (tagsPool.length-2)) + 2); i++) {
    interests.push(tagsPool[i]);
  }
  return {
    name: temp.name,
    email: temp.email,
    username: temp.username,
    address: temp.address,
    image: faker.image.avatar(),
    interests: interests
  }
}

module.exports = {
  generate: generate,
  setTags: setTags
};