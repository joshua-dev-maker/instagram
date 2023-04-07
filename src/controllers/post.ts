import { Request, Response } from "express";
import { MyRequest } from "@/interfaces/Request.interface";
import { pool } from "../config/database.config";
import { File, IncomingForm } from "formidable";
import { cloudinaryImageUploadMethod } from "@/utils/fileupload";
import { config } from "dotenv";

interface Post {
  create(request: MyRequest, response: Response): void;
}

export class PostController implements Post {
  create(request: any, response: Response) {
    const form = new IncomingForm();
    form.parse(request, async (error, fields, files) => {
      if (error) {
        return response
          .status(500)
          .json({ message: "Network error: failed to upload post" });
      }
      const token = request.token;
      const author = token.username;
      const { caption } = fields;

      const media_count = Object.keys(files).length;
      const media_keys = Object.keys(files);
      const media_urls = [];
      for (let i = 0; i < media_count; i++) {
        const file = (files[media_keys[i]] as File).filepath;
        const file_url = await cloudinaryImageUploadMethod(file);
        media_urls.push(file_url);
      }
      const query =
        "INSERT INTO posts (media, caption, author) VALUES ($1, $2, $3)";
      pool
        .query(query, [media_urls, caption, author])
        .then(() => {
          return response.status(201).json({ msg: "Post made" });
        })
        .catch((error) => {
          return response.status(500).json(error);
        });
    });
  }
  async getAllPosts(req: Request, res: Response) {
    const query = `SELECT * FROM posts INNER JOIN users ON posts.author = users.username`;
  }
}
