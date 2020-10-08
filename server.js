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

  client.on("startnewlocation", (room) => {
    client.to(room).emit("startnewlocation", "starting");
  });

  client.on("newlocation", ({ room, lat, lng }) => {
    client.to(room).emit("newlocation", { lat: lat, lng: lng });
    console.log(room, lat, lng);
  });

  client.on("guesslocation", ({ room, username, distance, guess }) => {
    console.log(room, username, distance, guess);
    client

      .to(room)

      .emit("results", {
     
          username: username,
     
          distance: distance,
      
         typedguess: guess,
  
      });
  });

  client.on("disconnect", () => {});
});
server.listen(process.env.PORT || 8000, () =>
  console.log("Server is running...")
);
