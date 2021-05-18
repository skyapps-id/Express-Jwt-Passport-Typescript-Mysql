import "reflect-metadata";
import { createConnection } from "typeorm";
import { app } from './app'
import dbConfig from "./config/database";

const PORT = process.env.PORT || 8000;

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });