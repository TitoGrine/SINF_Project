const express = require("express");
const router = express.Router();
const axios = require("axios");
const querystring = require("querystring");
require("dotenv").config();

/* GET home page. */
router.get("/", function (req, res) {
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
