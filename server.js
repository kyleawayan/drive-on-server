const { Socket } = require("socket.io-client");

const server = require("http").createServer();
const io = require("socket.io")(server);
io.on("connection", (client) => {
  console.log("connect");
  client.on("event", (data) => {
    console.log(data);
  });
  client.on("disconnect", () => {
    console.log("disconnected");
  });
});
server.listen(8000);
