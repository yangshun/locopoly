var express = require('express');
var firebase = require('firebase');
var config = require('./config');

var controller = require('./api/controller');
var processor = require('./worker/processor');


var app = express();
var firebaseApp = firebase.initializeApp(config.firebase);


//
// Task one, web interface
//

//app.use('/api', controller);
//app.listen(3000);
//
//console.log('Express listening on port 3000...');


//
// Task one, monitoring firebase
//

var database = firebaseApp.database();

var usersRef = database.ref("data/users");
var eventsRef = database.ref("data/events");
var tagsRef = database.ref("data/tags");
var interestsRef = database.ref("data/interests");

eventsRef.limitToLast(1).on("child_added", function (snapshot) {
  var data = snapshot.val();
  if (!data.processed) {
    console.log("\n============================");
    console.log("start processing new message created at " + new Date(data.createdAt));
    processor.processEvent(snapshot, usersRef, tagsRef, interestsRef);
    console.log("done processing");
  }
});

usersRef.limitToLast(1).on("child_added", function (snapshot) {
  var data = snapshot.val();
  if (!data.processed) {
    console.log("\n============================");
    console.log("start processing new user name: " + data.name);
    processor.processUser(snapshot, interestsRef);
    console.log("done processing");
  }
});

console.log('Firebase started monitoring....');
