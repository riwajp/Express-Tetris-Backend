const port = 5000;
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const cors = require("cors");
app.use(cors);

app.get("/", (req, res) => {
  res.send("hi");
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send-state", (name, matrix, score) => {
    console.log(score);
    socket.broadcast.emit("recieve-state", name, matrix, score);
  });
});

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
//====================================================================================

//====================================================================================
