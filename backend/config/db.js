const mongoose = require('mongoose');
require('dotenv').config(); // Ensures environment variables are loaded

const MONGODB_URI = process.env.MONGODB_URI; // MongoDB URI

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully.');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(-1); // Exit process with failure
    }
};

// Handling connection errors after initial connection
mongoose.connection.on('error', err => {
    console.error(`MongoDB reconnection error: ${err}`);
});

module.exports = connectDB;
