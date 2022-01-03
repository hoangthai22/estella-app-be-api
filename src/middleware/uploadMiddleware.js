import cloudinary from "cloudinary";

export async function uploadImgMiddleware(req, res, next) {
  const fileStr = req.body.listImgDetail;
  try {
    let multiplePicturePromise = fileStr.map((img) =>
      cloudinary.v2.uploader.upload(img, {
        upload_preset: "images",
      })
    );
    let uploadResponse = await Promise.all(multiplePicturePromise);
    let result = [];
    uploadResponse.map((item) => {
      result = [...result, item.url];
    });
    req.body = { ...req.body, listImgDetail: result };
    next();
  } catch (err) {
    console.error({ err });
    res.status(500).json({ err: "Something went wrong" });
  }
}
