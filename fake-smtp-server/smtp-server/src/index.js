const fakeMailServer = require("./smtp-server");
const WebuxSocket = require("@studiowebux/socket");
const express = require("express");
const app = express();
const server = require("http").createServer(app);

const Send = require("../actions/send");

const PORT = process.env.PORT || 3030;

async function LoadApp() {
  // loading the webux socket module
  const socketIO = new WebuxSocket(null, server);

  socketIO.Standalone().on("connect", (socket) => {
    console.log(`New User ${socket.id}`);

    socket.on("SendEmail", (fn) => {
      Send();
      socket.emit("emailSent");
      fn(true);
    });

    socket.on("disconnect", () => {
      console.log(`Bye Bye ${socket.id}`);
    });
  });

  fakeMailServer.startServer(socketIO.Standalone());

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

try {
  LoadApp();
} catch (e) {
  console.error(e);
  process.exit(2);
}
