import { v2 as cloudinary } from 'cloudinary';
import type { RequestHandler } from 'express';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudUploader: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) throw new Error('No file found on request', { cause: { status: 400 } });

    const result = await cloudinary.uploader.upload(req.file.filepath, {
      folder: 'users'
    });

    req.body.image = result.secure_url;
    next();
  } catch (err) {
    next(err);
  }
};

export default cloudUploader;
