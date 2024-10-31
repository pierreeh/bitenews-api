import express from "express";

export async function server() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  return app;
}
