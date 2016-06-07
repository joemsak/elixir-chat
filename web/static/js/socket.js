import {Socket} from "phoenix"

let username = "";

username = prompt("Please enter your name:");

let socket = new Socket("/socket", {params: {username: username, token: window.userToken}})

socket.connect()

let channel = socket.channel("rooms:lobby", {})

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

let messages = document.getElementById("messages");
let input = document.getElementById("input");

input.addEventListener("keyup", function(e) {
  if (e.keyCode != 13) {
    return
  }

  channel.push("msg", {body: input.value});
  input.value = "";
});

channel.on("msg", function(message) {
  messages.innerHTML += `<div class="message">${message.username} says: ${message.body}</div>`;
});

export default socket
