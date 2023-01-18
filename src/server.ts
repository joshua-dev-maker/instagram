import express from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
config();

const server = express();
const mongoURI = process.env.mongoURI;

connect(mongoURI, (error) => {
  if (error) {
    return console.log(`Server Failed to connect to MongoDB`);
  }
  console.log(`Server connected to MongoDB`);
});
const PORT = process.env.PORT ?? 3300;

server.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
