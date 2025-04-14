const MedicalRecord = require('./model');
const { authenticate } = require('../../middleware/auth');
exports.createMedicalRecord = [
    authenticate,
    async (req, res) => {
        console.log('Đang tạo hồ sơ bệnh án...');
        try {
            if (req.user.maNhom !== 'BACSI' && req.user.maNhom !== 'NHANSU') {
                return res.status(403).json({ message: 'Chỉ bác sĩ và nhân sự được tạo hồ sơ bệnh án' });
            }

            const { maBN, dotKhamBenh, lichSuBenh, ghiChu } = req.body;
            const newRecord = await MedicalRecord.create({ maHSBA: generateRecordId(), maBN, dotKhamBenh, lichSuBenh, ghiChu });
            res.status(201).json({ message: 'Tạo hồ sơ bệnh án thành công', record: newRecord });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tạo hồ sơ: ' + error.message });
        }
    },
];

exports.getMedicalRecord = [
    authenticate,
    async (req, res) => {
        try {
            const records = await MedicalRecord.findAll();
            if (req.user.maNhom === 'BENHNHAN') {
                // Chỉ cho phép xem hồ sơ của bản thân
                records = records.filter(record => record.maBN === req.user.maBN);
            }
            res.json({ message: 'Lấy hồ sơ thành công', records });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy hồ sơ: ' + error.message });
        }
    },
];

exports.updateMedicalRecord = [
    authenticate,
    async (req, res) => {
        try {
            if (req.user.maNhom !== 'BACSI' && req.user.maNhom !== 'NHANSU') {
                return res.status(403).json({ message: 'Chỉ bác sĩ và nhân sự được sửa hồ sơ bệnh án' });
            }

            const { maHSBA } = req.params;
            const { maBN, dotKhamBenh, lichSuBenh, ghiChu } = req.body;

            const record = await MedicalRecord.findByPk(maHSBA);
            if (!record) {
                return res.status(404).json({ message: 'Hồ sơ bệnh án không tồn tại' });
            }

            await record.update({ maBN, dotKhamBenh, lichSuBenh, ghiChu });
            res.json({ message: 'Cập nhật hồ sơ bệnh án thành công', record });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật hồ sơ: ' + error.message });
        }
    },
];

exports.deleteMedicalRecord = [
    authenticate,
    async (req, res) => {
        try {
            if (req.user.maNhom !== 'BACSI' && req.user.maNhom !== 'NHANSU') {
                return res.status(403).json({ message: 'Chỉ bác sĩ và nhân sự được xóa hồ sơ bệnh án' });
            }

            const { maHSBA } = req.params;

            const record = await MedicalRecord.findByPk(maHSBA);
            if (!record) {
                return res.status(404).json({ message: 'Hồ sơ bệnh án không tồn tại' });
            }

            await record.destroy();
            res.json({ message: 'Xóa hồ sơ bệnh án thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa hồ sơ: ' + error.message });
        }
    },
];

function generateRecordId() {
    return 'HSBA' + Date.now();
}