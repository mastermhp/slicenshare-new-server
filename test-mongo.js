const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Environment variables:');
    console.log('MONGO_USERNAME:', process.env.MONGO_USERNAME);
    console.log('MONGO_CLUSTER:', process.env.MONGO_CLUSTER);
    console.log('MONGO_DB_NAME:', process.env.MONGO_DB_NAME);
    console.log('MONGO_PASSWORD length:', process.env.MONGO_PASSWORD ? process.env.MONGO_PASSWORD.length : 'NOT SET');
    
    const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}`;
    console.log('\nConnection string (password hidden):');
    console.log(connectionString.replace(/:([^@]+)@/, ':***@'));
    
    await mongoose.connect(connectionString, {
      retryWrites: true,
      w: 'majority',
      serverSelectionTimeoutMS: 10000
    });
    
    console.log('✅ MongoDB Connected successfully!');
    
    // Test a simple operation
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: true, timestamp: new Date() });
    console.log('✅ Test document inserted successfully!');
    
    await mongoose.disconnect();
    console.log('✅ Disconnected successfully!');
    
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    if (error.reason) {
      console.error('Error reason:', error.reason);
    }
  }
};

testConnection(); 