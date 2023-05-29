import mongoose from 'mongoose';

async function connectDB() {
  try {
    console.log(`Connecting to MongoDB: ${process.env.MONGO_URL}`)
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.MONGO_DB,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    throw new Error(`Unable to connect to database: ${error.message}`);
  }
}

// Export connection
export default connectDB;
