var socket = io();
search_field = document.getElementById("uname_search");
var uname = localStorage.getItem("token");
var receiver = null;
search_field.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    socket.emit("receiver", search_field.value);
  }
});

socket.on("not_available", () => {
  alert("the user doesnt exist");
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
  chat_head = document.createElement("div");
  chat_head.classList.add("chat-heads");
  // chat_head.setAttribute("name", receiver);
  chat_head.name = rec;
  chat_head.innerHTML = `
    <div class="avatar">${rec[0]}</div>
    <div class="text-container">   
        <div class="text"><b>${rec}</b><span><i class="fa fa-check" ></i>12:03 AM</span></div>
        <div class="text"><b>this is supposed to be  recent message</b></div>
    </div>
    `;
  friends_sidebar.appendChild(chat_head);
  // !potention error incoming
  chat_head.onclick = () => {
    receiver = rec;
    socket.emit("talker", rec);
  };
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

var message_form = document.getElementById("form");
var msg_cont = document.getElementById("message-input");

socket.on("initial", (value) => {
  users_name_container.innerHTML = `${receiver}`;
  for (each in value) {
    let timestamp = each;
    let message = value[each]["message"];
    if (value[each]["sender"] == uname) {
      add_messages(message, uname, parseInt(timestamp), "sending");
    } else {
      add_messages(message, receiver, parseInt(timestamp), "receiving");
    }
    // add_messages(message, uname, parseInt(timestamp), "sending");
  }
  socket.emit("ready", (uname, receiver));
});

socket.on("ting", (msg, username, time) => {
  if (username == uname) {
    add_messages(msg, username, time, "sending");
  } else {
    add_messages(msg, username, time, "receiving");
  }
});
message_form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (msg_cont.value) {
    let time = new Date().getTime();
    socket.emit("msg_sent", uname, receiver, msg_cont.value, time);
    msg_cont.value = "";
  }
});
