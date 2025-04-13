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

function generateRecordId() {
    return 'HSBA' + Date.now();
}