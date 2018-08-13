const http = require("http");
const server = http.createServer();
server.listen(3000, () => {
  console.log("Server started on port 3000");
});

// server = app.listen(3000, () => {
//   console.log(`Server started on port 3000 `);
// });

const io = require("socket.io")(server);

//Listen on every connection
io.on("connection", socket => {
  //default username
  socket.username = "anonymous";

  socket.on("change_username", data => {
    socket.username = data.username;
  });

  socket.on("new_message", data => {
    io.sockets.emit("new_message", {
      message: data.message,
      username: socket.username
    });
  });
});
