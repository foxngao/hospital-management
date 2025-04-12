const MedicalRecord = require('./model');

exports.createMedicalRecord = async (req, res) => {
    try {
        const { maBN, dotKhamBenh, lichSuBenh, ghiChu } = req.body;
        const newRecord = await MedicalRecord.create({ maHSBA: generateRecordId(), maBN, dotKhamBenh, lichSuBenh, ghiChu });
        res.status(201).json({ message: 'Tạo hồ sơ bệnh án thành công', record: newRecord });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo hồ sơ: ' + error.message });
    }
};

function generateRecordId() {
    return 'HSBA' + Date.now();
}