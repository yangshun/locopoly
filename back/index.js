var _ = require('lodash');
var express = require("express");
var firebase = require("firebase");
var request = require("request");
var bodyParser = require("body-parser");
var config = require("./config");

var processor = require("./workers/processor");

var firebaseApp = firebase.initializeApp(config.firebase);
var database = firebaseApp.database();

var usersRef = database.ref("data/users");
var eventsRef = database.ref("data/activities");
var tagsRef = database.ref("data/tags");
var interestsRef = database.ref("data/interests");

var globalDebugUserId;
var eventCache = {};
var globalDebugUser = {
  key: "whatever",
  data: {
    name: "Laila Torphy",
    image: "http://graph.facebook.com/558978353/picture?type=square"
  }
};

//
// Part one, web interface
//
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/webhook", function (req, res) {
  if (req.query["hub.mode"] === "subscribe" && req.query["hub.verify_token"] === "whatever") {
    console.log("Validating webhook");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

app.post("/webhook", function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object == "page") {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function (pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function (messagingEvent) {
        var senderId = messagingEvent.sender.id;
        globalDebugUserId = senderId;
        if (messagingEvent.optin) {
          //
        } else if (messagingEvent.message) {
          //
          console.log("sender: " + senderId, messagingEvent.message.text);
          sendDataMessage(senderId, {text: messagingEvent.message.text});
        } else if (messagingEvent.delivery) {
          //
        } else if (messagingEvent.postback) {
          var parsedBack = JSON.parse(messagingEvent.postback.payload);
          if (parsedBack.type === "attend") {
            eventsRef.child(parsedBack.key).once("value", function (snapshot) {
              if (snapshot.exists()) {
                var attendanceRef = snapshot.child("attendance");
                var user = globalDebugUser.data;
                var attendanceList = attendanceRef.val();
                if(!_.isArray(attendanceList)){
                  attendanceList = [];
                }
                attendanceList.push(user);
                attendanceRef.ref.set(attendanceList);
              }
            });
            sendDataMessage(senderId, {text: "Your attendance has been recorded. Thank you for your participation!"});
          } else if (parsedBack.type === "like") {
            eventsRef.child(parsedBack.key).once("value", function (snapshot) {
              if (snapshot.exists()) {
                var likesRef = snapshot.child("likes");
                var likes = likesRef.val();
                likesRef.ref.set(likes + 1);
              }
            });
            sendDataMessage(senderId, {text: "You have liked the event. Thank you!"});
          }
        } else {
          console.log("Webhook received unknown messagingEvent: ", messagingEvent);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you"ve
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }
});

function sendDataMessage(recipientId, messageData) {
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: config.messenger.pageAccessToken},
    method: "POST",
    json: {
      recipient: {
        id: recipientId
      },
      message: messageData
    }
  }, function (error, response, body) {
    if (error) {
      console.log("Error sending messages: ", error)
    } else if (response.body.error) {
      console.log("Error: ", response.body.error)
    } else {
      console.log("Message send to " + recipientId)
    }
  });
}

var port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log('Our app is running on http://localhost:' + port);
});

console.log("Express listening on port 5000...");

function sendNewEventToUser(newEvent, eventKey) {
  if (!globalDebugUserId) {
    return console.log("!!globalDebugUserId not set!!");
  }
  var messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: newEvent.title,
            image_url: newEvent.image,
            subtitle: newEvent.description,
            buttons: [
              {
                type: "web_url",
                url: "https://github.com/yangshun/locopoly",
                title: "Check details"
              },
              {
                type: "postback",
                title: "Like",
                payload: JSON.stringify({type: "like", key: eventKey})
              },
              {
                type: "postback",
                title: "Attend",
                payload: JSON.stringify({type: "attend", key: eventKey})
              }
            ]
          }
        ]
      }
    }
  };

  eventCache[eventKey] = newEvent;
  sendDataMessage(globalDebugUserId, messageData);
}

//
// Part two, monitoring firebase
//

eventsRef.limitToLast(1).on("child_added", function (snapshot) {
  var data = snapshot.val();
  if (!data.processed) {
    console.log("\n============================");
    console.log("start processing new message created at " + new Date(data.createdAt));
    processor.processEvent(snapshot, usersRef, tagsRef, interestsRef, sendNewEventToUser);
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

console.log("Firebase started monitoring....");

globalDebugUserId = 1201913199842425;
//sendNewEventToUser({
//  title: "sdasdad",
//  image: "https://iranotes.files.wordpress.com/2013/12/teletubbies-wallpapers-teletubbies-34291311-1024-768.jpg",
//  description: "asdasd asdas dasdads"
//}, "-KL3OU-l-AdTfATLXwVj");

