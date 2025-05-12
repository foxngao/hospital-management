// ROUTES: Định tuyến đơn thuốc và chi tiết đơn thuốc
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getAll);
router.post("/", controller.create);
router.post("/chitiet", controller.addChiTiet);
router.get("/chitiet/:maDT", controller.getChiTiet);

module.exports = router;
