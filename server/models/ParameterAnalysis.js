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
      turbidity: {
        type: Number,
        default: null,
      },
      phosphate: {
        type: Number,
        default: null,
      },
      nitrate: {
        type: Number,
        default: null,
      },
      iron: {
        type: Number,
        default: null,
      },
      cod: {
        type: Number,
        default: null,
      },
      chlorine: {
        type: Number,
        default: null,
      },
      sodium: {
        type: Number,
        default: null,
      },
    },
    predictedClass: {
      type: Number,
      default: null,
    },
    classLabel: {
      type: String,
      default: '',
    },
    confidence: {
      type: Number,
      default: null,
    },
    classProbabilities: {
      type: Object,
      default: {},
    },
    modelName: {
      type: String,
      default: 'Random Forest Classifier (100 Trees)',
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
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ParameterAnalysis', parameterAnalysisSchema);
