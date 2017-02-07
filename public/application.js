"use strict";

//represents communication channel between client and server
//on the client side, the socket object is the representation to the client's connection to the server
const socket = io();

const chatInput = document.querySelector('.chat-form input[type=text]');

chatInput.addEventListener("keypress", event => {
  //if user doesn't hit enter, just ignore
  if(event.keyCode !== 13)
    return;

  //prevent browser from doing something like wanting to submit a form
  event.preventDefault();

  //if they just typed in whitespace characters or something, then do nothing. don't process event handler any further
  const text = event.target.value.trim();
  if(text.length === 0)
    return;

  //emit an object usually if you want to add some metadata
  //best practice might be to preemptively add it to chat list first so it looks like it immediately arrived
  //socket.emit is kind of the opposite of socket.on, so socket.on will handle anything from socket.emit on the server side
  socket.emit("chat:add", {
    message: text
  });

  //clear out textbox
  event.target.value = '';
});

//grab chat list from document
const chatList = document.querySelector('.chat-list ul');

socket.on("chat:added", data => {
  //dynamically create li tag to represent message on page
  const messageElement = document.createElement('li');
  messageElement.innerText = data.message;
  chatList.appendChild(messageElement);
  chatList.scrollTop = chatList.scrollHeight;
});
