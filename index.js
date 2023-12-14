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
} = require("firebase/database");
const { type } = require("os");

var username = null;
var receiver = null;
var initial_messages = [];

// dont understand this? whatever this is search regex in js or go to regexr.com
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
  // socket.on("user_added", (uname) => {
  //   username = uname;
  //   console.log("a user connected");
  // });
  socket.on("register", (username_, password_) => {
    get(ref(config.db, "users/" + username_ + "/password")).then((snapshot) => {
      if (!re.test(username_)) {
        if (snapshot.val() != null) {
          socket.emit("already_exist");
        } else {
          set(ref(config.db, "users/" + username_ + "/password"), {
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
      get(ref(config.db, "users/" + username + "/password")).then(
        (snapshot) => {
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
        }
      );
    } else {
      socket.emit("special_char");
    }
    // console.log("a user connected")
    // socket.emit("received_credentials",socket.id)
  });

  // this signal is for knowing that the messaging page has been reached and sends friends list to load for first time
  socket.on("messaging_place", () => {
    get(ref(config.db, "users/" + username + "/friends")).then((snapshot) => {
      socket.emit("initial_friends", Object.keys(snapshot.val()));
    });
  });

  // this right here checks if username searched is friend or not and if not then it adds them as friend

  socket.on("receiver", (receiver_) => {
    get(ref(config.db, "users/" + receiver_ + "/password")).then((snapshot) => {
      if (snapshot.val() == null) {
        socket.emit("not_available");
      } else {
        // receiver = reciever_;
        get(ref(config.db, "users/" + username + "/friends/" + receiver_)).then(
          (snapshot) => {
            if (snapshot.val() == null) {
              set(ref(config.db, "users/" + username + "/friends"), {
                [receiver_]: 1,
              });
              socket.emit("available", receiver_);
            }
          }
        );
      }
    });
  });

  // this is for handling the user selected by clicking in the side bar

  socket.on("talker", (receiver_) => {
    receiver = receiver_;
    sessionname =
      [receiver, username].sort()[0] + [receiver, username].sort()[1];

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

        //! this following shitty lines of code sort messages dont think abt it for 1/2 hr like you did just now

        Object.keys(temp)
          .sort((a, b) => {
            return a - b;
          })
          .forEach((data) => {
            initial_messages[data] = temp[data];
          });

        //! sitty code finished

        socket.emit("initial", initial_messages);
        // console.log(initial_messages);

        initial_messages = [];
      }
    );
  });
  // socket.on("receiver", (receiver_) => {
  //   receiver = receiver_;
  //   sessionname =
  //     [receiver, username].sort()[0] + [receiver, username].sort()[1];

  //   // TODO add some kind of id so i dont have to use password to see if it exists or not

  //   get(ref(config.db, "users/" + receiver + "/password")).then((snapshot) => {
  //     if (snapshot.val() == null) {
  //       socket.emit("not_available");
  //     } else {
  //       socket.emit("available");
  //       console.log("well its getting to here at least");
  //       set(ref(config.db, "users/" + username + "/freinds"), {
  //         "uname":receiver   //TODO soon to be replaced by the id someday surely
  //       });
  //       get(ref(config.db, "users/" + username + "/" + receiver)).then(
  //         (snapshot) => {
  //           if (snapshot.val() != null) {
  //             let value = snapshot.val();
  //             initial_messages.push(value);
  //             // for (data in value) {
  //             //   initial_messages.push({ data: value[data] });
  //             // }
  //           }
  //         }
  //       );
  //       get(ref(config.db, "users/" + receiver + "/" + username)).then(
  //         (snapshot) => {
  //           let value = snapshot.val();
  //           initial_messages.push(value);
  //           initial_messages = {
  //             ...initial_messages[0],
  //             ...initial_messages[1],
  //           };
  //           let temp = initial_messages;
  //           initial_messages = {};

  //           //! this following shitty lines of code sort messages dont think abt it for 1/2 hr like you did just now

  //           Object.keys(temp)
  //             .sort((a, b) => {
  //               return a - b;
  //             })
  //             .forEach((data) => {
  //               initial_messages[data] = temp[data];
  //             });

  //           //! sitty code finished

  //           socket.emit("initial", initial_messages);
  //           // console.log(initial_messages);

  //           initial_messages = [];
  //         }
  //       );
  //     }
  //   });
  // });

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
  socket.on("ready", (uname, receiver) => {
    sessionname = [receiver, uname].sort()[0] + [receiver, uname].sort()[1];
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
