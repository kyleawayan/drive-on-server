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
  client.on("newuser", ({ room, username }) => {
    client.to(room).emit("newuser", username);
    console.log(room, username);
  });
  client.on("newlocation", ({ room, lat, lng }) => {
    client.to(room).emit("newlocation", { lat: lat, lng: lng });
    console.log(room, lat, lng);
  });
  client.on("disconnect", () => {});
});
server.listen(8000);
