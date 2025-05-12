const { LichKham, BacSi, BenhNhan } = require("../../models");
const { v4: uuidv4 } = require("uuid");

exports.getAll = async (req, res) => {
  try {
    const data = await LichKham.findAll({
      include: [
        { model: BacSi, attributes: ["hoTen"] },
        { model: BenhNhan, attributes: ["hoTen"] }
      ]
    });
    res.json({ message: "Lấy danh sách lịch khám", data });
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy lịch khám", error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { maBN, maBS, ngayKham, gioKham, phong, ghiChu } = req.body;
    const maLich = uuidv4().slice(0, 8).toUpperCase(); // VD: "3FD28A9C"
    const lich = await LichKham.create({ maLich, maBN, maBS, ngayKham, gioKham, phong, ghiChu });
    res.status(201).json({ message: "Tạo lịch khám thành công", data: lich });
  } catch (err) {
    res.status(500).json({ message: "Lỗi tạo lịch khám", error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { ngayKham, gioKham, phong, ghiChu } = req.body;
    const [updated] = await LichKham.update(
      { ngayKham, gioKham, phong, ghiChu },
      { where: { maLich: req.params.id } }
    );
    if (updated === 0)
      return res.status(404).json({ message: "Không tìm thấy lịch để cập nhật" });

    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật lịch khám", error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await LichKham.destroy({ where: { maLich: req.params.id } });
    if (deleted === 0)
      return res.status(404).json({ message: "Không tìm thấy lịch để xoá" });
    res.json({ message: "Xoá thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi xoá lịch khám", error: err.message });
  }
};
