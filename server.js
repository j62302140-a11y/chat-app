const express=require("express");

const app=express();

const server=require("http").createServer(app);

const io=require("socket.io")(server);

app.use(
express.static("public")
);

io.on(
"connection",
(socket)=>{

socket.on(
"sendMessage",
(data)=>{

socket.broadcast.emit(
"receiveMessage",
data
);

socket.emit(
"delivered",
data.id
);

});

socket.on(
"seen",
(id)=>{

socket.broadcast.emit(
"seen",
id
);

});

});

server.listen(
process.env.PORT||3000
);
