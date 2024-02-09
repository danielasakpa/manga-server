const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 50,
            wtimeoutMS: 5000,
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
        setTimeout(connectDB, 5000);
    }
};

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});


module.exports = connectDB;
