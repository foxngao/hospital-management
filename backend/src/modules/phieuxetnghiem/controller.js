const db = require("../../models");
const { v4: uuidv4 } = require("uuid");
const Phieu = db.PhieuXetNghiem;
const YeuCau = db.YeuCauXetNghiem;
const XetNghiem = db.XetNghiem;
const NhanSuYTe = db.NhanSuYTe;
const HoSoBenhAn = db.HoSoBenhAn;
const LichKham = db.LichKham; // ✅ Bổ sung đúng model


exports.getAll = async (req, res) => {
  try {
    const list = await db.PhieuXetNghiem.findAll({
      include: [
        {
          model: db.YeuCauXetNghiem,
          as: "YeuCau"
        },
        {
          model: db.XetNghiem,
          as: "XetNghiem"
        },
        {
          model: db.NhanSuYTe,
          as: "NhanSuYTe"
        },
        {
          model: db.HoSoBenhAn,
          as: "HoSoBenhAn"
        }
      ],
      order: [["ngayThucHien", "DESC"]],
    });

    res.json({ success: true, data: list });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({
      success: false,
      message: "Lỗi lấy dữ liệu",
      error: err.message
    });
  }
};



exports.create = async (req, res) => {
  try {
    const { maYeuCau, maXN, maNS, maHSBA, ngayThucHien, ghiChu } = req.body;
    const maPhieuXN = uuidv4().slice(0, 8).toUpperCase();
    const created = await Phieu.create({ maPhieuXN, maYeuCau, maXN, maNS, maHSBA, ngayThucHien, ghiChu });
    res.status(201).json({ success: true, message: "Đã tạo phiếu xét nghiệm", data: created });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ success: false, message: "Lỗi tạo phiếu", error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { ketQua, ghiChu } = req.body;
    const [updated] = await Phieu.update({ ketQua, ghiChu }, {
      where: { maPhieuXN: req.params.id }
    });
    if (!updated) return res.status(404).json({ success: false, message: "Không tìm thấy phiếu" });
    res.json({ success: true, message: "Đã cập nhật kết quả phiếu" });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ success: false, message: "Lỗi cập nhật", error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Phieu.destroy({ where: { maPhieuXN: req.params.id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Không tìm thấy để xoá" });
    res.json({ success: true, message: "Đã xoá phiếu xét nghiệm" });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ success: false, message: "Lỗi xoá", error: err.message });
  }
};

// ✅ 1. Lấy danh sách theo mã HỒ SƠ BỆNH ÁN (maHSBA)
exports.getByMaHSBA = async (req, res) => {
  try {
    const maHSBA = req.params.maHSBA;

    const list = await db.PhieuXetNghiem.findAll({
      where: { maHSBA },
      include: [
        {
          model: db.XetNghiem,
          include: [db.LoaiXetNghiem]
        },
        {
          model: db.YeuCauXetNghiem
        },
        {
          model: db.HoSoBenhAn
        }
      ],
      order: [["ngayThucHien", "DESC"]]
    });

    res.json({ success: true, data: list });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "❌ Lỗi khi lấy danh sách phiếu theo mã hồ sơ",
      error: err.message
    });
  }
};



// ✅ 2. Đặt lịch xét nghiệm từ App bệnh nhân (đầy đủ theo model)

exports.createFromPatient = async (req, res) => {
  try {
    const {
      maXN,
      ngayThucHien,
      gioThucHien,
      ghiChu,
      maNS,
      maHSBA
    } = req.body;

    // ✅ 1. Truy ngược mã bệnh nhân từ mã hồ sơ
    const hoSo = await db.HoSoBenhAn.findOne({ where: { maHSBA } });
    if (!hoSo) {
      return res.status(404).json({ message: "❌ Không tìm thấy hồ sơ bệnh án tương ứng" });
    }
    const maBN = hoSo.maBN;

    // ✅ 2. Kiểm tra hợp lệ ngày/giờ
    const today = new Date();
    const ngay = new Date(ngayThucHien);
    if (ngay < new Date(today.setHours(0, 0, 0, 0))) {
      return res.status(400).json({ message: "❌ Không được chọn ngày trong quá khứ" });
    }

    const max = new Date();
    max.setDate(max.getDate() + 30);
    if (ngay > max) {
      return res.status(400).json({ message: "❌ Chỉ được đặt lịch trong vòng 30 ngày tới" });
    }

    if (ngay.getDay() === 0) {
      return res.status(400).json({ message: "❌ Không thể đặt lịch vào Chủ nhật hoặc ngày nghỉ" });
    }

    const gio = parseInt(gioThucHien.split(":")[0]);
    if (gio < 7 || gio > 11) {
      return res.status(400).json({ message: "❌ Xét nghiệm chỉ thực hiện từ 7h đến 11h sáng" });
    }

    // ✅ 3. Kiểm tra trùng phiếu
    const daDat = await db.PhieuXetNghiem.count({
      where: { maHSBA, ngayThucHien }
    });
    if (daDat >= 1) {
      return res.status(400).json({ message: "❌ Bạn chỉ được đặt một lịch xét nghiệm mỗi ngày" });
    }

    // ✅ 4. Kiểm tra trùng lịch khám
    const trungKham = await db.LichKham.findOne({
      where: { maBN, ngayKham: ngayThucHien, gioKham: gioThucHien }
    });
    if (trungKham) {
      return res.status(400).json({ message: "❌ Thời gian đã trùng với lịch khám" });
    }

    // ✅ 5. Tạo mã yêu cầu xét nghiệm mới
    const maYeuCau = "YC" + uuidv4().slice(0, 6).toUpperCase();
    await db.YeuCauXetNghiem.create({
      maYeuCau,
      maBN,
      maXN,
      ngayYeuCau: new Date(),
      ghiChu: ghiChu || null
    });

    // ✅ 6. Tạo phiếu xét nghiệm mới
    const maPhieuXN = uuidv4().slice(0, 8).toUpperCase();
    const phieu = await db.PhieuXetNghiem.create({
      maPhieuXN,
      maYeuCau,
      maXN,
      ngayThucHien,
      gioThucHien,
      ghiChu,
      maNS: maNS || null,
      maHSBA
    });

    return res.status(201).json({
      success: true,
      message: "✅ Đặt lịch xét nghiệm thành công",
      data: phieu
    });

  } catch (err) {
    console.error("❌ Lỗi khi đặt lịch:", err);
    return res.status(500).json({
      success: false,
      message: "❌ Lỗi server",
      error: err.message
    });
  }
};

exports.getByMonth = async (req, res) => {
  const dot = req.params.dotKhamBenh;
  try {
    const result = await db.PhieuXetNghiem.findAll({
      where: {
        ngayThucHien: {
          [Op.startsWith]: dot
        }
      }
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Lỗi truy xuất phiếu xét nghiệm", error: err.message });
  }
};

// ✅ Ghi đè cập nhật trạng thái phiếu
exports.updateTrangThai = async (req, res) => {
  const { maYeuCau, trangThai } = req.body;

  try {
    const yc = await db.YeuCauXetNghiem.findOne({ where: { maYeuCau } });
    if (!yc) return res.status(404).json({ success: false, message: "Không tìm thấy yêu cầu" });

    yc.trangThai = trangThai;
    await yc.save();

    return res.json({ success: true, message: "Đã cập nhật trạng thái phiếu" });
  } catch (err) {
    console.error("❌ Lỗi cập nhật trạng thái:", err);
    return res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
};


