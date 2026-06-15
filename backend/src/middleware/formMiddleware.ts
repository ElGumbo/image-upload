import formidable, { type File } from 'formidable';
import type { RequestHandler } from 'express';
import path from 'path';
import os from 'os';

const formMiddleware: RequestHandler = (req, res, next) => {
  const form = formidable({
    uploadDir: os.tmpdir(),
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    filename: (_name, ext, part) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      return `upload-${uniqueSuffix}${ext}`;
    },
    filter: ({ mimetype }) => {
      return !!mimetype && mimetype.startsWith('image/');
    }
  });

  form.parse(req, (err, fields, files) => {
    if (err) return next(err);
    req.body = fields;
    req.file = (files.image?.[0] ?? null) as File | null;
    next();
  });
};

export default formMiddleware;
