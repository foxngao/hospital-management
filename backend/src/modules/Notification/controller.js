const { v4: uuidv4 } = require("uuid");
const ThongBao = require("./model");

/**
 * Lấy danh sách thông báo của người dùng hiện tại
 */
exports.getAll = async (req, res) => {
  try {
    const { maTK } = req.user;
    const { daDoc } = req.query;

    const whereClause = { maNguoiNhan: maTK };
    if (daDoc === "true") whereClause.daDoc = true;
    if (daDoc === "false") whereClause.daDoc = false;

    const data = await ThongBao.findAll({
      where: whereClause,
      order: [["thoiGian", "DESC"]],
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông báo", error: error.message });
  }
};


/**
 * Tạo thông báo mới – dùng nội bộ hệ thống
 */
exports.create = async (req, res) => {
  try {
    const { tieuDe, noiDung, maNguoiNhan, loaiThongBao } = req.body;

    const newItem = await ThongBao.create({
      maTB: uuidv4(),
      tieuDe,
      noiDung,
      maNguoiNhan,
      loaiThongBao: loaiThongBao || "ca_nhan",
    });

    res.status(201).json({ message: "Tạo thông báo thành công", data: newItem });
  } catch (error) {
    res.status(500).json({ message: "Tạo thất bại", error: error.message });
  }
};

/**
 * Đánh dấu đã đọc thông báo
 */
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { maTK } = req.user;

    const tb = await ThongBao.findByPk(id);
    if (!tb) return res.status(404).json({ message: "Không tìm thấy thông báo" });

    if (tb.maNguoiNhan !== maTK)
      return res.status(403).json({ message: "Bạn không có quyền cập nhật thông báo này" });

    tb.daDoc = true;
    await tb.save();

    res.json({ message: "Đã đánh dấu là đã đọc", data: tb });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật", error: error.message });
  }
};
