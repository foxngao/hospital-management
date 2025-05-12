const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const controller = require("./controller");
const checkRole = require("../../middleware/checkRole");
const verifyToken = require("../../middleware/auth");

router.get("/", verifyToken, checkRole("ADMIN"), controller.getAll);
router.get("/:id", verifyToken, checkRole("ADMIN"), controller.getById);
router.post(
  "/",
  verifyToken,
  checkRole("ADMIN"),
  body("tenDangNhap").notEmpty(),
  body("matKhau").notEmpty(),
  body("maNhom").notEmpty(),
  controller.register
);
router.put("/:id", verifyToken, checkRole("ADMIN"), controller.update);
router.delete("/:id", verifyToken, checkRole("ADMIN"), controller.remove);


module.exports = router;
