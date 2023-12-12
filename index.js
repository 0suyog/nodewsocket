const express = require("express");
const http = require("http");
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
} = require("firebase/database");

var username = null;
var receiver = null;
var initial_messages = [];

app.use(express.static("public"));

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login1.html");
});
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
})
app.get("/messaging", (req, res) => {
  res.sendFile(__dirname+"/public/messaging_ui.html")
})


io.on("connect", (socket) => {
  // socket.on("user_added", (uname) => {
  //   username = uname;
  //   console.log("a user connected");
  // });
  socket.on("register", (username_, password_) => {
    get(ref(config.db, "users/" + username_ + "/password")).then((snapshot) => {
      if (snapshot.val() != null) {
        socket.emit("already_exist");
      } else {
        set(ref(config.db, "users/" + username_ + "/password"), {
          password: password_,
        });
        socket.emit("created");
      }
    });
    // console.log("a new user has been created");
  });
  socket.on("credentials", (username_, password_) => {
    username = username_;
    var password = password_;
    get(ref(config.db, "users/" + username + "/password")).then((snapshot) => {
      if (snapshot.val() != null) {
        if (snapshot.val().password == password) {
          socket.emit("received_credentials",username);
          console.log("a user connected");
        } else {
          socket.emit("wrong_credentials");
        }
      } else {
        socket.emit("wrong_credentials");
      }
    });
    // console.log("a user connected")
    // socket.emit("received_credentials",socket.id)
  });
  socket.on("receiver", (receiver_) => {
    receiver = receiver_;
    sessionname =
      [receiver, username].sort()[0] + [receiver, username].sort()[1];
    get(ref(config.db, "users/" + receiver + "/password")).then((snapshot) => {
      if (snapshot.val() == null) {
        socket.emit("not_available");
      } else {
        socket.emit("available");
        // set(ref(config.db, "sessions/" + sessionname), {
        //   msg: "test",
        //   uname: "test",
        //   time: { time: 0 },
        // });
        get(ref(config.db, "users/" + username + "/" + receiver)).then(
          (snapshot) => {
            if (snapshot.val() != null) {
              let value = snapshot.val();
              initial_messages.push(value);
              // for (data in value) {
              //   initial_messages.push({ data: value[data] });
              // }
            }
          }
        );
        get(ref(config.db, "users/" + receiver + "/" + username)).then(
          (snapshot) => {
            let value = snapshot.val();
            initial_messages.push(value);
            initial_messages = {
              ...initial_messages[0],
              ...initial_messages[1],
            };
            let temp = initial_messages;
            initial_messages = {};
            Object.keys(temp)
              .sort((a, b) => {
                return a - b;
              })
              .forEach((data) => {
                initial_messages[data] = temp[data];
              });
            socket.emit("initial", initial_messages);
            // console.log(initial_messages);

            initial_messages = [];
          }
        );
      }
    });
  });

  socket.on("msg_sent", (uname, receiver, msg, time) => {
    set(ref(config.db, "users/" + uname + "/" + receiver + "/" + time), {
      message: msg,
      sender: uname,
    });
    sessionname = [receiver, uname].sort()[0] + [receiver, uname].sort()[1];
    set(ref(config.db, "sessions/" + sessionname), {
      message: msg,
      uname: uname,
      time: { time: time },
    });
  });
  socket.on("ready", () => {
    onChildChanged(ref(config.db, "sessions/" + sessionname + "/time"), () => {
      get(ref(config.db, "sessions/" + sessionname)).then((snapshot) => {
        // console.log(snapshot.val());
        socket.emit(
          "ting",
          snapshot.val().message,
          snapshot.val().uname,
          snapshot.val().time.time
        );
      });
    });
  });
});

server.listen(3000, console.log("server listning on port 3000"));
