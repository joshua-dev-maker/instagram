import cloudinary from "cloudinary";
import { config } from "dotenv";
config();

// const Cloudinary = cloudinary.v2;
// Cloudinary.config({
//   cloud_name: "joshua007",
//   api_key: "949623534646428",
//   api_secret: "0fc9HX_MSao0cO_1Elv9eVn2G-w",
// });

// export const FileUpload = async (file: string) => {
//   return new Promise((resolve) => {
//     Cloudinary.uploader.upload(file, { folder: "/instagram" }, (error, res) => {
//       if (error) {
//         return res.status(500).send({ msg: "Error uploading image" });
//       }
//       resolve(res.secure_url);
//     });
//   });
// };

// import cloudinary from "cloudinary";
// import { Files } from 'formidable';

const Cloudinary = cloudinary.v2;
Cloudinary.config({
  cloud_name: process.env.cloud_Name,
  api_key: process.env.cloud_api_key,
  api_secret: process.env.cloud_api_secret,
});

export const cloudinaryImageUploadMethod = async (file: string) => {
  return new Promise((resolve) => {
    Cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send("upload image error");
      resolve(res.secure_url);
    });
  });
};
