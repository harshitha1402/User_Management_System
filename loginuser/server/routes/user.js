// user.js
const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    try {
        // Validate the request body
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        // Check if the user already exists
        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with given email already exists!" });

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Create and save the new user
        const newUser = new User({ ...req.body, password: hashPassword });
        await newUser.save();

        // Respond with success message
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
