var express = require("express");
var router = express.Router();
var axios = require("axios");
require("dotenv").config();

router.get("/allItems", function (req, res, next) {
  const access_token = req.body.access_token;
  console.log("Access token = " + access_token);
  if (!access_token)
    return res
      .status(400)
      .json({ error: "A valid access token was not provided." });

  var config = {
    method: "get",
    url: `${process.env.JASMIN_URI}/api/${process.env.JASMIN_TENANT}/${process.env.JASMIN_ORGANIZATION}/materialscore/materialsitems`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).json({ error });
    });
});

module.exports = router;
