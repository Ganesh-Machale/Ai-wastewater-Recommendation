const express = require('express');
const router = express.Router();
const {
  analyzeParameters,
  getParameterAnalyses,
  getParameterAnalysisById,
  getHistory,
} = require('../controllers/analysisController');
const { protect } = require('../middleware/auth');

// Protected routes
router.use(protect);

// Parameter Analysis
router.post('/parameters', analyzeParameters);
router.get('/parameters', getParameterAnalyses);
router.get('/parameters/:id', getParameterAnalysisById);

// Combined History
router.get('/history', getHistory);

module.exports = router;
