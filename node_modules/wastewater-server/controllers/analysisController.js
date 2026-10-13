const ParameterAnalysis = require('../models/ParameterAnalysis');
const ImageAnalysis = require('../models/ImageAnalysis');
const { predictParameters, predictImage } = require('../services/predictionService');

// @desc    Analyze wastewater parameters (pH & TDS)
// @route   POST /api/analysis/parameters
// @access  Private
const analyzeParameters = async (req, res, next) => {
  try {
    const { pH, tds } = req.body;

    // Validation rules:
    // pH: numeric, 0-14, required
    // TDS: numeric, min 0, required
    if (pH === undefined || pH === null || pH === '' || isNaN(pH)) {
      return res.status(400).json({ success: false, message: 'Valid numeric pH value (0-14) is required' });
    }

    if (tds === undefined || tds === null || tds === '' || isNaN(tds)) {
      return res.status(400).json({ success: false, message: 'Valid numeric TDS value (>=0 mg/L) is required' });
    }

    const numPH = Number(pH);
    const numTDS = Number(tds);

    if (numPH < 0 || numPH > 14) {
      return res.status(400).json({ success: false, message: 'pH must be between 0.0 and 14.0' });
    }

    if (numTDS < 0) {
      return res.status(400).json({ success: false, message: 'TDS must be a non-negative number' });
    }

    // Call AI prediction service using trained Random Forest model
    const result = await predictParameters(req.body);

    // Persist to MongoDB
    const analysisRecord = await ParameterAnalysis.create({
      userId: req.user._id,
      type: 'parameter',
      parameters: result.parameters,
      predictedClass: result.predictedClass,
      classLabel: result.classLabel,
      confidence: result.confidence,
      classProbabilities: result.classProbabilities,
      modelName: result.modelName,
      qualityLevel: result.qualityLevel,
      pollutionLevel: result.pollutionLevel,
      recommendations: result.recommendations,
      prototype: false,
    });

    res.status(201).json({
      success: true,
      message: 'Wastewater quality assessed using Random Forest AI Model',
      data: {
        _id: analysisRecord._id,
        predictedClass: result.predictedClass,
        classLabel: result.classLabel,
        confidence: result.confidence,
        classProbabilities: result.classProbabilities,
        modelName: result.modelName,
        modelAccuracy: result.modelAccuracy,
        qualityLevel: result.qualityLevel,
        pollutionLevel: result.pollutionLevel,
        recommendations: result.recommendations,
        parameters: result.parameters,
        prototype: false,
        createdAt: analysisRecord.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all parameter analyses for current user
// @route   GET /api/analysis/parameters
// @access  Private
const getParameterAnalyses = async (req, res, next) => {
  try {
    const query = req.user.role === 'ADMIN' ? {} : { userId: req.user._id };
    const records = await ParameterAnalysis.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    next(error);
  }
};

// @desc    Get parameter analysis by ID
// @route   GET /api/analysis/parameters/:id
// @access  Private
const getParameterAnalysisById = async (req, res, next) => {
  try {
    const record = await ParameterAnalysis.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Parameter analysis record not found' });
    }
    if (record.userId.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Not authorized to access this record' });
    }
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload & analyze wastewater image
// @route   POST /api/analysis/image
// @access  Private
const analyzeImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a wastewater image file (JPG, PNG, WEBP)' });
    }

    const { filename, originalname, mimetype, size } = req.file;
    const relativeImagePath = `/uploads/${filename}`;

    // Modular prediction service returns prototype status
    const predictionResult = await predictImage(req.file);

    // Save metadata to MongoDB
    const imageRecord = await ImageAnalysis.create({
      userId: req.user._id,
      type: 'image',
      imagePath: relativeImagePath,
      originalName: originalname,
      mimeType: mimetype,
      fileSize: size,
      prediction: null,
      status: 'prototype',
    });

    res.status(201).json({
      success: true,
      message: predictionResult.message,
      data: {
        _id: imageRecord._id,
        imageId: filename,
        imageUrl: relativeImagePath,
        originalName: originalname,
        fileSize: size,
        status: 'prototype',
        prediction: null,
        message: 'Image uploaded successfully. AI image classification model integration coming in Phase 2.',
        createdAt: imageRecord.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all image analyses for current user
// @route   GET /api/analysis/images
// @access  Private
const getImageAnalyses = async (req, res, next) => {
  try {
    const query = req.user.role === 'ADMIN' ? {} : { userId: req.user._id };
    const records = await ImageAnalysis.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    next(error);
  }
};

// @desc    Get image analysis by ID
// @route   GET /api/analysis/images/:id
// @access  Private
const getImageAnalysisById = async (req, res, next) => {
  try {
    const record = await ImageAnalysis.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Image analysis record not found' });
    }
    if (record.userId.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Not authorized to access this record' });
    }
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

// @desc    Get combined analysis history for user
// @route   GET /api/analysis/history
// @access  Private
const getHistory = async (req, res, next) => {
  try {
    const { type, search, page = 1, limit = 10 } = req.query;

    const queryUser = req.user.role === 'ADMIN' ? {} : { userId: req.user._id };

    let parameterItems = [];
    let imageItems = [];

    if (!type || type === 'all' || type === 'parameter') {
      parameterItems = await ParameterAnalysis.find(queryUser).lean();
      parameterItems = parameterItems.map((item) => ({ ...item, category: 'parameter' }));
    }

    if (!type || type === 'all' || type === 'image') {
      imageItems = await ImageAnalysis.find(queryUser).lean();
      imageItems = imageItems.map((item) => ({ ...item, category: 'image' }));
    }

    let combined = [...parameterItems, ...imageItems];

    // Search filter
    if (search) {
      const term = search.toLowerCase();
      combined = combined.filter((item) => {
        if (item.category === 'parameter') {
          return (
            item.qualityLevel.toLowerCase().includes(term) ||
            item.pollutionLevel.toLowerCase().includes(term) ||
            item.parameters.pH.toString().includes(term) ||
            item.parameters.tds.toString().includes(term)
          );
        } else {
          return item.originalName.toLowerCase().includes(term) || item.status.toLowerCase().includes(term);
        }
      });
    }

    // Sort by createdAt desc
    combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginated = combined.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      totalCount: combined.length,
      page: Number(page),
      totalPages: Math.ceil(combined.length / Number(limit)) || 1,
      data: paginated,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeParameters,
  getParameterAnalyses,
  getParameterAnalysisById,
  analyzeImage,
  getImageAnalyses,
  getImageAnalysisById,
  getHistory,
};
