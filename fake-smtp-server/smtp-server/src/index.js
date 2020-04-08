const fakeMailServer = require("./smtp-server");
const webuxSocket = require("@studiowebux/socket");
const express = require("express");
const app = express();
const server = require("http").createServer(app);

const PORT = process.env.PORT || 3030;

async function LoadApp() {
  // loading the webux socket module
  const io = await webuxSocket(null, server, console);
  fakeMailServer.startServer(io);

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
