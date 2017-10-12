var express = require("express"),
	app     = express(),
	http    = require("http").Server(app),
	io      = require("socket.io")(http),
	moment  = require("moment");

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on("connection", function(socket) {
	console.log("User connected via socket.io!");

	socket.on("joinRoom", function(req) {
		clientInfo[socket.id] = req;

		socket.join(req.room);
		socket.broadcast.to(req.room).emit("message", {
			name: "System",
			text: req.name + " has joined room!",
			timestamp: moment().valueOf()
		});
	});

	socket.on("disconnect", function() {
		var userData = clientInfo[socket.id];

		if(userData !== undefined) {
			socket.leave(userData.room)
			io.to(userData.room).emit("message", {
				name: "System",
				text: userData.name + " has left!",
				timestamp: moment().valueOf()
			});
		};
	})

	socket.on("message", function(message) {
		console.log("Message received: " + message.text);

		message.timestamp = moment().valueOf();
		io.to(clientInfo[socket.id].room).emit("message", message);
	})

	socket.emit("message", {
		name: "System",
		text: "Welcome to the chat application",
		timestamp: moment().valueOf()
	});
});

http.listen(process.env.PORT || 3000, function() {
	console.log("server started");
});