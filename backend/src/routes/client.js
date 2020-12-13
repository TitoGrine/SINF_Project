const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const stockUtils = require("../utils/stockUtils");

async function getValidOrders(access_token) {
  const config = {
    method: "get",
    url: `${process.env.JASMIN_URI}/api/${process.env.JASMIN_TENANT}/${process.env.JASMIN_ORGANIZATION}/shipping/processOrders/1/100?company=SINFFEUP`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);

    let validOrders = [];
    let process_orders = response.data;

    for (let j in process_orders) {
      validOrders.push(process_orders[j].sourceDocKey);
    }

    return validOrders;
  } catch (error) {
    return null;
  }
}

async function getValidOrderLines(access_token, documentKey) {
  const config = {
    method: "get",
    url: `${process.env.JASMIN_URI}/api/${process.env.JASMIN_TENANT}/${process.env.JASMIN_ORGANIZATION}/shipping/processOrders/1/100?company=SINFFEUP`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);

    let validItems = [];
    let process_orders = response.data;

    for (let j in process_orders) {
      if (process_orders[j].sourceDocKey === documentKey)
        validItems.push(process_orders[j].item);
    }

    return validItems;
  } catch (error) {
    return null;
  }
}

router.get("/orders", async function (req, res) {
  const access_token = req.headers.authorization;

  if (!access_token)
    return res
      .status(400)
      .json({ error: "A valid access token was not provided." });

  const config = {
    method: "get",
    url: `${process.env.JASMIN_URI}/api/${process.env.JASMIN_TENANT}/${process.env.JASMIN_ORGANIZATION}/sales/orders`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };

  const validOrders = await getValidOrders(access_token);

  axios(config)
    .then(function (response) {
      let orders = response.data;
      let parsed_orders = {};

      for (let i in orders) {
        if (
          orders[i].isActive &&
          !orders[i].isDeleted &&
          validOrders.includes(orders[i].naturalKey)
        )
          for (let j in orders[i].documentLines) {
            parsed_orders[orders[i].documentLines[j].orderId] = {
              date: orders[i].documentDate,
              documentId: orders[i].naturalKey,
              client: orders[i].buyerCustomerParty,
              clientName: orders[i].buyerCustomerPartyName,
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
    url: `${process.env.JASMIN_URI}/api/${process.env.JASMIN_TENANT}/${process.env.JASMIN_ORGANIZATION}/sales/orders/${req.params.id}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(async function (response) {
      let order_info = {};
      let documents = response.data.documentLines;

      const validItems = await getValidOrderLines(
        access_token,
        response.data.naturalKey
      );

      for (let j in documents) {
        if (validItems.includes(documents[j].salesItem)) {
          let stock = await stockUtils.getMaterialStock(
            access_token,
            documents[j].salesItem
          );

          order_info[documents[j].salesItem] = {
            lineNumber: parseInt(documents[j].index) + 1,
            description: documents[j].complementaryDescription,
            quantity:
              parseInt(documents[j].quantity) -
              parseInt(documents[j].deliveredQuantity),
            stock,
            location: documents[j].warehouse,
          };
        }
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
    url: `${process.env.JASMIN_URI}/api/${process.env.JASMIN_TENANT}/${process.env.JASMIN_ORGANIZATION}/shipping/processOrders/1/100?company=SINFFEUP`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      Cookie:
        "OpenIdConnect.nonce.8DjNTjFnmYxEyLIFMzNETby3dWyiKOrV9LKz8Pgragk%3D=b1NscFM1YTZsbERKNmJhWTBCWGVyeWVQbVhSZWh4OU9aN09jX2tGWkNPanVYbTI0ZUh5RC1MeUczUHhrRlg3MV94Yjd2Rlc4YjNPSm5TeDBfaENLdnBTTVoybmhFZ3Q2R1Q5ZlQtWHhQMFRFQlJlT1JKMnhhUFNWTzdQZUZ0cUJFZGZPMU80QVlnQmtBSmg0SzV3VmZqYXJZR1ZoeXBGV0Iydk5jRkxyS0ttaTJRUVhuaFZVUl9DLURYcDg2TlFpLTJyLWtGd0t0OG9yUF8xenZnR2p3dDM0RTVn",
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
    url: `${process.env.JASMIN_URI}/api/${process.env.JASMIN_TENANT}/${process.env.JASMIN_ORGANIZATION}/shipping/processOrders/SINFFEUP`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      Cookie:
        "OpenIdConnect.nonce.8DjNTjFnmYxEyLIFMzNETby3dWyiKOrV9LKz8Pgragk%3D=b1NscFM1YTZsbERKNmJhWTBCWGVyeWVQbVhSZWh4OU9aN09jX2tGWkNPanVYbTI0ZUh5RC1MeUczUHhrRlg3MV94Yjd2Rlc4YjNPSm5TeDBfaENLdnBTTVoybmhFZ3Q2R1Q5ZlQtWHhQMFRFQlJlT1JKMnhhUFNWTzdQZUZ0cUJFZGZPMU80QVlnQmtBSmg0SzV3VmZqYXJZR1ZoeXBGV0Iydk5jRkxyS0ttaTJRUVhuaFZVUl9DLURYcDg2TlFpLTJyLWtGd0t0OG9yUF8xenZnR2p3dDM0RTVn",
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
