var socket = io(),
	name   = getQueryVariable("name") || "Anonymous",
	room   = getQueryVariable("room");

socket.on("connect", function() {
	console.log("connected to socket.io!");

	socket.emit("joinRoom", {
		name: name,
		room: room
	});
});

var roomName = document.getElementsByClassName("room-title")[0];
	
roomName.innerHTML = room;

socket.on("message", function(message) {
	var momentTimestamp = moment.utc(message.timestamp);
	console.log("New message:");
	console.log(message.text);

	var messages = document.getElementsByClassName("messages")[0],
		p        = document.createElement("p"),
		h1       = document.createElement("h5");
		li       = document.createElement("li");

	li.classList.add("list-group-item");

	h1.innerHTML = message.name;
	p.innerHTML = ("<b>" + momentTimestamp.local().format('h:mm a') + ":" + "</b>"+ " " + message.text);

	li.append(h1);
	li.append(p);

	messages.append(li);
    console.log('i got here');
});


var form = document.getElementById("message-form"),
	input = form.getElementsByTagName("input")[0];

form.addEventListener("submit", function(e) {
	e.preventDefault();

	socket.emit("message", {
		name: name,
		text: input.value
	});

	input.value = "";
});