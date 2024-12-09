require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1/ecom'
    )

    console.log('MongoDB connection SUCCESS')
    console.log('Connected to database:', conn.connection.name)
    
    // Add event listeners for connection issues
    mongoose.connection.on('error', err => {
      console.error('MongoDB error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

  } catch (error) {
    console.error('MongoDB connection FAIL:', error.message)
    process.exit(1)
  }
}

module.exports = {connectDB}