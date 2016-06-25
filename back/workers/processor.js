var _ = require('lodash');

function processEvent(snapshot, usersRef, tagsRef, interestsRef, sendNewEventToUser) {
  var event = snapshot.val();
  var eventKey = snapshot.key;
  var tagList = event.tags;

  for (var i = 0; i < tagList.length; i++) {
    (function (k) {
      // Add to tags list
      tagsRef.orderByKey().equalTo(tagList[k]).once("value", function (snapshot2) {
        if (!snapshot2.exists()) {
          console.log("[processEvent]: create new tag: " + tagList[k]);
          var newTag = {};
          newTag[tagList[k]] = {};
          tagsRef.update(newTag, function () {
            var subscriberRef = tagsRef.child(tagList[k]).ref;
            subscriberRef.push().set({
              eventKey: eventKey,
              title: event.title,
              creator: event.creator,
              createdAt: event.createdAt
            });
          });
        } else {
          snapshot2.forEach(function (childSnapshot) {
            console.log("[processUser]: add event " + event.title + " to tag: " + tagList[k]);
            var subscriberRef = childSnapshot.ref;
            subscriberRef.push().set({
              eventKey: eventKey,
              title: event.title,
              creator: event.creator,
              createdAt: event.createdAt
            });
          });
        }
      });

      // Send notifications
      interestsRef.orderByKey().equalTo(tagList[k]).once("value", function (snapshot3) {
        if (snapshot3.exists()) {
          snapshot3.child(tagList[k]).forEach(function (childSnapshot) {
            var targetUser = childSnapshot.val();

            usersRef.orderByKey().equalTo(targetUser.userKey).once("value", function (snapshot4) {
              if (snapshot4.exists()) {
                console.log("[processUser]: add event [" + event.title + "] to " + targetUser.name + "'s notification list on " + tagList[k]);
                snapshot4.child(targetUser.userKey + "/notification").ref.push().set({
                  eventKey: eventKey,
                  title: event.title,
                  creator: event.creator,
                  createdAt: event.createdAt
                });
              }
            });

            if (targetUser.phone == "secret phone number") {
              // send to messenger
              console.log("##");
              console.log("sending....");
              console.log("##");
              sendNewEventToUser(event, eventKey);
            }
          });
        }
      });
    }(i));
  }

  snapshot.ref.update({processed: true});
}

function processUser(snapshot, interestsRef) {
  var user = snapshot.val();
  var userKey = snapshot.key;
  var interestList = user.interests;

  for (var i = 0; i < interestList.length; i++) {
    (function (k) {
      interestsRef.orderByKey().equalTo(interestList[k]).once("value", function (snapshot2) {
        if (!snapshot2.exists()) {
          console.log("[processUser]: create new interest:" + interestList[k]);
          var newInt = {};
          newInt[interestList[k]] = {};
          interestsRef.update(newInt, function () {
            var subscriberRef = interestsRef.child(interestList[k]).ref;
            subscriberRef.push().set({
              userKey: userKey,
              name: user.name,
              phone: user.phone
            });
          });
        } else {
          snapshot2.forEach(function (childSnapshot) {
            console.log("[processUser]: add to interest: " + interestList[k]);
            var subscriberRef = childSnapshot.ref;
            subscriberRef.push().set({
              userKey: userKey,
              name: user.name,
              phone: user.phone
            });
          });
        }
      });
    }(i));
  }

  snapshot.ref.update({processed: true});
}

module.exports = {
  processEvent: processEvent,
  processUser: processUser
};