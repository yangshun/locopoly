var firebase = require('firebase');
var config = require('./config');

var firebaseApp = firebase.initializeApp(config.firebase);
var database = firebaseApp.database();

var userFaker = require('./faker/users');
var eventFaker = require('./faker/events');

//
var tagsPool = [
  "Badminton", "Yoga", "Writing", "Running", "Relaxing", "Painting",
  "Golf", "Cooking", "Dancing", "Chess", "Bowling", "Basketball"
];

var usersRef = database.ref("users");

var usersList = [];
userFaker.setTags(tagsPool);
for (var i = 0; i < 10; i++) {
  var user = userFaker.generate();
  usersRef.push().set(user);
  //console.log(user);
  // cache the data
  usersList.push(user);
}
console.log("users have been created!");

var eventsRef = database.ref("events");
eventFaker.setTags(tagsPool);
eventFaker.setUsers(usersList);
for (var j = 0; j < 20; j++) {
  var event = eventFaker.generate();
  //console.log(event);
  eventsRef.push().set(event);
}
console.log("events have been created!");