const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const TinTuc = require("../../models/TinTuc");

/**
 * Lấy danh sách bài viết – có filter
 */
exports.getAll = async (req, res) => {
  try {
    const { ngay, tieuDe, maNS } = req.query;
    const where = {};

    if (ngay) where.ngayDang = ngay;
    if (maNS) where.maNS = maNS;
    if (tieuDe) where.tieuDe = { [Op.like]: `%${tieuDe}%` };

    const danhSach = await TinTuc.findAll({ where });
    res.json(danhSach);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi truy xuất danh sách bài viết",
      error: error.message,
    });
  }
};

/**
 * Tạo bài viết mới – người đăng là user hiện tại
 */
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { tieuDe, noiDung } = req.body;
    const maNS = req.user.maTK;

    const tinTuc = await TinTuc.create({
      maTin: uuidv4(),
      tieuDe,
      noiDung,
      ngayDang: new Date(),
      maNS,
    });

    res.status(201).json({ message: "Tạo tin tức thành công", data: tinTuc });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo tin tức", error: error.message });
  }
};

/**
 * Cập nhật bài viết – chỉ người viết hoặc ADMIN
 */
exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { maTin } = req.params;
    const { tieuDe, noiDung } = req.body;
    const { maTK, maNhom } = req.user;

    const tin = await TinTuc.findByPk(maTin);
    if (!tin)
      return res.status(404).json({ message: "Không tìm thấy bài viết cần cập nhật" });

    const isOwner = tin.maNS === maTK;
    const isAdmin = maNhom === "ADMIN";

    if (!isOwner && !isAdmin)
      return res.status(403).json({ message: "Bạn không có quyền sửa bài viết này" });

    await tin.update({ tieuDe, noiDung });

    res.json({ message: "Cập nhật bài viết thành công", data: tin });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật bài viết", error: error.message });
  }
};

/**
 * Xóa bài viết – chỉ ADMIN
 */
exports.remove = async (req, res) => {
  try {
    const { maTin } = req.params;

    const tin = await TinTuc.findByPk(maTin);
    if (!tin)
      return res.status(404).json({ message: "Không tìm thấy bài viết để xoá" });

    await tin.destroy();

    res.json({ message: "Xoá bài viết thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xoá bài viết", error: error.message });
  }
};
