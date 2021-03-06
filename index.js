var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.set("port", process.env.PORT || 3000);
var drawnPaths = [];
io.on('connection', function(socket) {
	console.log('a user connected');
	socket.emit("history", drawnPaths);
	socket.on('path', function(msg) {
		drawnPaths.push(msg);
		socket.broadcast.emit('path', msg);
	});
});

app.get("/", function(req, res){
	req.render("index.html");
})

app.get("/foo", function(req, res){
	res.send("This is the foo route")
})

http.listen(app.get("port"), function(){
	console.log("Listening on port 3000");
});