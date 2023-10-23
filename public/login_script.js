var socket = io();
socket.on("received_credentials", () => {
  // window.location.replace("./messaging");
  // localStorage.socket = id;
  document.getElementById("login_interface").style.display = "none";
  document.getElementById("style").innerHTML = `
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    color:white;
    background-color:#182726;

  }

  .container {
    background-color:#182726;
    height: calc(100vh - 50px);
    position: relative;
    overflow-y: scroll;
  }
  .message_container {
    background-color:#394949;
    border-style: groove;
    border-color: black;
    transition: all 1s;
    width: fit-content;
    padding: 8px 10px 0px 10px;
    margin: 5px;
    clear: both;
    position: relative;
    max-width: 40vw;
  }
  .receiving {
    border-width: 0px 0px 0px 3px;
    border-radius: 0px 8px 8px 0px ;
    float: left;
  }
  .sending {
    border-radius: 8px 0px 0px 8px ;
    border-width: 0px 3px 0px 0px;
    float: right;
  }
  .username {
    color: white;
    margin-top:4px;
    margin-left:4px;
  }
  .receiving .colored_portion {
    padding: 5px;
    border-radius: 4px;
  }
  .sending .colored_portion {
    padding: 5px;
    border-radius: 4px;
  }
  .time {
    font-size: 12px;
    text-align: right;
  }

  #message-input {
    width: calc(
      95% - 90px
    );
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 5px;
    position: fixed;
    left: 10px;
    bottom: 5px;
    background-color: white;
  }

  #send-button {
    background-color: #42acd6;
    color: white;
    border: none;
    height: 45px;
    width: 90px;
    cursor: pointer;
    position: fixed;
    bottom: 8px;
    right: 12px;
    border-radius: 4px; 
    font-size:20px;
  }
  `;
  receiver = prompt("who you wanna talk to?").toLowerCase();

  // socket.emit("user_added", uname);
  socket.emit("receiver", receiver);
  // document.getElementById("register_interface").style.display = "none";
  // document.getElementById("wrong").style.display = "none";
  // document.getElementById("already_exist").style.display = "none";
  // document.getElementById("messaging_interface").style.display = "block";
});
socket.on("available", () => {
  document.getElementById("register_interface").style.display = "none";
  document.getElementById("wrong").style.display = "none";
  document.getElementById("already_exist").style.display = "none";
  document.getElementById("messaging_interface").style.display = "block";
  socket.emit("ready");
});

socket.on("wrong_credentials", () => {
  document.getElementById("login_interface").style.display = "none";
  document.getElementById("wrong").style.display = "block";
  register_button = document.getElementById("register");
  register_button.addEventListener("click", () => {
    console.log("kina vayena?");
    document.getElementById("wrong").style.display = "none";
    document.getElementById("register_interface").style.display = "block";
  });
});

var receiver = null;
var login_form = document.getElementById("login-form");
var username = document.getElementById("username");
var password = document.getElementById("password");
var uname = null;

login_form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("meow");
  uname = username.value;
  socket.emit("credentials", uname, password.value);
});

socket.on("not_available", () => {
  console.log("jhk");
  body = document.getElementById("body");
  body.innerHTML = "<h1>this human is not human search another human</h1>";
});

var register_form = document.getElementById("register_form");
var new_username = document.getElementById("new_username");
var new_password = document.getElementById("new_password");
register_form.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("register", new_username.value, new_password.value);
});
socket.on("already_exist", () => {
  document.getElementById("register_interface").style.display = "none";
  document.getElementById("already_exist").style.display = "block";
  document.getElementById("signin").addEventListener("click", () => {
    document.getElementById("already_exist").style.display = "none";
    document.getElementById("login_interface").style.display = "block";
  });
});

function num_to_day(num) {
  switch (num) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      return "Something is definitely worng";
  }
}

// format

{
  /* <div class="receiving message_container">
        <div class="username"><b>name</b></div>
        <div class="colored_portion">
          <div class="message">hello brother me is not fine</div>
          <div class="time">12:30 PM</div>
        </div>
      </div> */
}
function add_messages(message, username, timestamp, type) {
  var da = new Date(timestamp);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  var year = da.getFullYear();
  var month = String(da.getMonth() + 1).padStart(2, "0");
  var date = String(da.getDate()).padStart(2, "0");
  var day = num_to_day(da.getDay());
  var time = da.toLocaleTimeString(undefined, options);
  const chat_container = document.getElementById("container");
  var msg_container = document.createElement("div");
  msg_container.classList.add("message_container", `${type}`);
  msg_container.innerHTML = `<div class="username"><b>${username}</b></div>
  <div class="colored_portion">
    <div class="message">${message}</div>
    <div class="time">${year}/${month}/${date}, ${day} ${time}</div>
  </div>`;
  chat_container.appendChild(msg_container);
  chat_container.scrollTop = chat_container.scrollHeight;
}

var message_form = document.getElementById("message-form");
var msg_cont = document.getElementById("message-input");

socket.on("initial", (value) => {
  // let messages = value["messages"];
  // console.log(value)
  for (each in value) {
    let timestamp = each;
    let message = value[each]["message"];
    console.log(message);
    if (value[each]["sender"] == uname) {
      add_messages(message, uname, parseInt(timestamp), "sending");
    } else {
      add_messages(message, receiver, parseInt(timestamp), "receiving");
    }
    // add_messages(message, uname, parseInt(timestamp), "sending");
  }
});

socket.on("ting", (msg, username, time) => {
  console.log("meowoew");
  if (username == uname) {
    add_messages(msg, username, time, "sending");
  } else {
    add_messages(msg, username, time, "receiving");
  }
});
message_form.addEventListener("submit", (event) => {
  console.log("meow");
  event.preventDefault();
  if (msg_cont.value) {
    let time = new Date().getTime();
    // add_messages(msg_cont.value, uname, time, "sending");
    socket.emit("msg_sent", uname, receiver, msg_cont.value, time);
    msg_cont.value = "";
  }
});
