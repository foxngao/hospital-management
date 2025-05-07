// src/middleware/checkRole.js
module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.maNhom;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ thongBao: "Không có quyền truy cập" });
    }

    next();
  };
};
