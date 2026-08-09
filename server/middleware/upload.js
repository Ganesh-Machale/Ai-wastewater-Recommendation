const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration with safe random filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const randomHex = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(file.originalname).toLowerCase();
    // Sanitize extension - only allowed exts
    const safeExt = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.jpg';
    cb(null, `wqa_${Date.now()}_${randomHex}${safeExt}`);
  },
});

// File filter security validations
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp/;
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimeTypeValid = allowedMimeTypes.includes(file.mimetype);

  // Reject SVG, HTML, Executables, PHP, JS, etc.
  if (extName && mimeTypeValid) {
    return cb(null, true);
  } else {
    return cb(
      new Error('Security Error: Invalid file type. Only JPG, JPEG, PNG, and WEBP image files are allowed. SVG and executable files are strictly prohibited.'),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB maximum limit
  },
  fileFilter,
});

module.exports = upload;
