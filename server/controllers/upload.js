import multer from "multer";
import path from "path";
import fs from "fs";
import { errorResponse, successResponse } from "../utils/successResponse.js";

const uploadDir = path.join(process.cwd(), "uploads", "bikes");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer setup
// Configuring storage, file naming, limits, and file filtering

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/"))
      return cb(new Error("Only image files are allowed"));
    cb(null, true);
  },
});

export const uploadImage = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err)
      return errorResponse(res, err.message || "Upload failed", err, 400);
    if (!req.file) return errorResponse(res, "No file uploaded", null, 400);

    const relativePath = path.join("uploads", "bikes", req.file.filename);
    return successResponse(res, "File uploaded", { path: relativePath }, 201);
  });
};
