const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const Thuoc = require("../../models/Thuoc");

/**
 * Lấy danh sách tất cả thuốc – có thể lọc theo mã nhóm, tên thuốc, giá
 */
exports.getAllMedicines = async (req, res) => {
  try {
    const { tenThuoc, maNhom, maxGia } = req.query;
    const where = {};

    if (tenThuoc) where.tenThuoc = { $like: `%${tenThuoc}%` };
    if (maNhom) where.maNhom = maNhom;
    if (maxGia) where.gia = { $lte: parseFloat(maxGia) };

    const list = await Thuoc.findAll({ where });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách thuốc", error: err.message });
  }
};

/**
 * Lấy chi tiết thuốc theo ID
 */
exports.getMedicineById = async (req, res) => {
  try {
    const thuoc = await Thuoc.findByPk(req.params.id);
    if (!thuoc)
      return res.status(404).json({ message: "Không tìm thấy thuốc" });

    res.json(thuoc);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi truy xuất", error: err.message });
  }
};

/**
 * Tạo mới thuốc – ADMIN hoặc PHARMACIST
 */
exports.createMedicine = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { tenThuoc, maNhom, donVi, gia, soLuong } = req.body;
    const newThuoc = await Thuoc.create({
      maThuoc: uuidv4(),
      tenThuoc,
      maNhom,
      donVi,
      gia,
      soLuong,
    });

    res.status(201).json({ message: "Thêm thuốc thành công", data: newThuoc });
  } catch (err) {
    res.status(500).json({ message: "Lỗi thêm thuốc", error: err.message });
  }
};

/**
 * Cập nhật thông tin thuốc – chỉ ADMIN
 */
exports.updateMedicine = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { id } = req.params;
    const thuoc = await Thuoc.findByPk(id);

    if (!thuoc)
      return res.status(404).json({ message: "Không tìm thấy thuốc để cập nhật" });

    const { tenThuoc, maNhom, donVi, gia, soLuong } = req.body;

    await thuoc.update({ tenThuoc, maNhom, donVi, gia, soLuong });

    res.json({ message: "Cập nhật thành công", data: thuoc });
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật", error: err.message });
  }
};

/**
 * Xoá thuốc – chỉ ADMIN
 */
exports.deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const thuoc = await Thuoc.findByPk(id);

    if (!thuoc)
      return res.status(404).json({ message: "Không tìm thấy thuốc để xoá" });

    await thuoc.destroy();
    res.json({ message: "Xoá thuốc thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi xoá thuốc", error: err.message });
  }
};
