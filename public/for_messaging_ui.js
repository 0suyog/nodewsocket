var socket = io();
var uname = localStorage.getItem("token");
var receiver = null;
socket.once("connect", () => {
  socket.emit("messaging_place", { id: socket.id, uname: uname });
  console.log(document.getElementById("profile_img").src);
  document.getElementById(
    "profile_img"
  ).src = `https://robohash.org/${uname}?set=set2`;
  console.log(document.getElementById("profile_img").src);
});
const search_field = document.getElementById("uname_search");
const parent_message_container = document.getElementById("message_view");
const top_uname = document.getElementById("top_uname");
const message_field = document.getElementById("messagebox");
search_field.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    socket.emit("receiver", uname, search_field.value);
  }
});

message_field.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (receiver) {
      if (message_field.value) {
        let time = new Date().getTime();
        socket.emit(
          "msg_sent",
          uname,
          receiver,
          message_field.value,
          time,
          "text"
        );
        message_field.value = "";
        socket.emit("not_typing", receiver, uname);
      }
    } else {
      alert("noone to send message");
    }
  }
});

setInterval(() => {
  if (message_field.value) {
    socket.emit("typing", receiver, uname);
  } else {
    socket.emit("not_typing", receiver, uname);
  }
}, 3000);

{
  `format=
    <div class="totalcontainersend">
    <div class="msgcontainersend">
        <div class="msgsend">Test message</div>
        <div class="timestamp1"><i class="fa-regular fa-clock"></i>11:58</div>
    </div>
</div>
    `;
}

function add_messages(message, username, timestamp, type, format) {
  var da = new Date(timestamp);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  var year = da.getFullYear();
  var month = String(da.getMonth() + 1).padStart(2, "0");
  var date = String(da.getDate()).padStart(2, "0");
  //   var day = num_to_day(da.getDay());
  var time = da.toLocaleTimeString(undefined, options);
  var total_container = document.createElement("div");
  var msg_container = document.createElement("div");
  var msg_div = document.createElement("div");
  if (type == "sending") {
    total_container.classList.add("totalcontainersend");
    msg_container.classList.add("msgcontainersend");
    msg_div.classList.add("msgsend");
  } else if (type == "receiving") {
    total_container.classList.add("totalcontainerrec");
    msg_container.classList.add("msgcontainerrec");
    msg_div.classList.add("msgrec");
  }
  var time_div = document.createElement("div");
  time_div.classList.add("timestamp1");
  time_div.innerHTML = `<i class="fa-regular fa-clock"></i>${time}`;
  msg_div.innerHTML = message;
  msg_container.appendChild(msg_div);
  msg_container.appendChild(time_div);
  total_container.appendChild(msg_container);
  parent_message_container.appendChild(total_container);
  parent_message_container.scrollTop = parent_message_container.scrollHeight;
}

{
  `<div class="totalcontainerrec" id='typing'>
<div class="msgcontainerrec">
  <div class="msgrec msgrectyp">
    <span id="first">.</span><span id="sec">.</span
    ><span id="third">.</span>
  </div>
  <div class="timestamp1">
    <i class="fa-regular fa-clock"></i>11:58
  </div>
</div>`;
}

function typing(state) {
  console.log(state);
  if (state && document.getElementById("typing") == null) {
    let typing_ = document.createElement("div");
    typing_.classList.add("totalcontainerrec");
    typing_.id = "typing";
    typing_.innerHTML = `<div class="msgcontainerrec">
    <div class="msgrec msgrectyp">
      <span id="first">.</span><span id="sec">.</span
      ><span id="third">.</span>
    </div>
    `;
    parent_message_container.appendChild(typing_);
    parent_message_container.scrollTop = parent_message_container.scrollHeight;
  } else if (!state && document.getElementById("typing") != null) {
    parent_message_container.removeChild(document.getElementById("typing"));
  }
}

{
  `<a href="#" id="david">
<div class="model1">
  <div class="useravatar">
    <div class="status">
      <span class="statusicon"></span>
      <img
        src="https://themesbrand.com/chatvia/layouts/assets/images/users/avatar-3.jpg"
        id="image1"
        alt="" />
    </div>
  </div>
  <div class="uname_msg">
    <div class="username">David Gogins</div>
    <div class="message">
      You: I am not racist, youre ugly what can i do about that ?
      please stop calling me a racist ok ?
    </div>
    <div class="timestamp">12 min</div>
    <div class="unread">
      <span>2</span>
    </div>
  </div>
</div>
</a>`;
}
const users = document.getElementById("sidebar_users");
function add_friends_in_sidebar(friend) {
  child_elem = document.createElement("a");
  child_elem.id = friend;
  child_elem.name = friend;
  child_elem.href = "#";
  child_elem.innerHTML = `<div class="model1">
  <div class="useravatar">
    <div class="status">
      <span class="statusicon" id="statusicon" ></span>
      <img
        src="https://robohash.org/${friend}?set=set2"
        id="image1"
        alt="" />
    </div>
  </div>
  <div class="uname_msg">
    <div class="username">${friend}</div>
    <div class="message">
      Test message
    </div>
    <div class="timestamp">12 min</div>
    <div class="unread">
      <span>2</span>
    </div>
  </div>
</div>`;
  child_elem.onclick = () => {
    clicking_user();
    if (receiver != friend) {
      receiver = friend;
      top_uname.innerHTML = receiver;
      document.getElementById(
        "topbar_profile_img"
      ).src = `https://robohash.org/${receiver}?set=set2`;
      document.getElementById("topbarstatusicon").style.backgroundColor =
        document.querySelector(
          `#${friend} .model1 .useravatar .status .statusicon`
        ).style.backgroundColor;
      parent_message_container.innerHTML = "";
      socket.emit("talker", uname, receiver);
    }
  };
  users.appendChild(child_elem);
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
  // let time_=Date.now()-timestamp
  let temp = null;
  if (uname_ == uname) {
    temp = receiver_;
  } else {
    temp = uname_;
  }
  user = document.getElementById(temp);
  messaging_place = document.querySelector(
    `#${temp} .model1 .uname_msg .message`
  );
  const time = document.querySelector(`#${temp} .model1 .uname_msg .timestamp`);
  time.innerHTML = time_;
  if (type == "text") {
    // time_place.innerHTML = time_
    messaging_place.innerHTML = `${uname_}: ${msg}`;
  } else if (type == "img") {
    frnd.innerHTML = `<div class="text"><b>${temp}</b><div id="status" class="offline"></div><span><i class="fa fa-check" ></i>${time_}</span></div>
    <img class="sidebar_img" src=${msg} />`;
  }
}

// from here on we start with socket events

socket.on("not_available", () => {
  alert("the user doesnt exist");
  receiver = null;
});

socket.on("initial_messages", (value) => {
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
});

socket.on("ting", (msg, username, receiver_, time, type) => {
  if (receiver == receiver_ || receiver == username) {
    if (username == uname) {
      add_messages(msg, username, time, "sending", type);
    } else {
      add_messages(msg, username, time, "receiving", type);
    }
  }
  add_recent_messages_to_sidebar(msg, username, receiver_, time, type);
});

socket.on("initial_friends", (list) => {
  console.log("this shouldnt be printed twice");
  list.forEach((friend) => {
    add_friends_in_sidebar(friend);
  });
});

socket.on("is_typing", (uname_) => {
  if (receiver == uname_) {
    typing(true);
    // meow();
  }
});
socket.on("isnt_typing", (uname_) => {
  if (receiver == uname_) {
    typing(false);
  }
});

socket.on("online", (frn) => {
  let status = document.querySelector(
    `#${frn} .model1 .useravatar .status .statusicon`
  );
  status.style.backgroundColor = "#06d6a0";
  if (receiver == frn) {
    document.getElementById("topbarstatusicon").style.backgroundColor =
      "#06d6a0";
  }
});
socket.on("offline", (frn) => {
  let status = document.querySelector(
    `#${frn} .model1 .useravatar .status .statusicon`
  );
  status.style.backgroundColor = "#95A4A7";
  if (receiver == frn) {
    document.getElementById("topbarstatusicon").style.backgroundColor =
      "#95A4A7";
  }
});
