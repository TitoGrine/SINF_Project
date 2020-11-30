const axios = require("axios");
require("dotenv").config();

module.exports.getMaterialStock = async function getMaterialStock(
  access_token,
  materialID
) {
  const config = {
    method: "get",
    url: `${process.env.JASMIN_URI}/api/${process.env.JASMIN_TENANT}/${process.env.JASMIN_ORGANIZATION}/materialscore/materialsitems/${materialID}/extension`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };

  let response = await axios(config);

  if (response.data) {
    let totalStock = 0;
    let materials = response.data.materialsItemWarehouses;

    for (let j in materials) {
      totalStock += parseInt(materials[j].stockBalance);
    }

    return totalStock;
  }
};
