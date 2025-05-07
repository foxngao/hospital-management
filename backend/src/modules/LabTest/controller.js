const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const PhieuXetNghiem = require("../../models/PhieuXetNghiem");

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { maLoaiXN, ketQua, maBN: maBN_fromBody } = req.body;
    const { maNhom, maTK } = req.user;

    // Nếu là bệnh nhân → chỉ được tạo phiếu cho chính mình
    let maBN;
    if (maNhom === "BENHNHAN") {
      maBN = maTK;
    } else {
      // Nếu là bác sĩ/admin → dùng maBN từ body
      if (!maBN_fromBody) {
        return res.status(400).json({ message: "Thiếu mã bệnh nhân" });
      }
      maBN = maBN_fromBody;
    }

    const newRecord = await PhieuXetNghiem.create({
      maPhieuXN: uuidv4(),
      maBN,
      maLoaiXN,
      ketQua: ketQua || null,
      trangThai: ketQua ? "hoan_thanh" : "cho_ket_qua",
      ngayYeuCau: new Date(),
    });

    res.status(201).json({ message: "Tạo phiếu xét nghiệm thành công", data: newRecord });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo phiếu xét nghiệm", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { ketQua } = req.body;

    const [updated] = await PhieuXetNghiem.update(
      { ketQua },
      { where: { maPhieu: req.params.id } }
    );

    if (updated === 0)
      return res.status(404).json({ message: "Không tìm thấy phiếu để cập nhật" });

    res.json({ message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const phieu = await PhieuXetNghiem.findByPk(req.params.id);
    if (!phieu)
      return res.status(404).json({ message: "Không tìm thấy phiếu" });

    res.json(phieu);
  } catch (error) {
    res.status(500).json({ message: "Lỗi truy xuất", error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await PhieuXetNghiem.destroy({ where: { maPhieu: req.params.id } });
    if (deleted === 0)
      return res.status(404).json({ message: "Không tìm thấy phiếu để xoá" });

    res.json({ message: "Xoá phiếu thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xoá", error: error.message });
  }
};
