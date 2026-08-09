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
  { pH: 7.2, tds: 320 },  // Good
  { pH: 6.8, tds: 450 },  // Good
  { pH: 5.8, tds: 620 },  // Moderate
  { pH: 8.9, tds: 850 },  // Moderate
  { pH: 4.2, tds: 1850 }, // Poor
  { pH: 10.5, tds: 2100 },// Poor
  { pH: 7.5, tds: 280 },  // Good
  { pH: 6.1, tds: 980 },  // Moderate
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(MONGO_URI);
    console.log('Clearing existing collections...');

    await User.deleteMany({});
    await ParameterAnalysis.deleteMany({});
    await ImageAnalysis.deleteMany({});

    console.log('Creating seed users...');
    const createdUsers = [];
    for (const u of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(u.password, salt);
      const user = await User.create({
        name: u.name,
        email: u.email,
        passwordHash,
        role: u.role,
      });
      createdUsers.push(user);
    }

    const demoUser = createdUsers[0];

    console.log('Creating sample parameter analyses...');
    for (const p of sampleParameters) {
      const pred = await predictParameters(p.pH, p.tds);
      await ParameterAnalysis.create({
        userId: demoUser._id,
        type: 'parameter',
        parameters: {
          pH: p.pH,
          tds: p.tds,
        },
        qualityLevel: pred.qualityLevel,
        pollutionLevel: pred.pollutionLevel,
        recommendations: pred.recommendations,
        prototype: true,
      });
    }

    console.log('Creating sample image analyses metadata...');
    await ImageAnalysis.create({
      userId: demoUser._id,
      type: 'image',
      imagePath: '/uploads/sample_sample_water_1.jpg',
      originalName: 'effluent_sample_A.jpg',
      mimeType: 'image/jpeg',
      fileSize: 1024 * 450,
      prediction: null,
      status: 'prototype',
    });

    await ImageAnalysis.create({
      userId: demoUser._id,
      type: 'image',
      imagePath: '/uploads/sample_sample_water_2.jpg',
      originalName: 'industrial_discharge_B.png',
      mimeType: 'image/png',
      fileSize: 1024 * 780,
      prediction: null,
      status: 'prototype',
    });

    console.log('----------------------------------------------------');
    console.log('🎉 Seed Completed Successfully!');
    console.log('🔑 Seed Credentials:');
    console.log('   Standard User: user@example.com / user123');
    console.log('   Admin User:    admin@example.com / admin123');
    console.log('----------------------------------------------------');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();
