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
        let warehouses = [];

        for (let j in stock[i].materialsItemWarehouses) {
          quantity += parseInt(
            stock[i].materialsItemWarehouses[j].stockBalance
          );

          warehouses.push({
            stock: stock[i].materialsItemWarehouses[j].stockBalance,
            location: stock[i].materialsItemWarehouses[j].warehouse,
          });
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
      return res.status(error.response.status).json({ error });
    });
});

router.post("/transfer", async function (req, res) {
  const access_token = req.headers.authorization;
  const stockTransfers = req.body;

  if (!stockTransfers)
    return res.status(400).json({ error: "No stockTransfers were provided." });

  if (!access_token)
    return res
      .status(400)
      .json({ error: "A valid access token was not provided." });

  let responses = [];

  await Promise.all(
    stockTransfers.map(async (transfer) => {
      if (
        !transfer.sourceWarehouse ||
        !transfer.targetWarehouse ||
        !transfer.items
      ) {
        return res.status(400).json({
          error:
            "At least one of the tranfers is invalid - missing one of {sourceWarehouse, targetWarehouse, items}.",
        });
      }

      const data = JSON.stringify({
        company: process.env.JASMIN_COMPANY,
        sourceWarehouse: transfer.sourceWarehouse,
        targetWarehouse: transfer.targetWarehouse,
        loadingStreetName: "R. Dr. Roberto Frias",
        loadingBuildingNumber: "0",
        loadingPostalZone: "4200-465",
        loadingCityName: "Porto",
        loadingCountry: "PT",
        UnloadingCountry: "PT",
        documentLines: transfer.items,
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

      try {
        const response = await axios(config);

        responses.push({ key: response.data });
      } catch (error) {
        responses.push({
          status: error.response.status,
          error: error.message,
        });
      }
    })
  );

  return res.send(responses);
});

module.exports = router;
