const mongoose = require("mongoose");

// 1. Ensure the name matches EXACTLY (case-sensitive)
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
    }
};

// 2. Ensure you are exporting the exact same name
module.exports = connectToDB;