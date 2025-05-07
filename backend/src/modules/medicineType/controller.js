const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const NhomThuoc = require("./model");

/**
 * Lấy tất cả nhóm thuốc
 */
exports.getAll = async (req, res) => {
  try {
    const data = await NhomThuoc.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách nhóm thuốc" });
  }
};

/**
 * Tạo mới nhóm thuốc – chỉ ADMIN
 */
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { tenNhom, moTa } = req.body;
    const newItem = await NhomThuoc.create({
      maNhom: uuidv4(),
      tenNhom,
      moTa,
    });

    res.status(201).json({ message: "Tạo nhóm thuốc thành công", data: newItem });
  } catch (err) {
    res.status(500).json({ error: "Tạo thất bại", details: err.message });
  }
};

/**
 * Cập nhật nhóm thuốc – chỉ ADMIN
 */
exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { maNhom } = req.params;
    const { tenNhom, moTa } = req.body;

    const nhom = await NhomThuoc.findByPk(maNhom);
    if (!nhom)
      return res.status(404).json({ message: "Không tìm thấy nhóm thuốc để cập nhật" });

    await nhom.update({ tenNhom, moTa });

    res.json({ message: "Cập nhật thành công", data: nhom });
  } catch (err) {
    res.status(500).json({ error: "Cập nhật thất bại", details: err.message });
  }
};

/**
 * Xoá nhóm thuốc – chỉ ADMIN
 */
exports.remove = async (req, res) => {
  try {
    const { maNhom } = req.params;
    const nhom = await NhomThuoc.findByPk(maNhom);

    if (!nhom)
      return res.status(404).json({ message: "Không tìm thấy nhóm thuốc để xoá" });

    await nhom.destroy();
    res.json({ message: "Xoá nhóm thuốc thành công" });
  } catch (err) {
    res.status(500).json({ error: "Xoá thất bại", details: err.message });
  }
};
