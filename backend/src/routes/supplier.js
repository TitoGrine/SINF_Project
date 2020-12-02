const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const stockUtils = require("../utils/stockUtils");

router.get("/orders", function (req, res) {
  const access_token = req.body.access_token;

  if (!access_token)
    return res
      .status(400)
      .json({ error: "A valid access token was not provided." });

  const config = {
    method: "get",
    url: `${process.env.JASMIN_URI}/api/${process.env.JASMIN_TENANT}/${process.env.JASMIN_ORGANIZATION}/purchases/orders`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      let orders = response.data;
      let parsed_orders = {};

      for (let i in orders) {
        for (let j in orders[i].documentLines) {
          parsed_orders[orders[i].documentLines[j].orderId] = {
            date: orders[i].documentDate,
            documentId: orders[i].naturalKey,
            supplier: orders[i].sellerSupplierParty,
            supplierName: orders[i].sellerSupplierPartyName,
          };
        }
      }

      res.send(parsed_orders);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).json({ error });
    });
});

router.get("/orders/:id", function (req, res) {
  const access_token = req.body.access_token;

  if (!access_token)
    return res
      .status(400)
      .json({ error: "A valid access token was not provided." });

  const config = {
    method: "get",
    url: `${process.env.JASMIN_URI}/api/${process.env.JASMIN_TENANT}/${process.env.JASMIN_ORGANIZATION}/purchases/orders/${req.params.id}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(async function (response) {
      let order_info = {};
      let documents = response.data.documentLines;

      for (let j in documents) {
        let stock = await stockUtils.getMaterialStock(
          access_token,
          documents[j].purchasesItem
        );

        order_info[documents[j].purchasesItem] = {
          description: documents[j].complementaryDescription,
          quantity: parseInt(documents[j].quantity),
          stock,
          location: documents[j].warehouse,
        };
      }

      res.send(order_info);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).json({ error });
    });
});

module.exports = router;
