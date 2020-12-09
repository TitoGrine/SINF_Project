require("dotenv").config();

const express = require("express");
const router = express.Router();

const user = require("../models/user");

// login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const registered = await user.findOne({
        where: {
            email,
        }
    });

    if (!registered)
        return res.status(404).json({
            message: "User not found with that email.",
        });

    registered.checkPass(password, (err, match) => {
        if (match && !err) {
            //todo: generate session token
            return res.status(200).json({
                message: "Login successful."
            });
        } else {
            return res.status(401).json({
                message: "Login failed.",
            })
        }
    })
})

module.exports = router;