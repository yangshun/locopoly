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

//var auth = firebaseApp.auth();
var database = firebaseApp.database();
var token = firebase.auth().createCustomToken('something_special');

//var eventsRef = database.ref("events");
//eventsRef.orderByChild("createdAt").limitToFirst(5).on("child_added", function (snapshot) {
//  //snapshot.update({"processed": true});
//  console.log(snapshot.val());
//});



var tagsPool = [
  "Badminton", "Yoga", "Writing", "Running", "Relaxing", "Painting",
  "Golf", "Cooking", "Dancing", "Chess", "Bowling", "Basketball"
];
var userFaker = require('./faker/users');

var userKeys = [];
var usersRef = database.ref("users");
for (var i = 0; i < 10; i++) {
  var newUserRef = usersRef.push();
  newUserRef.set(userFaker.generate());
  userKeys.push(newUserRef.key);
}
console.log(userKeys);


console.log('Firebase started monitoring....');