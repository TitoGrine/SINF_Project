const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.get("/", function (req, res) {
  const access_token = req.headers.authorization;

  if (!access_token)
    return res
      .status(400)
      .json({ error: "A valid access token was not provided." });

  const config = {
    method: "get",
    url: `${process.env.JASMIN_URI}/api/${process.env.JASMIN_TENANT}/${process.env.JASMIN_ORGANIZATION}/materialscore/materialsitems`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      let stock = response.data;
      let parsed_stock = {};

      for (let i in stock) {
        let quantity = 0;
        let warehouses = {};

        for (let j in stock[i].materialsItemWarehouses) {
          quantity += parseInt(
            stock[i].materialsItemWarehouses[j].stockBalance
          );

          warehouses[stock[i].materialsItemWarehouses[j].warehouse] = {
            stock: stock[i].materialsItemWarehouses[j].stockBalance,
          };
        }

        parsed_stock[stock[i].itemKey] = {
          description: stock[i].complementaryDescription,
          minStock: stock[i].minStock,
          maxStock: stock[i].maxStock,
          totalStock: quantity,
          warehouses,
        };
      }

      res.send(parsed_stock);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).json({ error });
    });
});

router.post("/transfer", function (req, res) {
  const access_token = req.headers.authorization;
  const { sourceWarehouse, targetWarehouse, items } = req.body;

  if (!access_token)
    return res
      .status(400)
      .json({ error: "A valid access token was not provided." });

  if (!access_token)
    return res
      .status(400)
      .json({ error: "A valid access token was not provided." });

  const data = JSON.stringify({
    company: process.env.JASMIN_COMPANY,
    sourceWarehouse,
    targetWarehouse,
    loadingStreetName: "R. Dr. Roberto Frias",
    loadingBuildingNumber: "0",
    loadingPostalZone: "4200-465",
    loadingCityName: "Porto",
    loadingCountry: "PT",
    UnloadingCountry: "PT",
    documentLines: items,
  });

  const config = {
    method: "post",
    url: `${process.env.JASMIN_URI}/api/${process.env.JASMIN_TENANT}/${process.env.JASMIN_ORGANIZATION}/materialsmanagement/stockTransferOrders`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).json({ error });
    });
});

module.exports = router;
