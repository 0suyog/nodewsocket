var socket = io();
const chat_container = document.getElementById("container");
search_field = document.getElementById("uname_search");
var uname = localStorage.getItem("token");
let permission = null;
Notification.requestPermission().then((res) => {
  permission = res;
  console.log(permission);
});
socket.once("connect", () => {
  socket.emit("messaging_place", { id: socket.id, uname: uname });
  console.log(socket.id);
});
var receiver = null;
search_field.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    socket.emit("receiver", uname, search_field.value);
  }
});

socket.on("not_available", () => {
  alert("the user doesnt exist");
});

function add_friends_in_sidebar(friend) {
  chat_head = document.createElement("div");
  chat_head.classList.add("chat-heads");
  chat_head.name = friend;
  chat_head.innerHTML = `
    <div class="avatar">${friend[0]}</div>
    <div class="text-container" id=${friend}>   
        <div class="text"><b>${friend}</b><span><i class="fa fa-check" ></i>12:03 AM</span></div>
        <div class="text"><b>this is supposed to be  recent message</b></div>
    </div>
    `;
  friends_sidebar.appendChild(chat_head);
  // if (receiver != friend) {
  chat_head.onclick = () => {
    if (receiver != friend) {
      receiver = friend;
      chat_container.innerHTML = "";
      console.log("clicked");
      socket.emit("talker", uname, friend);
    }
  };
}

function add_recent_messages_to_sidebar(
  msg,
  uname_,
  receiver_,
  timestamp,
  type
) {
  var da = new Date(timestamp);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  var time_ = da.toLocaleTimeString(undefined, options);
  let temp = null;
  if (uname_ == uname) {
    temp = receiver_;
  } else {
    temp = uname_;
  }
  frnd = document.getElementById(temp);
  if (type == "text") {
    frnd.innerHTML = `<div class="text"><b>${temp}</b><span><i class="fa fa-check" ></i>${time_}</span></div>
  <div class="text"><b>${msg.slice(0, 23)}</b></div>`;
  } else if (type == "img") {
    frnd.innerHTML = `<div class="text"><b>${temp}</b><span><i class="fa fa-check" ></i>${time_}</span></div>
    <img class="sidebar_img" src=${msg} />`;
  }
}

socket.on("initial_friends", (list) => {
  console.log("this shouldnt be printed twice");
  list.forEach((friend) => {
    add_friends_in_sidebar(friend);
  });
});

// sample
/*
<div class="chat-heads" id="clickable">
    <div class="avatar">S</div>
    <div class="text-container">   
        <div class="text"><b>Name</b><span><i class="fa fa-check" ></i>12:03 AM</span></div>
        <div class="text"><b>recent message</b></div>
    </div>
</div>*/
friends_sidebar = document.getElementById("friends");
users_name_container = document.getElementById("users_name");
socket.on("available", (rec) => {
  add_friends_in_sidebar(rec);
});
socket.on("friend_added", (fr) => {
  add_friends_in_sidebar(fr);
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
function add_messages(message, username, timestamp, type, format) {
  var da = new Date(timestamp);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  var year = da.getFullYear();
  var month = String(da.getMonth() + 1).padStart(2, "0");
  var date = String(da.getDate()).padStart(2, "0");
  var day = num_to_day(da.getDay());
  var time = da.toLocaleTimeString(undefined, options);
  var msg_container = document.createElement("div");
  msg_container.classList.add("message_container", `${type}`);
  if (format == "text") {
    msg_container.innerHTML = `<div class="username"><b>${username}</b></div>
    <div class="colored_portion">
      <div class="message">${message}</div>
      <div class="time">${year}/${month}/${date}, ${day} ${time}</div>
    </div>`;
  } else if (format == "img") {
    msg_container.innerHTML = `<div class="username"><b>${username}</b></div>
    <div class="colored_portion">
      <div class="message">
      <img
      class="image"
      src=${message} />
      </div>
      <div class="time">${year}/${month}/${date}, ${day} ${time}</div>
    </div>`;
  }
  chat_container.appendChild(msg_container);
  chat_container.scrollTop = chat_container.scrollHeight;
}

var message_form = document.getElementById("form");
var msg_cont = document.getElementById("message-input");
var image = document.getElementById("img");

socket.on("initial", (value) => {
  users_name_container.innerHTML = `${receiver}`;
  for (each in value) {
    let timestamp = each;
    let message = value[each]["message"];
    let format = value[each]["type"];
    if (value[each]["sender"] == uname) {
      add_messages(message, uname, parseInt(timestamp), "sending", format);
    } else {
      add_messages(message, receiver, parseInt(timestamp), "receiving", format);
    }
  }
  // socket.emit("ready", { username, receiver });
});

socket.on("ting", (msg, username, receiver_, time, type) => {
  console.log("meowwwwww");
  add_recent_messages_to_sidebar(msg, username, receiver_, time, type);
  console.log(receiver, receiver_);
  if (receiver == receiver_ || receiver == username) {
    if (username == uname) {
      add_messages(msg, username, time, "sending", type);
    } else {
      add_messages(msg, username, time, "receiving", type);
    }
  }
});
socket.on("img_received", (url) => {
  socket.emit("msg_sent", uname, receiver, url, new Date().getTime(), "img");
});

message_form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (receiver == null) {
    alert("select someone to send message first!!!");
    return;
  }
  if (msg_cont.value) {
    let time = new Date().getTime();
    socket.emit("msg_sent", uname, receiver, msg_cont.value, time, "text");
    msg_cont.value = "";
  }
  if (image.files.length) {
    extension = image.value.split(".").pop().toLowerCase();
    socket.emit(
      "image_incoming",
      uname,
      image.files[0],
      extension,
      (status) => {
        console.log(status);
      }
    );
    image.value = null;
  }
});
istyping = false;
// send that m typing
setInterval(() => {
  if (msg_cont.value && !istyping) {
    console.log("lekhiraxa");
    socket.emit("typing", receiver, uname);
    istyping = true;
  } else if (msg_cont.value == "" && istyping) {
    socket.emit("not_typing", receiver, uname);
    istyping = false;
  }
}, 3 * 1000);

socket.on("is_typing", (uname_) => {
  if (receiver == uname_) {
    console.log("arko ni lekhiraxa");
    document.getElementById("state").innerHTML = "typing...";
  }
});
socket.on("isnt_typing", (uname_) => {
  if (receiver == uname_) {
    document.getElementById("state").innerHTML = "not typing...";
  }
});
