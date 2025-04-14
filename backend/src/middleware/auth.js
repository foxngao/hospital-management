const jwt = require('jsonwebtoken');
const TaiKhoan = require('../modules/auth/model');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console(),
    ],
});

exports.authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(403).json({ message: 'Không có token, truy cập bị từ chối' });
        }

        // Loại bỏ prefix "Bearer " nếu có
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await TaiKhoan.findByPk(decoded.maTK);
        if (!user) {
            return res.status(401).json({ message: 'Người dùng không tồn tại' });
        }

        // Kiểm tra trạng thái tài khoản
        if (!user.trangThai) {
            return res.status(403).json({ message: 'Tài khoản đã bị khóa' });
        }

        // Chỉ lưu thông tin cần thiết
        req.user = {
            maTK: user.maTK,
            maNhom: user.maNhom,
        };
        next();
    } catch (error) {
        logger.error('Lỗi xác thực token: ' + error.message);
        res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};

exports.authorize = (roles) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Vui lòng đăng nhập' });
        }

        if (!roles.includes(req.user.maNhom)) {
            return res.status(403).json({ message: 'Bạn không có quyền thực hiện hành động này' });
        }

        next();
    };
};

exports.adminOnly = exports.authorize(['ADMIN']);
exports.staffOnly = exports.authorize(['BACSI', 'NHANSU']);
exports.patientOnly = exports.authorize(['BENHNHAN']);