const express = require("express");
const http = require("http");
const url = require("url");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const config = require("./config");
const {
  ref,
  set,
  onChildAdded,
  onChildChanged,
  get,
  onValue,
  update,
  query,
  orderByKey,
} = require("firebase-admin/database");
const { type } = require("os");
const { disconnect } = require("process");

var username = null;
var receiver = null;
var initial_messages = [];
var users = {}

function get_key(object,value) {
  return Object.keys(object).find(key=>object[key]==value)
}

// dont understand this? whatever this is, search regex in js or go to regexr.com
let re = /[\[\]`~!@#$%^&*( )_\-+={}\|\\:;"'<,>.?/]/;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});
app.get("/messaging", (req, res) => {
  res.sendFile(__dirname + "/public/messaging_ui.html");
});

app.get("*", (req, res) => {
  res.send("404 NOT FOUND!!!");
});

io.on("connect", (socket) => {
  socket.on("disconnect", () => {
    delete users[get_key(users, socket.id)]
    // console.log(users)
  })

  socket.on("register", (username_, password_) => {
    config.db
      .ref("users/" + username_ + "/password")
      .once("value", (snapshot) => {
        console.log("no errors for now");
        if (!re.test(username_)) {
          if (snapshot.val() != null) {
            socket.emit("already_exist");
          } else {
            config.db.ref("users/" + username_ + "/password").set({
              password: password_,
            });
            socket.emit("created");
          }
        } else {
          socket.emit("special_char");
        }
      });
    // console.log("a new user has been created");
  });
  socket.on("credentials", (username_, password_) => {
    if (!re.test(username_)) {
      username = username_;
      var password = password_;
      config.db
        .ref("users/" + username + "/password")
        .once("value", (snapshot) => {
          if (snapshot.val() != null) {
            if (snapshot.val().password == password) {
              socket.emit("received_credentials", username);
              console.log("a user connected");
            } else {
              socket.emit("wrong_credentials");
            }
          } else {
            socket.emit("wrong_credentials");
          }
        });
    } else {
      socket.emit("special_char");
    }
  });

  // this signal is for knowing that the messaging page has been reached and sends friends list to load for first time
  socket.on("messaging_place", (snap) => {
    users[snap.uname ]= snap.id;
    // console.log(snap)
    config.db.ref("friends/" + username).once("value", (snapshot) => {
      if (snapshot.val()) {
        socket.emit("initial_friends", Object.keys(snapshot.val()));
      }
    });
  });

  // this right here checks if username searched is friend or not and if not then it adds them as friend

  socket.on("receiver", (receiver_) => {
    config.db
      .ref("users/" + receiver_ + "/password")
      .once("value", (snapshot) => {
        if (snapshot.val() == null) {
          socket.emit("not_available");
        } else {
          config.db
            .ref("friends/" + username + "/" + receiver_)
            .once("value", (snapshot) => {
              if (snapshot.val() == null) {
                config.db.ref(`friends/${username}`).update({
                  [receiver_]: 1,
                });
                config.db.ref(`friends/${receiver_}`).update({
                  [username]: 1,
                });
                // console.log(us)
                io.to(users[username]).emit("available", receiver_);
                if (users[receiver_]) {
                  io.to(users[receiver_]).emit("available",username)
                }
              }
            });
        }
      });
  });

  // this is for handling the user selected by clicking in the side bar

  socket.on("talker", (receiver_) => {
    if (receiver != receiver_) {
      receiver = receiver_;
      sessionname =
        [receiver, username].sort()[0] + [receiver, username].sort()[1];

      config.db
        .ref("users/" + username + "/" + receiver)
        .once("value", (snapshot) => {
          if (snapshot.val() != null) {
            let value = snapshot.val();
            initial_messages.push(value);
            // for (data in value) {
            //   initial_messages.push({ data: value[data] });
            // }
          }
        });
      config.db
        .ref("users/" + receiver + "/" + username)
        .once("value", (snapshot) => {
          let value = snapshot.val();
          initial_messages.push(value);
          initial_messages = {
            ...initial_messages[0],
            ...initial_messages[1],
          };
          let temp = initial_messages;
          initial_messages = {};

          // this following shitty lines of code sort messages dont think abt it for 1/2 hr like you did just now

          Object.keys(temp)
            .sort((a, b) => {
              return a - b;
            })
            .forEach((data) => {
              initial_messages[data] = temp[data];
            });

          // sitty code finished

          socket.emit("initial", initial_messages);
          // console.log(initial_messages);

          initial_messages = [];
        });
    }
  });

  socket.on("msg_sent", (uname, receiver, msg, time) => {
    config.db.ref("users/" + uname + "/" + receiver + "/" + time).set({
      message: msg,
      sender: uname,
    });
    sessionname = [receiver, uname].sort()[0] + [receiver, uname].sort()[1];
    config.db.ref("sessions/" + sessionname).set({
      message: msg,
      uname: uname,
      time: { time: time },
    });
    console.log("session should be updated")
  });
  socket.on("ready", ({ uname, receiver }) => {
    let sessionname = [receiver, uname].sort()[0] + [receiver, uname].sort()[1];
    // console.log(uname, receiver);
    config.db.ref("sessions/" + sessionname).on("value", (snapshot) => {
      // console.log("\n\n", snapshot.val(), "\n\n");
      if (snapshot.val())
        socket.emit(
          "ting",
          snapshot.val().message,
          snapshot.val().uname,
          snapshot.val().time.time
        );
    });
  });
});

server.listen(3000, console.log("server listning on http://localhost:3000"));
