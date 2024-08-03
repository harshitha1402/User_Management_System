const mongoose = require("mongoose");

const connectToDatabase = async () => {
    const dbUrl = process.env.MONGO_URI || "mongodb://localhost:27017/yourDatabaseName"; // Use environment variable for the URL, or fallback to local

    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the database successfully");
    } catch (error) {
        console.error("Could not connect to the database:", error);
        throw error;
    }
};

module.exports = connectToDatabase;
