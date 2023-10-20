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


app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});



io.on("connect", (socket) => {
  socket.on("user_added", (uname) => {
    username = uname;
    console.log("a user connected");
    get(ref(config.db, "users/" + username)).then((snapshot) => {
      if (snapshot.val() != null) {
        socket.emit("initial", snapshot.val());
      }
    });
  });
  socket.on("receiver", (receiver_) => {
    receiver = receiver_;
    sessionname =
      [receiver, username].sort()[0] + [receiver, username].sort()[1];
    get(ref(config.db, "users/" + receiver)).then((snapshot) => {
      if (snapshot.val() == null) {
        socket.emit("not_available");
      }
      set(ref(config.db, "sessions/" + sessionname), {
        msg: "test",
        uname: "test",
        time: { time: 0 },
      });
    });
  });

  socket.on("msg_sent", (uname, receiver, msg, time) => {
    set(ref(config.db, "users/" + uname + "/" + receiver + "/" + time), {
      message: msg,
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
