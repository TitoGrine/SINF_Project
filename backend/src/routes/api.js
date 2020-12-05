const router = require("express").Router();

const tokenRouter = require("./token.js");
const stockRouter = require("./stock.js");
const clientRouter = require("./client.js");
const supplierRouter = require("./supplier.js");

router.use("/token", tokenRouter);
router.use("/stock", stockRouter);
router.use("/client", clientRouter);
router.use("/supplier", supplierRouter);

module.exports = router;
