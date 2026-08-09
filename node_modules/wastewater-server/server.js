require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wastewater_db';

// Connect to MongoDB Database
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('----------------------------------------------------');
    console.log('✅ MongoDB connected successfully to database');
    console.log(`📡 Database URI: ${MONGO_URI.replace(/\/\/.*@/, '//***@')}`);

    const server = app.listen(PORT, () => {
      console.log(`🚀 WQAI Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`🌐 Base URL: http://localhost:${PORT}`);
      console.log('----------------------------------------------------');
    });

    // Handle Unhandled Rejections
    process.on('unhandledRejection', (err) => {
      console.error('💥 UNHANDLED REJECTION! Shutting down server gracefully...', err);
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.error('❌ Database Connection Error:', err.message);
    console.log('⚠️ Please ensure MongoDB service is running locally or check MONGO_URI in server/.env');
  });
