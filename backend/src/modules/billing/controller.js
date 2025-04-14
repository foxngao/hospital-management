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

exports.updateBill = [
    authenticate,
    async (req, res) => {
        try {
            if (req.user.maNhom !== 'NHANSU') {
                return res.status(403).json({ message: 'Chỉ nhân sự được sửa hóa đơn' });
            }

            const { maHD } = req.params;
            const { maBN, tongTien, maNS } = req.body;

            const bill = await Billing.findByPk(maHD);
            if (!bill) {
                return res.status(404).json({ message: 'Hóa đơn không tồn tại' });
            }

            await bill.update({ maBN, tongTien, maNS });
            res.json({ message: 'Cập nhật hóa đơn thành công', bill });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật hóa đơn: ' + error.message });
        }
    },
];

exports.deleteBill = [
    authenticate,
    async (req, res) => {
        try {
            if (req.user.maNhom !== 'NHANSU') {
                return res.status(403).json({ message: 'Chỉ nhân sự được xóa hóa đơn' });
            }

            const { maHD } = req.params;

            const bill = await Billing.findByPk(maHD);
            if (!bill) {
                return res.status(404).json({ message: 'Hóa đơn không tồn tại' });
            }

            await bill.destroy();
            res.json({ message: 'Xóa hóa đơn thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa hóa đơn: ' + error.message });
        }
    },
];

function generateBillId() {
    return 'HD' + Date.now();
}