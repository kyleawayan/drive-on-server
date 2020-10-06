const { Socket } = require("socket.io-client");

const server = require("http").createServer();
const io = require("socket.io")(server);
io.on("connection", (client) => {
  console.log("connected");
  client.on("room", function (room) {
    console.log(room);
    client.join(room);
    client.in(room).emit("event", "someone joined");
  });
  client.on("event", (data) => {
    console.log(data);
  });
  client.on("disconnect", () => {});
});
server.listen(8000);
