var express = require("express"),
	app     = express(),
	http    = require("http").Server(app),
	io      = require("socket.io")(http),
	moment  = require("moment");

app.use(express.static(__dirname + '/public'));

io.on("connection", function(socket) {
	console.log("User connected via socket.io!");

	socket.on("message", function(message) {
		console.log("Message received: " + message.text);

		message.timestamp = moment().valueOf();
		io.emit("message", message);
	})

	socket.emit("message", {
		text: "Welcome to the chat application",
		timestamp: moment().valueOf()
	});
});

http.listen(3000, function() {
	console.log("server started");
});