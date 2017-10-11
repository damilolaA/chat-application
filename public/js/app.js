var socket = io();

socket.on("connect", function() {
	console.log("connected to socket.io!");
});

socket.on("message", function(message) {
	var momentTimestamp = moment.utc(message.timestamp);
	console.log("New message:");
	console.log(message.text);

	var messages = document.getElementsByClassName("messages")[0],
		p        = document.createElement("p");
		strong   = document.createElement("strong");

	p.innerHTML = ("<strong>" + momentTimestamp.local().format('h:mm a') + ":" + "</strong>"+ " " + message.text);

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