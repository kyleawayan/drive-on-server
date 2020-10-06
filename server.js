const { Socket } = require("socket.io-client");

const server = require("http").createServer();
const io = require("socket.io")(server);
io.on("connection", (client) => {
  console.log("connect");
  setInterval(() => {
    client.emit("event", "bruh");
  }, 1000);
  client.on("event", (data) => {
    console.log(data);
  });
  client.on("disconnect", () => {
    console.log("disconnected");
  });
});
server.listen(8000);
