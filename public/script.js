var socket = io();

uname = prompt("enter username");
window.scrollTo(0, document.body.scrollHeight);

socket.emit("user_added", uname);


function num_to_day(num) {
  switch (num) {
    case 0:
      return "Sun"
    case 1:
      return "Mon"
    case 2:
      return "Tue"
    case 3:
      return "Wed"
    case 4:
      return "Thu"
    case 5:
      return "Fri"
    case 6:
      return "Sat"
    default:
      return "Something is definitely worng"
  }
}


// format

{/* <div class="receiving message_container">
        <div class="username"><b>name</b></div>
        <div class="colored_portion">
          <div class="message">hello brother me is not fine</div>
          <div class="time">12:30 PM</div>
        </div>
      </div> */}
function add_messages(message, username, timestamp,type) {
  var da = new Date(timestamp);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  var year = da.getFullYear()
  var month = String(da.getMonth()+1).padStart(2,'0')
  var date = String(da.getDate()).padStart(2, '0')
  var day=num_to_day(da.getDay())
  var time=da.toLocaleTimeString(undefined, options)
  const chat_container = document.getElementById("container");
  var msg_container = document.createElement("div");
  msg_container.classList.add("message_container",`${type}`);
  msg_container.innerHTML = `<div class="username"><b>${username}</b></div>
  <div class="colored_portion">
    <div class="message">${message}</div>
    <div class="time">${year}/${month}/${date}, ${day} ${time}</div>
  </div>`
  chat_container.appendChild(msg_container)
  chat_container.scrollTop=chat_container.scrollHeight
  }


var form = document.getElementById("form");
var msg_cont = document.getElementById("message-input");

socket.on("initial", (value) => {
  let messages = value["messages"];

  for (each in messages) {
    let timestamp = each;
    let message = messages[each]["message"]
    add_messages(message,uname,parseInt(timestamp),"sending")
  }
})

socket.on("ting", (msg, username, time) => {
    if (username == uname) {
      add_messages(msg,username,time,"sending")
    }
    else {
        add_messages(msg,username,time,"receiving")   
    }
});
form.addEventListener("submit", (event) => {
  console.log("meow")
  event.preventDefault();
  if (msg_cont.value) {
    socket.emit("msg_sent", uname, msg_cont.value, new Date().getTime());
    msg_cont.value = "";
  }
});