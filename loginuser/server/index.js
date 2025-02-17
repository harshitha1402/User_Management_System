require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connectToDatabase = require("./db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

// Connect to the database
connectToDatabase();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Welcome route
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
