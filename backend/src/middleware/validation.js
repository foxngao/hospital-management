const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      thongBao: "Dữ liệu không hợp lệ",
      loi: errors.array().map((err) => ({
        truong: err.param,
        thongDiep: err.msg
      }))
    });
  }
  next();
};
