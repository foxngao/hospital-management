const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "mat-khau-bi-mat";

//  Middleware kiểm tra token đăng nhập
module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ thongBao: "Không có token truy cập" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ thongBao: "Token không hợp lệ" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ thongBao: "Token không hợp lệ hoặc đã hết hạn" });
  }
};
