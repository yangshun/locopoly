var _ = require('lodash');
var firebase = require('firebase');
var config = require('./config');

var firebaseApp = firebase.initializeApp(config.firebase);
var database = firebaseApp.database();

var userFaker = require('./fakers/users');
var eventFaker = require('./fakers/events');

//
var tagsPool = [
  "Badminton", "Yoga", "Writing", "Running", "Relaxing", "Painting",
  "Golf", "Cooking", "Dancing", "Chess", "Bowling", "Basketball"
];

var usersRef = database.ref("data/users");
var eventsRef = database.ref("data/activities");

var usersList = [];
userFaker.setTags(tagsPool);
eventFaker.setTags(tagsPool);

function generateNewUser(count, callback) {
  if (count == 0) {
    var masterUser = userFaker.generateMasterUser();
    var newMasterRef = usersRef.push();
    newMasterRef.set(masterUser, function () {
      console.log("users " + count + ". have been created!");
      setTimeout(callback, 1200);
    });
    usersList.push(masterUser);
    return true;
  }
  var user = userFaker.generate();
  var newRef = usersRef.push();
  newRef.set(user, function () {
    console.log("users " + count + ". have been created!");
    setTimeout(generateNewUser, 1200, count - 1, callback);
  });
  usersList.push(user);
}

function generateNewEvent(count, callback) {
  if (count == 0) {

    callback();
    return true;
  }
  var event = eventFaker.generate();
  eventsRef.push().set(event, function () {
    console.log("events " + count + ". have been created!");
    setTimeout(generateNewEvent, 1500, count - 1, callback);
  });
}

function seedAllData() {
  generateNewUser(20, function () {
    console.log("users have all been created!");
    eventFaker.setUsers(usersList);
    generateNewEvent(40, function () {
      console.log("events have all been created!");
    })
  });
}

function addNewEvents() {
  usersRef.once("value", function (snapshot) {
    data = _.values(snapshot.val());
    if (_.isArray(data)) {
      console.log("create a event...");
      eventFaker.setTags(tagsPool);
      eventFaker.setUsers(data);
      var event = eventFaker.generate(true, true);
      eventsRef.push().set(event);
    }
  });
}

//addNewEvents();
seedAllData();
