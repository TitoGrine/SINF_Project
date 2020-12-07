require("dotenv").config();

const jwt = require('jsonwebtoken');
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
        return res.status(401).json({
            message: "User not found with that email.",
        });

    registered.checkPass(password, (err, match) => {
        if (match && !err) {
            const token = jwt.sign({
                email: email,
            },
                "cabkij3412poljmdae2alfkem312klamde", {
                expiresIn: '300m',
            });

            return res.status(200).json({
                message: "Login successful.",
                token: token,
            });
        } else {
            return res.status(401).json({
                message: "Login failed.",
            })
        }
    })
})

module.exports = router;