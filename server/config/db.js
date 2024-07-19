const mongoose = require('mongoose');

const mode = process.env.NODE_ENV;

const connectDB = async () => {
    console.log(process.env.mode.toUpperCase());
    let mongoUri;
    if (mode === 'prod') {
        mongoUri = process.env.MONGODB_URI_PROD
    } else {
        mongoUri = process.env.MONGODB_URI_DEV
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('successfully connect to MongoDB')
    } catch (err) {
        console.log('Error connecting to mongoDB', err.message);
        process.exit(1)
    }
};

module.exports = connectDB;