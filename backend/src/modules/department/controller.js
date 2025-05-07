// src/modules/department/controller.js
const { KhoaPhong } = require("../../models");


/**
 * Lấy danh sách tất cả khoa phòng
 */
exports.getAll = async (req, res) => {
  try {
    const list = await KhoaPhong.findAll();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách khoa phòng" });
  }
};

/**
 * Tạo mới khoa phòng – ADMIN
 */
exports.create = async (req, res) => {
  try {
    const { maKhoa, tenKhoa, moTa } = req.body;

    // Kiểm tra trùng mã
    const existing = await KhoaPhong.findByPk(maKhoa);
    if (existing) {
      return res.status(400).json({ message: "Mã khoa đã tồn tại" });
    }

    const item = await KhoaPhong.create({ maKhoa, tenKhoa, moTa });
    res.status(201).json({ message: "Tạo khoa phòng thành công", data: item });
  } catch (err) {
    res.status(400).json({ error: "Thêm mới thất bại", details: err.message });
  }
};

/**
 * Cập nhật thông tin khoa – ADMIN
 */
exports.update = async (req, res) => {
  try {
    const { maKhoa } = req.params;

    const khoa = await KhoaPhong.findByPk(maKhoa);
    if (!khoa)
      return res.status(404).json({ message: "Không tìm thấy khoa cần cập nhật" });

    await khoa.update(req.body);

    res.json({ message: "Cập nhật thành công", data: khoa });
  } catch (err) {
    res.status(400).json({ error: "Cập nhật thất bại", details: err.message });
  }
};

/**
 * Xoá khoa phòng – ADMIN
 */
exports.remove = async (req, res) => {
  try {
    const { maKhoa } = req.params;

    const khoa = await KhoaPhong.findByPk(maKhoa);
    if (!khoa)
      return res.status(404).json({ message: "Không tìm thấy khoa cần xoá" });

    await khoa.destroy();

    res.json({ message: "Xoá khoa phòng thành công" });
  } catch (err) {
    res.status(500).json({ error: "Xoá thất bại", details: err.message });
  }
};
