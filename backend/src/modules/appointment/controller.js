const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const { LichHen, BacSi, BenhNhan, CaKham } = require("../../models");

/**
 * Tạo lịch hẹn mới (chỉ dành cho bệnh nhân hoặc admin)
 */
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { maBS, maCa, ngayHen, ghiChu } = req.body;
  const maBN = req.user?.maTK; // lấy từ JWT (nếu là bệnh nhân)

  try {
    const maLH = uuidv4();

    const lichHen = await LichHen.create({
      maLH,
      maBN,
      maBS,
      maCa,
      ngayHen,
      ghiChu,
      trangThai: "ChoXacNhan",
    });

    res.status(201).json({ message: "Tạo lịch hẹn thành công", data: lichHen });
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo lịch hẹn", error: error.message });
  }
  await sendNotification({
  maNguoiNhan: maBN, // lấy từ req.body hoặc req.user
  tieuDe: "Lịch khám mới đã được xác nhận",
  noiDung: `Bạn đã đặt lịch khám lúc ${thoiGian} tại khoa ${tenKhoa}`,
    });
};

/**
 * Lấy tất cả lịch hẹn – role-based
 * - ADMIN: xem tất cả
 * - BACSI: chỉ lịch của bác sĩ hiện tại
 * - BENHNHAN: chỉ lịch của bệnh nhân hiện tại
 */
exports.getAll = async (req, res) => {
  const { maNhom, maTK } = req.user;

  try {
    let where = {};

    if (maNhom === "BACSI") {
      where.maBS = maTK;
    } else if (maNhom === "BENHNHAN") {
      where.maBN = maTK;
    }

    const dsLichHen = await LichHen.findAll({
      where,
      include: [
        { model: BacSi, attributes: ["maBS", "hoTen"] },
        { model: BenhNhan, attributes: ["maBN", "hoTen"] },
        { model: CaKham },
      ],
    });

    res.status(200).json(dsLichHen);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy lịch hẹn", error: error.message });
  }
};

/**
 * Lấy 1 lịch hẹn theo ID – kiểm tra quyền truy cập
 */
exports.getById = async (req, res) => {
  try {
    const lichHen = await LichHen.findByPk(req.params.id);

    if (!lichHen)
      return res.status(404).json({ message: "Không tìm thấy lịch hẹn" });

    // Kiểm tra quyền truy cập
    const { maNhom, maTK } = req.user;
    if (
      maNhom === "BENHNHAN" && lichHen.maBN !== maTK ||
      maNhom === "BACSI" && lichHen.maBS !== maTK
    ) {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }

    res.status(200).json(lichHen);
  } catch (error) {
    res.status(500).json({ message: "Lỗi truy vấn", error: error.message });
  }
};

/**
 * Cập nhật lịch hẹn – chỉ admin hoặc bác sĩ
 */
exports.update = async (req, res) => {
  try {
    const { maBS, maCa, ngayHen, ghiChu, trangThai } = req.body;

    const [updated] = await LichHen.update(
      { maBS, maCa, ngayHen, ghiChu, trangThai },
      { where: { maLH: req.params.id } }
    );

    if (updated === 0)
      return res.status(404).json({ message: "Không tìm thấy lịch hẹn để cập nhật" });

    res.json({ message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật", error: error.message });
  }
};

/**
 * Xoá lịch hẹn – chỉ dành cho admin
 */
exports.remove = async (req, res) => {
  try {
    const deleted = await LichHen.destroy({ where: { maLH: req.params.id } });

    if (deleted === 0)
      return res.status(404).json({ message: "Không tìm thấy lịch hẹn để xoá" });

    res.json({ message: "Xoá thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xoá", error: error.message });
  }
};
