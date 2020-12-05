const router = require("express").Router();

const tokenRouter = require("./token.js");
const stockRouter = require("./stock.js");
const clientRouter = require("./client.js");
const supplierRouter = require("./supplier.js");
const pickingWaveRouter = require("./pickingWave");
const userRouter = require("./user");

router.use("/token", tokenRouter);
router.use("/stock", stockRouter);
router.use("/client", clientRouter);
router.use("/supplier", supplierRouter);
router.use("/picking-wave", pickingWaveRouter);
router.use("/auth", userRouter);

module.exports = router;
