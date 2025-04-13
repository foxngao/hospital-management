const Billing = require('./model');
const { authenticate } = require('../../middleware/auth');
exports.createBill = [
    authenticate,
    async (req, res) => {
        try {
            if (req.user.maNhom !== 'NHANSU') {
                return res.status(403).json({ message: 'Chỉ nhân sự được lập hóa đơn' });
            }

            const { maBN, tongTien, maNS } = req.body;
            const newBill = await Billing.create({ maHD: generateBillId(), maBN, tongTien, maNS });
            res.status(201).json({ message: 'Tạo hóa đơn thành công', bill: newBill });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tạo hóa đơn: ' + error.message });
        }
    },
];

function generateBillId() {
    return 'HD' + Date.now();
}