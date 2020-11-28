var express = require("express");
var router = express.Router();
var axios = require("axios");
require("dotenv").config();

async function getMaterialStock(materialID) {
  var config = {
    method: "get",
    url:
      "https://my.jasminsoftware.com//api/242848/242848-0001/materialscore/materialsitems/VULCANICO/extension",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDY1NzMzODYsImV4cCI6MTYwNjU4Nzc4NiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiQUgtQVBQIiwic2NvcGUiOlsiYXBwbGljYXRpb24iXX0.uURSofYDizR9tMvx1aB102QFCv1vJiXVETpwAWRR-S_T6PpBauMBDOM3iSUZ8_YfKdTuTZrXOvqRwXNyDq6FtaFpLWEbIn49j1Y5czbSCczSxFTgkc2hMEpZithTQXnTTnjjyaBA-N2aJ-wS6Icm-GfUDkBjAH3-rzPm66U4A0A3ZjYrZ8KaGjcYKDXobg9AuX8I7hLbvLIg593RyIPtYoDqet1yuEr2RnD4khzdX3VAy8BJSg5zyzRn_zWiFcEQcDKMpnh4aXqQPsh4b9bLxei6cP5FEv_g_ghJOj4vAFWfwpbApx4tu1H9eAqN2d2BgZQFeDdj3wrjQxURtBKkdA",
      "Content-Type": "application/json",
    },
  };

  let response = await axios(config);

  if (response.data) {
    let totalStock = 0;
    let materials = response.data.materialsItemWarehouses;

    for (var j in materials) {
      totalStock += parseInt(materials[j].stockBalance);
    }

    return totalStock;
  }
}

router.get("/orders", function (req, res, next) {
  const access_token = req.body.access_token;

  if (!access_token)
    return res
      .status(400)
      .json({ error: "A valid access token was not provided." });

  var config = {
    method: "get",
    url: `${process.env.JASMIN_URI}/api/${process.env.JASMIN_TENANT}/${process.env.JASMIN_ORGANIZATION}/sales/orders`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      let orders = response.data;
      let parsed_orders = {};

      for (var i in orders) {
        for (var j in orders[i].documentLines) {
          parsed_orders[orders[i].documentLines[j].orderId] = {
            date: orders[i].documentDate,
            documentId: orders[i].naturalKey,
            customer: orders[i].buyerCustomerParty,
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

router.get("/order/:id", function (req, res, next) {
  const access_token = req.body.access_token;

  if (!access_token)
    return res
      .status(400)
      .json({ error: "A valid access token was not provided." });

  var config = {
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

      for (var j in documents) {
        let stock = await getMaterialStock(documents[j].salesItem);

        order_info[documents[j].salesItem] = {
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
      return res.status(500).json({ error });
    });
});

module.exports = router;
