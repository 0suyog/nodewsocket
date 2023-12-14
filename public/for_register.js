var socket = io();

var register_form = document.getElementById("form");
var new_username = document.getElementById("username");
var new_password = document.getElementById("password");
var already_exist = document.getElementById("already_exist");
var special_char = document.getElementById("special_char");
register_form.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("register", new_username.value, new_password.value);
});

socket.on("created", () => {
  window.location.href = "/login";
});

socket.on("already_exist", () => {
  already_exist.style.display = "block";
});

socket.on("special_char", () => {
  console.log("wooosh");
  special_char.style.display = "block";
});
