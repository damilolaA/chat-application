var socket = io();

socket.on("connect", function() {
	console.log("connected to socket.io!");
});

socket.on("message", function(message) {
	console.log("New message:");
	console.log(message.text);

	var messages = document.getElementsByClassName("messages")[0],
		p        = document.createElement("p");

	p.innerHTML = message.text;
	messages.append(p);
});

var form = document.getElementById("message-form"),
	input = form.getElementsByTagName("input")[0];

form.addEventListener("submit", function(e) {
	e.preventDefault();

	socket.emit("message", {
		text: input.value
	});

	input.value = "";
});