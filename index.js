const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origins: ["http:localhost:3000", "https://riwaj-tetris.netlify.app"],
  },
});
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send-state", (name, matrix, score) => {
    console.log(score);
    socket.broadcast.emit("recieve-state", name, matrix, score);
  });
});

httpServer.listen(5000);

//====================================================================================

//====================================================================================
