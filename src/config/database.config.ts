import { Pool } from "pg";
import { config } from "dotenv";
config();

export const pool = new Pool({
  user: process.env.user,
  host: "localhost",
  database: "insta-clone",
  password: process.env.password,
  port: 5432,
});

// type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "postgres",
//   password: "Pikalord01!",
// database: "learngrazac",
