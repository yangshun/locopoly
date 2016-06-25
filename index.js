var express = require("express");
var firebase = require("firebase");
var request = require("request");
var bodyParser = require("body-parser");
var config = require("./config");

var controller = require("./api/controller");
var processor = require("./worker/processor");


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
        var sender = messagingEvent.sender;
        if (messagingEvent.optin) {
          //
        } else if (messagingEvent.message) {
          //
          console.log(sender, messagingEvent.message.text);
          sendTextMessage(sender, messagingEvent.message.text)
        } else if (messagingEvent.delivery) {
          //
        } else if (messagingEvent.postback) {
          //
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

function sendTextMessage(sender, text) {
  var messageData = {text: text};
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: config.messenger.pageAccessToken},
    method: "POST",
    json: {
      recipient: {
        id: sender.id
      },
      message: messageData
    }
  }, function (error, response, body) {
    if (error) {
      console.log("Error sending messages: ", error)
    } else if (response.body.error) {
      console.log("Error: ", response.body.error)
    } else {
      console.log("Message send to " + sender.id)
    }
  });
}

function sendTextMessageByPhone(phone, data) {
  var messageData = {text: data};
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: config.messenger.pageAccessToken},
    method: "POST",
    json: {
      recipient: {
        phone_number: phone
      },
      message: messageData
    }
  }, function (error, response, body) {
    if (error) {
      console.log("Error sending messages: ", error)
    } else if (response.body.error) {
      console.log("Error: ", response.body.error)
    } else {
      console.log("Message send to " + data)
    }
  });
}


app.listen(5000);

console.log("Express listening on port 5000...");


//
// Part two, monitoring firebase
//
var firebaseApp = firebase.initializeApp(config.firebase);
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

console.log("Firebase started monitoring....");