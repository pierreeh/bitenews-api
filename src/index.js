require("dotenv").config();

const server = require("./server");

function app() {
  const app = server();
  app.listen({ port: process.env.PORT, host: process.env.HOST });
}

app();
