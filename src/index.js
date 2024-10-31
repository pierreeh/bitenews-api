import { server } from "./server.js";

async function App() {
  try {
    const app = await server();

    app.listen({ port: process.env.PORT, host: process.env.HOST });
  } catch (e) {
    throw new Error(e);
  }
}

App();
