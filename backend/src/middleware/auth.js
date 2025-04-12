const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Ủy quyền')?.replace('Người mang ', '');
  if (!token) return res.status(401).json({ error: 'Không có mã thông báo nào được cung cấp' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Mã thông báo không hợp lệ' });
  }
};

module.exports = authMiddleware;