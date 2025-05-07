const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { body } = require("express-validator");

const verifyToken = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");

//  Kiểm tra nội dung phản hồi khi bệnh nhân gửi
const feedbackValidator = [
  body("noiDung")
    .isLength({ min: 10 })
    .withMessage("Nội dung phản hồi phải từ 10 ký tự trở lên"),
];

/**
 * ROUTES
 * GET     /api/feedback/              → ADMIN xem tất cả, hoặc bệnh nhân xem phản hồi mình
 * POST    /api/feedback/              → BENHNHAN gửi phản hồi
 * PUT     /api/feedback/:maPH         → ADMIN cập nhật phản hồi (ví dụ: xử lý trạng thái)
 * DELETE  /api/feedback/:maPH         → ADMIN xóa phản hồi
 */

//  Xem danh sách phản hồi (tùy filter)
router.get("/", verifyToken, checkRole("ADMIN", "BENHNHAN"), controller.getAll);

//  Bệnh nhân gửi phản hồi
router.post("/", verifyToken, checkRole("BENHNHAN"), feedbackValidator, controller.create);

//  ADMIN xử lý phản hồi (sửa trạng thái / nội dung)
router.put("/:maPH", verifyToken, checkRole("ADMIN"), controller.update);

//  ADMIN xóa phản hồi
router.delete("/:maPH", verifyToken, checkRole("ADMIN"), controller.remove);

module.exports = router;
