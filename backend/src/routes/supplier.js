const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const stockUtils = require("../utils/stockUtils");

router.get("/orders", function (req, res) {
  const access_token = req.headers.authorization;

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
        if (orders[i].isActive && !orders[i].isDeleted)
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
      return res.status(error.response.status).json({ error });
    });
});

router.get("/orders/:id", function (req, res) {
  const access_token = req.headers.authorization;

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
          quantity: documents[j].quantity,
          stock,
          location: documents[j].warehouse,
        };
      }

      res.send(order_info);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(error.response.status).json({ error });
    });
});

router.get("/delivery", function (req, res) {
  const access_token = req.headers.authorization;

  if (!access_token)
    return res
      .status(400)
      .json({ error: "A valid access token was not provided." });

  const config = {
    method: "get",
    url: `${process.env.JASMIN_URI}/api/${process.env.JASMIN_TENANT}/${process.env.JASMIN_ORGANIZATION}/goodsReceipt/processOrders/1/1000?company=SINFFEUP`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(async function (response) {
      let parsed_process_orders = [];
      let process_orders = response.data;

      for (let j in process_orders) {
        parsed_process_orders.push({
          sourceDocKey: process_orders[j].sourceDocKey,
          sourceDocLineNumber: process_orders[j].sourceDocLineNumber,
          item: process_orders[j].item,
          originalQuantity: process_orders[j].originalQuantity,
          quantity: process_orders[j].quantity,
        });
      }

      res.send(parsed_process_orders);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(error.response.status).json({ error });
    });
});

router.post("/delivery", function (req, res) {
  const access_token = req.headers.authorization;
  const orders = req.body;

  if (!access_token)
    return res
      .status(400)
      .json({ error: "A valid access token was not provided." });

  if (!orders)
    return res.status(400).json({ error: "No orders were provided." });

  const config = {
    method: "post",
    url: `${process.env.JASMIN_URI}/api/${process.env.JASMIN_TENANT}/${process.env.JASMIN_ORGANIZATION}/goodsReceipt/processOrders/SINFFEUP`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    data: orders,
  };

  axios(config)
    .then(function (response) {
      res.send({ key: response.data });
    })
    .catch(function (error) {
      console.log(error);
      return res.status(error.response.status).json({ error });
    });
});

module.exports = router;
