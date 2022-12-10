const port = 5000;
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["https://riwaj-tetris.netlify.app", "http://localhost:3000"],
  },
  // ...
});
//====================================================================================

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send-state", (name, matrix, score) => {
    console.log(score);
    socket.broadcast.emit("recieve-state", name, matrix, score);
  });
});
httpServer.listen(port);

//====================================================================================
