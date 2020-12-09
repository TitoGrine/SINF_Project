require("dotenv").config();

const axios = require("axios");
const express = require("express");
const querystring = require("querystring");
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
            message: "Login failed.",
        });

    registered.checkPass(password, (err, match) => {
        if (match && !err) {
            axios
              .post(
                  "https://identity.primaverabss.com/connect/token",
                  querystring.stringify({
                      grant_type: "client_credentials",
                      client_id: process.env.JASMIN_CLIENT_ID,
                      client_secret: process.env.JASMIN_CLIENT_SECRET,
                      scope: "application",
                  })
              )
              .then((token) => {
                  res.status(200).json({ token: token.data.access_token });
              });
        } else {
            return res.status(401).json({
                message: "Login failed.",
            })
        }
    })

    return res;
})

module.exports = router;