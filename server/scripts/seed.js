require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const ParameterAnalysis = require('../models/ParameterAnalysis');
const ImageAnalysis = require('../models/ImageAnalysis');
const { predictParameters } = require('../services/predictionService');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wastewater_db';

const sampleUsers = [
  {
    name: 'College Student (Demo)',
    email: 'user@example.com',
    password: 'user123',
    role: 'USER',
  },
  {
    name: 'System Admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'ADMIN',
  },
  {
    name: 'Lab Researcher',
    email: 'researcher@example.com',
    password: 'researcher123',
    role: 'USER',
  },
];

const sampleParameters = [
  { pH: 7.2, tds: 320 },
  { pH: 6.8, tds: 450 },
  { pH: 5.8, tds: 620 },
  { pH: 8.9, tds: 850 },
  { pH: 4.2, tds: 1850 },
  { pH: 10.5, tds: 2100 },
  { pH: 7.5, tds: 280 },
  { pH: 6.1, tds: 980 },
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(MONGO_URI);

    const isForceReset = process.argv.includes('--reset') || process.argv.includes('--force');

    if (isForceReset) {
      console.log('⚠️ Hard reset flag detected: clearing existing collections...');
      await User.deleteMany({});
      await ParameterAnalysis.deleteMany({});
      await ImageAnalysis.deleteMany({});
    } else {
      console.log('ℹ️ Safe Seed Mode: Preserving all existing user accounts.');
    }

    console.log('Ensuring default seed users exist...');
    const createdUsers = [];
    for (const u of sampleUsers) {
      let existingUser = await User.findOne({ email: u.email });
      if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(u.password, salt);
        existingUser = await User.create({
          name: u.name,
          email: u.email,
          passwordHash,
          role: u.role,
        });
        console.log(` + Created default user: ${u.email}`);
      } else {
        console.log(` • Default user already exists: ${u.email}`);
      }
      createdUsers.push(existingUser);
    }

    const demoUser = createdUsers[0];

    // Seed sample parameters only if demo user has no parameter records
    const existingParamsCount = await ParameterAnalysis.countDocuments({ userId: demoUser._id });
    if (existingParamsCount === 0) {
      console.log('Creating sample parameter analyses with AI Model...');
      for (const p of sampleParameters) {
        const pred = await predictParameters(p);
        await ParameterAnalysis.create({
          userId: demoUser._id,
          type: 'parameter',
          parameters: pred.parameters,
          predictedClass: pred.predictedClass,
          classLabel: pred.classLabel,
          confidence: pred.confidence,
          classProbabilities: pred.classProbabilities,
          modelName: pred.modelName,
          qualityLevel: pred.qualityLevel,
          pollutionLevel: pred.pollutionLevel,
          recommendations: pred.recommendations,
          prototype: false,
        });
      }
    } else {
      console.log(` • Demo user already has ${existingParamsCount} parameter analyses.`);
    }

    // Seed sample images if none exist
    const existingImagesCount = await ImageAnalysis.countDocuments({ userId: demoUser._id });
    if (existingImagesCount === 0) {
      console.log('Creating sample image analyses metadata...');
      await ImageAnalysis.create({
        userId: demoUser._id,
        type: 'image',
        imagePath: '/uploads/sample_sample_water_1.jpg',
        originalName: 'effluent_sample_A.jpg',
        mimeType: 'image/jpeg',
        fileSize: 1024 * 450,
        prediction: null,
        status: 'active',
      });

      await ImageAnalysis.create({
        userId: demoUser._id,
        type: 'image',
        imagePath: '/uploads/sample_sample_water_2.jpg',
        originalName: 'effluent_sample_B.jpg',
        mimeType: 'image/jpeg',
        fileSize: 1024 * 620,
        prediction: null,
        status: 'active',
      });
    }

    console.log('----------------------------------------------------');
    console.log('🎉 Seed Verification Completed Successfully!');
    console.log('🔑 Default Accounts:');
    console.log('   Standard User: user@example.com / user123');
    console.log('   Admin User:    admin@example.com / admin123');
    console.log('ℹ️ All registered accounts remain safely preserved.');
    console.log('----------------------------------------------------');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed with error:', err);
    process.exit(1);
  }
};

seedDatabase();
