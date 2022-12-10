const port = 5000;
const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

const io = require("socket.io")(http, {
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

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
//====================================================================================

//====================================================================================
