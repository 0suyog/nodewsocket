const express = require("express");
const http = require("http");
const url = require("url");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { maxHttpBufferSize: 2e7 });
const config = require("./config");
const db = config.db;
const bucket = config.bucket;
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
const { getDownloadURL } = require("firebase-admin/storage");

var username = null;
var receiver = null;
var initial_messages = [];
var users = {};

function get_key(object, value) {
  return Object.keys(object).find((key) => object[key] == value);
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
    delete users[get_key(users, socket.id)];
    // console.log(users)
  });

  socket.on("register", (username_, password_) => {
    db.ref("users/" + username_ + "/password").once("value", (snapshot) => {
      console.log("no errors for now");
      if (!re.test(username_)) {
        if (snapshot.val() != null) {
          socket.emit("already_exist");
        } else {
          db.ref("users/" + username_ + "/password").set({
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
      db.ref("users/" + username + "/password").once("value", (snapshot) => {
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
    users[snap.uname] = snap.id;
    // console.log(snap)
    db.ref("friends/" + username).once("value", (snapshot) => {
      if (snapshot.val()) {
        socket.emit("initial_friends", Object.keys(snapshot.val()));
        console.log("this shouldnt be printed twice");
      }
    });
  });

  // this right here checks if username searched is friend or not and if not then it adds them as friend

  socket.on("receiver", (username_, receiver_) => {
    db.ref("users/" + receiver_ + "/password").once("value", (snapshot) => {
      if (snapshot.val() == null) {
        socket.emit("not_available");
      } else {
        db.ref("friends/" + username_ + "/" + receiver_).once(
          "value",
          (snapshot) => {
            if (snapshot.val() == null) {
              db.ref(`friends/${username_}`).update({
                [receiver_]: 1,
              });
              db.ref(`friends/${receiver_}`).update({
                [username_]: 1,
              });
              // console.log(us)
              socket.emit("available", receiver_);
              if (users[receiver_]) {
                socket.to(users[receiver_]).emit("available", username_);
              }
            }
          }
        );
      }
    });
  });

  // this is for handling the user selected by clicking in the side bar

  socket.on("talker", (uname, receiver_) => {
    receiver = receiver_;

    db.ref("users/" + username + "/" + receiver).once("value", (snapshot) => {
      if (snapshot.val() != null) {
        let value = snapshot.val();
        initial_messages.push(value);
      }
    });
    db.ref("users/" + receiver + "/" + uname).once("value", (snapshot) => {
      let value = snapshot.val();
      initial_messages.push(value);
      initial_messages = {
        ...initial_messages[0],
        ...initial_messages[1],
      };
      let temp = initial_messages;
      initial_messages = {};
      // this following shitty lines of code sort messages dont think abt it for 1/2 hr like you did just now
      let keys = Object.keys(temp);

      keys.sort((a, b) => {
        return a - b;
      });
      keys.forEach((data) => {
        initial_messages[data] = temp[data];
      });

      // sitty code finished
      socket.emit("initial", initial_messages);
      // console.log(initial_messages);

      initial_messages = [];
    });
  });

  socket.on("msg_sent", async (uname, receiver, msg, time, type) => {
    await db.ref("users/" + uname + "/" + receiver + "/" + time).set({
      message: msg,
      sender: uname,
      type: type,
    });
    // sessionname = [receiver, uname].sort()[0] + [receiver, uname].sort()[1];
    // await db.ref("sessions/" + sessionname).set({
    //   message: msg,
    //   uname: uname,
    //   time: { time: time },
    //   type: type,
    // });

    socket.emit("ting", msg, uname, receiver, time, type);
    if (users[receiver]) {
      socket.to(users[receiver]).emit("ting", msg, uname, receiver, time, type);
    }
  });
  // socket.on("ready", ({ uname, receiver }) => {
  //   let sessionname = [receiver, uname].sort()[0] + [receiver, uname].sort()[1];
  //   // console.log(uname, receiver);
  //   db.ref("sessions/" + sessionname).on("value", (snapshot) => {
  //     // console.log("\n\n", snapshot.val(), "\n\n");
  //     if (snapshot.val())
  //       socket.emit(
  //         "ting",
  //         snapshot.val().message,
  //         snapshot.val().uname,
  //         snapshot.val().time.time,
  //         snapshot.val().type
  //       );
  //   });
  // });

  socket.on("image_incoming", (uname, image, extension, callback) => {
    // bucket.ref().child("img.jpg").getDownloadURL().then((url) => {
    //   console.log(url);
    // })
    let time = new Date().getTime();
    bucket
      .file(`${uname}/${time}.${extension}`)
      .save(image)
      .then(() => {
        getDownloadURL(bucket.file(`${uname}/${time}.${extension}`)).then(
          (url) => {
            socket.emit("img_received", url);
          }
        );
      });
    callback("success");
  });

  // for typing
  socket.on("typing", (receiver,uname_) => {
    if (users[receiver]) {
      socket.to(users[receiver]).emit("is_typing",uname_);
    }
  });
  socket.on("not_typing", (receiver,uname_) => {
    if (users[receiver]) {
      socket.to(users[receiver]).emit("isnt_typing",uname_);
    }
  });
});

server.listen(3000, console.log("server listning on http://localhost:3000"));
