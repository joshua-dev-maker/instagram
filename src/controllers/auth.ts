import { Request, Response } from "express";
import { pool } from "../config/database.config";
import { genSalt, hash, compare } from "bcrypt";
import { Incomingform } from "formidable";
import { config } from "dotenv";

config();

interface Auth {
  signup(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>>;
  signin(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>>;
}

export class AuthController implements Auth {
  async signup(req: Request, res: Response) {
    const form = new Incomingform();

    form.parse(req, (error, fields, files) => {
      const { username, password, email, fullname, bio, profile } = req.body;
    });
  }
}
