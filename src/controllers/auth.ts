import { Request, Response } from "express";
import { pool } from "../config/database.config";
import { genSalt, hash, compare } from "bcrypt";
import { IncomingForm } from "formidable";
import { config } from "dotenv";
import { error } from "winston";
import { sign } from "jsonwebtoken";

config();
//Promise<Response<any, Record<string, any>>>;
interface Auth {
  signup(req: Request, res: Response): void;
  //   Promise<Response<any, Record<string, any>>>;
  //set both signin and signup to void to test if the file upload is working
  signin(req: Request, res: Response): void;
}

export class AuthController implements Auth {
  async signup(req: Request, res: Response) {
    // const form = new IncomingForm();

    // form.parse(request, async (error, fields, files: any) => {
    //   const { username, password, email, fullname, bio } = fields;
    //   const { profile } = files;

    //   const profile_url = await FileUpload(profile.path);
    //   return response.status(200).json({ profile_url });
    // });
    const { username, password, email, fullname, bio } = req.body;
    if (!username || !password || !email || !fullname || !bio) {
      return res.status(400).json({ message: "Fill required fields" });
    }
    const query = `INSERT INTO users (username, password, email, bio) VALUES{$1, $2, $3, $4, $5}`;
    // const hashedpassword = await hash(password, 10)
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    pool
      .query(query, [username, hashedPassword, email, fullname, bio])
      .then(() => {
        return res
          .status(201)
          .json({ message: "Account Created successfully" });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  }
  async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({ message: "All Fields are required" });
    }
    const query = `SELECT * FROM users WHERE email =$1`;
    const user = await (await pool.query(query, [email])).rows[0];
    if (!user) {
      return res
        .status(404)
        .json({ message: "Account doesn't exist. please signup" });
    }
    const hashedPassword = user.password;
    const isValidPass = await compare(password, hashedPassword);
    if (!isValidPass) {
      return res.status(403).json({ message: "Invalid password" });
    }
    const payload = {
      username: user.username,
      id: user.id,
    };
    const token = sign(payload, process.env.cookie_secret, {
      expiresIn: "365d",
    });
    return res.status(200).json({
      message: `hi ${user.fullname.toUpperCase()}, welcome back`,
      token,
    });
  }
}
