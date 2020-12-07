const express = require("express");
const router = express.Router();
const axios = require("axios");
const querystring = require("querystring");
const verifySession = require("../utils/authUtils");
require("dotenv").config();

router.get("/", function (req, res) {
  if (!verifySession(req)) {
    return res.status(401).json({
      message: "Invalid session token.",
    });
  }

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
      res.json({ access_token: token.data.access_token });
    });
});

module.exports = router;
