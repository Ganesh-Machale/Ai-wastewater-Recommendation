const { generateRecommendations } = require('./recommendationService');

/**
 * Prediction Service
 * 
 * ARCHITECTURE NOTICE FOR FUTURE ML INTEGRATION:
 * To integrate a trained ML model (e.g., Random Forest / XGBoost / PyTorch model hosted on a Python FastAPI/Flask server):
 * Simply update `predictParameters` to send an HTTP request (via axios/fetch) to your Python ML service:
 * const response = await axios.post('http://localhost:8000/predict/parameters', { pH, tds });
 * return response.data;
 */

async function predictParameters(pH, tds) {
  let qualityLevel = 'Good';
  let pollutionLevel = 'Low';

  const numPH = Number(pH);
  const numTDS = Number(tds);

  if (numPH >= 6.5 && numPH <= 8.5 && numTDS <= 500) {
    qualityLevel = 'Good';
    pollutionLevel = 'Low';
  } else if ((numPH >= 5.5 && numPH < 6.5) || (numPH > 8.5 && numPH <= 9.5) || (numTDS > 500 && numTDS <= 1500)) {
    qualityLevel = 'Moderate';
    pollutionLevel = 'Medium';
  } else {
    qualityLevel = 'Poor';
    pollutionLevel = 'High';
  }

  const recommendations = generateRecommendations(qualityLevel, pollutionLevel, { pH: numPH, tds: numTDS });

  return {
    qualityLevel,
    pollutionLevel,
    recommendations,
    parameters: {
      pH: numPH,
      tds: numTDS,
    },
    prototype: true,
  };
}

/**
 * Image Prediction Service Placeholder
 * 
 * FUTURE ML INTEGRATION:
 * When trained CNN / MobileNetV2 / ResNet50 model is ready:
 * Send image buffer/file path to Python inference server:
 * const response = await axios.post('http://localhost:8000/predict/image', formData);
 * return response.data;
 */
async function predictImage(fileData) {
  return {
    imageId: fileData.filename,
    status: 'prototype',
    prediction: null,
    message: 'Image received successfully. AI image classification will be integrated in the next phase.',
  };
}

module.exports = {
  predictParameters,
  predictImage,
};
