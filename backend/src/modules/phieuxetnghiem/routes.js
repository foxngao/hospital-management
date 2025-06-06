const express = require("express");
const router = express.Router();
const controller = require("./controller");

// API cho bệnh viện
router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

// API cho BỆNH NHÂN
router.post("/from-patient", controller.createFromPatient);
router.get("/byMaHSBA/:maHSBA", controller.getByMaHSBA);
router.get("/by-month/:dotKhamBenh", controller.getByMonth);
router.put("/capnhat-trangthai", controller.updateTrangThai);

module.exports = router;
