const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const ThongTinDuocLy = require("../../models/ThongTinDuocLy");

/**
 * Lấy toàn bộ thông tin dược lý
 */
exports.getAll = async (req, res) => {
  try {
    const result = await ThongTinDuocLy.findAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách", error: err.message });
  }
};

/**
 * Tạo mới thông tin dược lý – chỉ ADMIN
 */
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { maThuoc, tacDungChinh, chiDinh, cachDung } = req.body;

    const newInfo = await ThongTinDuocLy.create({
      maTTDL: uuidv4(),
      maThuoc,
      tacDungChinh,
      chiDinh,
      cachDung,
    });

    res.status(201).json({ message: "Tạo thông tin dược lý thành công", data: newInfo });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi tạo", error: err.message });
  }
};

/**
 * Cập nhật thông tin dược lý – chỉ ADMIN
 */
exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { maTTDL } = req.params;
    const info = await ThongTinDuocLy.findByPk(maTTDL);

    if (!info)
      return res.status(404).json({ message: "Không tìm thấy thông tin dược lý cần cập nhật" });

    const { tacDungChinh, chiDinh, cachDung, maThuoc } = req.body;

    await info.update({ tacDungChinh, chiDinh, cachDung, maThuoc });

    res.json({ message: "Cập nhật thành công", data: info });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật", error: err.message });
  }
};

/**
 * Xóa thông tin dược lý – chỉ ADMIN
 */
exports.remove = async (req, res) => {
  try {
    const { maTTDL } = req.params;
    const info = await ThongTinDuocLy.findByPk(maTTDL);

    if (!info)
      return res.status(404).json({ message: "Không tìm thấy thông tin để xoá" });

    await info.destroy();
    res.json({ message: "Xoá thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xoá", error: err.message });
  }
};
