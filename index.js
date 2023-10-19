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
const date = new Date();

var username = null;

var temp = 0;

app.use(express.static("public"));

var newmessage = false;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const latest_time_ref = ref(config.db, "latest_msg/time");
const latest_msg_ref = ref(config.db, "latest_msg");

io.on("connect", (socket) => {
  socket.on("user_added", (uname) => {
    username = uname;
    console.log("a user connected");
    // get(ref(config.db, "users/").orderByChild()).then((snapshot) => {
    //   console.log(snapshot.val());
    // });
    // get(query(ref(config.db, "users/"), orderByKey())).then((snapshot) => {
    //   var a = snapshot.val();
    //   // console.log(typeof a);
    //   for (let b in a) {
    //     console.log(b);
    //   }
    // });
    get(ref(config.db, "users/" + username)).then((snapshot) => {
      if (snapshot.val() != null) {
        socket.emit("initial",snapshot.val())
      }
    });
  });

  socket.on("msg_sent", (uname, msg, time) => {
    set(ref(config.db, "users/" + username + "/messages/" + time), {
      message: msg,
    });
    set(latest_msg_ref, { message: msg, uname: uname, time: { time: time } });
  });
  onChildChanged(latest_time_ref, () => {
    get(latest_msg_ref).then((snapshot) => {
      socket.emit(
        "ting",
        snapshot.val().message,
        snapshot.val().uname,
        snapshot.val().time.time
      );
    });
  });
});

server.listen(3000, console.log("server listning on port 3000"));
