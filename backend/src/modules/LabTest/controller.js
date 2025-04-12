const LabTest = require('./model');

exports.createTest = async (req, res) => {
    try {
        const { maLoaiXN, tenXN, chiPhi, thoiGianTraKetQua } = req.body;
        const newTest = await LabTest.create({ maXN: generateTestId(), maLoaiXN, tenXN, chiPhi, thoiGianTraKetQua });
        res.status(201).json({ message: 'Tạo xét nghiệm thành công', test: newTest });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo xét nghiệm: ' + error.message });
    }
};

function generateTestId() {
    return 'XN' + Date.now();
}