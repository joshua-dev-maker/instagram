import cloudinary from "cloudinary";
import { config } from "dotenv";
config();

const Cloudinary = cloudinary.v2;
Cloudinary.config({
  cloudinary_Name: process.env.cloudinary_Name,
  cloudinary_API_KEY: process.env.cloudinary_API_KEY,
  cloudinary_API_SECRET: process.env.cloudinary_API_SECRET,
});

export const FileUpload = async (file: string) => {
  return new Promise((resolve) => {
    Cloudinary.uploader.upload(file, { folder: "/instagram" }, (error, res) => {
      if (error) {
        return res.status(500).json({ msg: "Error uploading image" });
      }
      resolve(res.secure_url);
    });
  });
};
