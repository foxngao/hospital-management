const { HoaDon } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { maBN, tongTien, trangThai } = req.body;
    const maHD = uuidv4();

    const hoaDon = await HoaDon.create({
      maHD,
      maBN,
      tongTien,
      trangThai: trangThai || "chua_thanh_toan",
    });

    res.status(201).json({ message: "Tạo hóa đơn thành công", data: hoaDon });
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo hóa đơn", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const hoaDon = await HoaDon.findByPk(req.params.id);
    if (!hoaDon)
      return res.status(404).json({ message: "Không tìm thấy hóa đơn" });

    res.json(hoaDon);
  } catch (error) {
    res.status(500).json({ message: "Lỗi truy xuất hóa đơn", error: error.message });
  }
};

exports.getByBENHNHAN = async (req, res) => {
  try {
    const { maNhom, maTK } = req.user;
    const requestedId = req.params.id;

    // Nếu là bệnh nhân, chỉ được xem hóa đơn của chính mình
    if (maNhom === "BENHNHAN" && requestedId !== maTK) {
      return res.status(403).json({
        message: "Bạn không có quyền truy cập hóa đơn của người khác",
      });
    }

    const danhSach = await HoaDon.findAll({
      where: { maBN: requestedId },
    });

    res.json(danhSach);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi truy xuất danh sách hóa đơn",
      error: error.message,
    });
  }
};


exports.update = async (req, res) => {
  try {
    const { tongTien, trangThai } = req.body;
    const [updated] = await HoaDon.update(
      { tongTien, trangThai },
      { where: { maHD: req.params.id } }
    );
    if (updated === 0)
      return res.status(404).json({ message: "Không tìm thấy để cập nhật" });

    res.json({ message: "Cập nhật hóa đơn thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật", error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await HoaDon.destroy({ where: { maHD: req.params.id } });
    if (deleted === 0)
      return res.status(404).json({ message: "Không tìm thấy để xoá" });

    res.json({ message: "Xoá thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xoá", error: error.message });
  }
};
