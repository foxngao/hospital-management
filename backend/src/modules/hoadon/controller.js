// CONTROLLER: Xử lý logic quản lý hóa đơn, thanh toán, giỏ hàng
const { v4: uuidv4 } = require("uuid");
const { HoaDon, ChiTietHoaDon, ThanhToan, GioHang, ChiTietGioHang } = require("./model");

// ---------------- HOÁ ĐƠN ----------------
exports.getAllHoaDon = async (req, res) => {
  try {
    const ds = await HoaDon.findAll({ order: [["ngayLap", "DESC"]] });
    res.json({ message: "Lấy danh sách hóa đơn", data: ds });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi lấy danh sách hóa đơn", error: err.message });
  }
};

exports.createHoaDon = async (req, res) => {
  try {
    const { maBN, maNS, tongTien, trangThai } = req.body;
    const maHD = uuidv4().slice(0, 8).toUpperCase();

    const hoaDon = await HoaDon.create({ maHD, maBN, maNS, tongTien, trangThai });
    res.status(201).json({ message: "Tạo hóa đơn thành công", data: hoaDon });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi tạo hóa đơn", error: err.message });
  }
};

// ---------------- CHI TIẾT HOÁ ĐƠN ----------------
exports.addChiTietHD = async (req, res) => {
  try {
    const { maHD, loaiDichVu, maDichVu, donGia, soLuong, thanhTien } = req.body;
    const maCTHD = uuidv4().slice(0, 8).toUpperCase();

    const ct = await ChiTietHoaDon.create({ maCTHD, maHD, loaiDichVu, maDichVu, donGia, soLuong, thanhTien });
    res.status(201).json({ message: "Thêm chi tiết hóa đơn thành công", data: ct });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi thêm chi tiết", error: err.message });
  }
};

// ---------------- THANH TOÁN ----------------
exports.createThanhToan = async (req, res) => {
  try {
    const { maHD, soTien, phuongThuc } = req.body;
    const maTT = uuidv4().slice(0, 8).toUpperCase();

    const tt = await ThanhToan.create({ maTT, maHD, soTien, phuongThuc });
    res.status(201).json({ message: "Ghi nhận thanh toán thành công", data: tt });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi tạo thanh toán", error: err.message });
  }
};

// ---------------- GIỎ HÀNG ----------------
exports.getGioHang = async (req, res) => {
  try {
    const { maBN } = req.params;
    const gh = await GioHang.findOne({ where: { maBN } });
    if (!gh) return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });

    const chiTiet = await ChiTietGioHang.findAll({ where: { maGH: gh.maGH } });
    res.json({ message: "Lấy giỏ hàng thành công", data: { gioHang: gh, chiTiet } });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi lấy giỏ hàng", error: err.message });
  }
};

exports.addToGioHang = async (req, res) => {
  try {
    const { maBN, loaiDichVu, maDichVu } = req.body;

    let gioHang = await GioHang.findOne({ where: { maBN } });
    if (!gioHang) {
      const maGH = uuidv4().slice(0, 8).toUpperCase();
      gioHang = await GioHang.create({ maGH, maBN });
    }

    const maCTGH = uuidv4().slice(0, 8).toUpperCase();
    const item = await ChiTietGioHang.create({
      maCTGH, maGH: gioHang.maGH, loaiDichVu, maDichVu,
    });

    res.status(201).json({ message: "Thêm vào giỏ hàng thành công", data: item });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi thêm giỏ hàng", error: err.message });
  }
};
// ---------------- CẬP NHẬT TRẠNG THÁI HOÁ ĐƠN ----------------
exports.updateTrangThai = async (req, res) => {
  try {
    const { maHD } = req.params;
    const { trangThai } = req.body;

    const result = await HoaDon.update(
      { trangThai },
      { where: { maHD } }
    );

    if (result[0] === 0) {
      return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
    }

    res.json({ message: "Cập nhật trạng thái thành công" });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi cập nhật trạng thái", error: err.message });
  }
};
