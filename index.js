const port = 5000;

//====================================================================================

const io = require("socket.io")(port, {
  cors: {
    origin: ["https://riwaj-tetris.netlify.app", "http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send-state", (name, matrix, score) => {
    console.log(score);
    socket.broadcast.emit("recieve-state", name, matrix, score);
  });
});

//====================================================================================
