const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const TroLyBacSi = require("../../models/TroLyBacSi");

/**
 * Lấy danh sách trợ lý bác sĩ:
 * - ADMIN: thấy tất cả
 * - BACSI: chỉ thấy trợ lý của chính mình (maBacSi = maTK)
 */
exports.getAll = async (req, res) => {
  try {
    const { maNhom, maTK } = req.user;

    const condition = maNhom === "BACSI" ? { maBacSi: maTK } : {};

    const danhSach = await TroLyBacSi.findAll({
      where: condition,
    });

    res.status(200).json(danhSach);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi truy xuất danh sách trợ lý",
      error: error.message,
    });
  }
};

/**
 * Tạo mới trợ lý bác sĩ – ADMIN
 */
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const maTroLy = uuidv4();
    const { maNS, maBacSi, phamViUyQuyen } = req.body;

    const newAssistant = await TroLyBacSi.create({
      maTroLy,
      maNS,
      maBacSi,
      phamViUyQuyen,
    });

    res.status(201).json({
      message: "Thêm trợ lý thành công",
      data: newAssistant,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm trợ lý",
      error: error.message,
    });
  }
};

/**
 * Cập nhật trợ lý bác sĩ – ADMIN
 */
exports.update = async (req, res) => {
  try {
    const { maNS, maBacSi, phamViUyQuyen } = req.body;
    const { maTroLy } = req.params;

    const [updated] = await TroLyBacSi.update(
      { maNS, maBacSi, phamViUyQuyen },
      { where: { maTroLy } }
    );

    if (updated === 0)
      return res.status(404).json({ message: "Không tìm thấy trợ lý để cập nhật" });

    res.json({ message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật", error: error.message });
  }
};

/**
 * Xoá trợ lý bác sĩ – ADMIN
 */
exports.remove = async (req, res) => {
  try {
    const { maTroLy } = req.params;

    const deleted = await TroLyBacSi.destroy({
      where: { maTroLy },
    });

    if (deleted === 0)
      return res.status(404).json({ message: "Không tìm thấy trợ lý để xoá" });

    res.json({ message: "Xoá thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xoá", error: error.message });
  }
};
