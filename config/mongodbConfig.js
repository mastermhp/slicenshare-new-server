const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectmongoDB = async () => {
  try {
    // Check if all required environment variables are set
    const requiredVars = ['MONGO_USERNAME', 'MONGO_PASSWORD', 'MONGO_CLUSTER', 'MONGO_DB_NAME'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('Missing MongoDB environment variables:', missingVars.join(', '));
      console.log('Please check your .env file and ensure all MongoDB variables are set');
      return;
    }
    
    const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}`;
    
    console.log('Attempting to connect to MongoDB...');
    
    await mongoose.connect(connectionString, {
      retryWrites: true, // Enable retryable writes
      w: 'majority', // Majority write concern
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
    });
    
    console.log('MongoDB Connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    console.log('Server will continue running without database connection');
    console.log('Please check your MongoDB Atlas configuration:');
    console.log('1. Verify your connection string');
    console.log('2. Check IP whitelist in MongoDB Atlas');
    console.log('3. Verify database credentials');
    // Don't exit the process, let the server run
  }
};

module.exports = connectmongoDB;