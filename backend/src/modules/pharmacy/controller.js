const Pharmacy = require('./model');

exports.addMedicine = async (req, res) => {
    try {
        const { tenThuoc, tenHoatChat, hamLuong, maDVT, maNhom, soDangKy, nuocSanXuat, hangSanXuat, giaNhap, giaBanLe, giaBanBuon, tonKhoToiThieu, tonKhoHienTai, hanSuDung, trangThai } = req.body;
        const newMedicine = await Pharmacy.create({ maThuoc: generateMedicineId(), tenThuoc, tenHoatChat, hamLuong, maDVT, maNhom, soDangKy, nuocSanXuat, hangSanXuat, giaNhap, giaBanLe, giaBanBuon, tonKhoToiThieu, tonKhoHienTai, hanSuDung, trangThai });
        res.status(201).json({ message: 'Thêm thuốc thành công', medicine: newMedicine });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm thuốc: ' + error.message });
    }
};

function generateMedicineId() {
    return 'TH' + Date.now();
}