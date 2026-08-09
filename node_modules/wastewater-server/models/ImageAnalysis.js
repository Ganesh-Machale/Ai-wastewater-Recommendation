const mongoose = require('mongoose');

const imageAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      default: 'image',
    },
    imagePath: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    prediction: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    status: {
      type: String,
      default: 'prototype',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ImageAnalysis', imageAnalysisSchema);
