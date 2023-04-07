import express from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import { pool } from "./config/database.config";
import AuthRouter from "./routes/auth.route";
config();

const server = express();

server.use(AuthRouter);
const mongoURI = process.env.mongoURI;

connect(mongoURI, (error) => {
  if (error) {
    return console.log(`Server Failed to connect to MongoDB`);
  }
  console.log(`Server connected to MongoDB`);
});
pool;
const PORT = process.env.PORT ?? 3300;

server.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
