const PhanHoi = require("../../models/PhanHoi");
const BenhNhan = require("../../models/BenhNhan");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

exports.getAll = async (req, res) => {
  try {
    const { maBN, trangThai } = req.query;
    const where = {};
    if (maBN) where.maBN = maBN;
    if (trangThai) where.trangThai = trangThai;

    const phanHoiList = await PhanHoi.findAll({ where });
    res.status(200).json(phanHoiList);
  } catch (error) {
    res.status(500).json({ message: "Lỗi truy xuất", error: error.message });
  }
};

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const maBN = req.user.maTK; // Lấy từ token
    const { noiDung } = req.body;

    const phanHoi = await PhanHoi.create({
      maPH: uuidv4(),
      maBN,
      noiDung,
      trangThai: "cho_duyet", // Trạng thái mặc định khi tạo mới
    });

    res.status(201).json({ message: "Gửi phản hồi thành công", data: phanHoi });
  } catch (error) {
    res.status(500).json({ message: "Gửi phản hồi thất bại", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { noiDung, trangThai } = req.body;
    const [updated] = await PhanHoi.update(
      { noiDung, trangThai },
      { where: { maPH: req.params.maPH } }
    );

    if (updated === 0)
      return res.status(404).json({ message: "Không tìm thấy phản hồi" });

    res.json({ message: "Cập nhật phản hồi thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật", error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await PhanHoi.destroy({ where: { maPH: req.params.maPH } });
    if (deleted === 0)
      return res.status(404).json({ message: "Không tìm thấy để xoá" });

    res.json({ message: "Xoá phản hồi thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xoá", error: error.message });
  }
};
