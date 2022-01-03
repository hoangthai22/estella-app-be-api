const { HttpStatusCode } = require("../utils/constants.js");

const uploadImg = require("./../uploads/multer.js");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploads = (file, folder) => {
    return new Promise((resolve) => {
      cloudinary.uploader.upload(
        file,
        (result) => {
          resolve({
            url: result.url,
            id: result.public_id,
          });
        },
        {
          resource_type: "auto",
          folder: folder,
        }
      );
    });
  };
  
const upload = async (req, res) => {
  try {
    uploadImg.array("image"),
      async (req, res) => {
        const uploader = async (path) => await uploads(path, "images");
        if (req.method === "POST") {
          const urls = [];
          const files = req.files;
          for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path);

            urls.push(newPath);
            fs.unlinkSync(path);
          }
          res.status(200).json({
            message: "Successilly",
            data: urls,
          });
        } else {
          res.status(405).json({
            error: "Fail",
          });
        }
      };
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

module.exports = { upload };
