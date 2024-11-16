require("dotenv").config();
console.log("SECRET_KEY:", process.env.SECRET_KEY);
console.log("EMAIL:", process.env.EMAIL);
console.log("PASSWORD:", process.env.PASSWORD);
console.log("BACKEND_URL:", process.env.BACKEND_URL);
const mongoose = require("mongoose");
const express = require("express");
const app = express();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/your-database-name', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};
module.exports = connectDB;