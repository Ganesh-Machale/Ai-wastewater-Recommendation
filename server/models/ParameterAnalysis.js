const mongoose = require('mongoose');

const parameterAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      default: 'parameter',
    },
    parameters: {
      pH: {
        type: Number,
        required: true,
        min: 0,
        max: 14,
      },
      tds: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    qualityLevel: {
      type: String,
      enum: ['Good', 'Moderate', 'Poor'],
      required: true,
    },
    pollutionLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      required: true,
    },
    recommendations: [
      {
        type: String,
      },
    ],
    prototype: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ParameterAnalysis', parameterAnalysisSchema);
