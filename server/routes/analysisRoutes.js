const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
  analyzeParameters,
  getParameterAnalyses,
  getParameterAnalysisById,
  analyzeImage,
  getImageAnalyses,
  getImageAnalysisById,
  getHistory,
} = require('../controllers/analysisController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Rate limiting for image uploads (Security measure: prevent upload abuse)
const uploadRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 uploads per windowMs
  message: {
    success: false,
    message: 'Too many image upload requests from this IP. Please try again after 15 minutes.',
  },
});

// Protected routes
router.use(protect);

// Parameter Analysis
router.post('/parameters', analyzeParameters);
router.get('/parameters', getParameterAnalyses);
router.get('/parameters/:id', getParameterAnalysisById);

// Image Analysis
router.post('/image', uploadRateLimiter, upload.single('image'), analyzeImage);
router.get('/images', getImageAnalyses);
router.get('/images/:id', getImageAnalysisById);

// Combined History
router.get('/history', getHistory);

module.exports = router;
