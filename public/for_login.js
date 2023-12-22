var socket = io();

var form = document.getElementById("form");
var username = document.getElementById("username");
var password = document.getElementById("password");
var wrong = document.getElementById("wrong_creds");
var new_user = document.getElementById("new_user");
var special_char = document.getElementById("special_char");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("meow");
  socket.emit("credentials", username.value, password.value);
});

socket.on("received_credentials", (uname) => {
  localStorage.setItem("token", uname);
  window.location.href = "/messaging";
});

socket.on("wrong_credentials", () => {
  console.log(wrong.style.display);
  wrong.style.display = "block";
});

socket.on("special_char", () => {
  console.log("wooosh");
  special_char.style.display = "block";
});
