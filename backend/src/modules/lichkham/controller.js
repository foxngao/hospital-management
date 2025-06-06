const { LichKham, BacSi, BenhNhan,khoaKham } = require("../../models");
const { v4: uuidv4 } = require("uuid");

//  Lấy toàn bộ lịch khám
exports.getAll = async (req, res) => {
  try {
    const data = await LichKham.findAll({
      include: [
        { model: BacSi, attributes: ["hoTen"] },
        { model: BenhNhan, attributes: ["hoTen"] }
      ]
    });
    res.json({ message: "Lấy danh sách lịch khám", data });
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy lịch khám", error: err.message });
  }
};

//  Tạo lịch khám mới
exports.create = async (req, res) => {
  try {
    const { maBN, maBS, ngayKham, gioKham,tenKhoa, phong, ghiChu } = req.body;

    const today = new Date();
    const inputDate = new Date(ngayKham);

    // ⚠️ 1. Không chọn ngày quá khứ
    if (inputDate < today.setHours(0, 0, 0, 0)) {
      return res.status(400).json({ message: "❌ Không được chọn ngày trong quá khứ" });
    }

    // ⚠️ 2. Không vượt quá 30 ngày
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    if (inputDate > maxDate) {
      return res.status(400).json({ message: "❌ Chỉ được đặt lịch trong vòng 30 ngày tới" });
    }

    // ⚠️ 3. Không đặt vào Chủ nhật
    if (inputDate.getDay() === 0) {
      return res.status(400).json({ message: "❌ Không thể đặt lịch vào Chủ nhật" });
    }

    // ⚠️ 4. Không ngoài giờ hành chính
    const gioInt = parseInt(gioKham.split(":")[0], 10);
    if (gioInt < 7 || gioInt > 17) {
      return res.status(400).json({ message: "❌ Chỉ được đặt lịch trong giờ hành chính (7h-17h)" });
    }

    // ⚠️ 5. Không được đặt trùng ca khám
    const exists = await LichKham.findOne({
      where: { maBS, ngayKham, gioKham }
    });
    if (exists) {
      return res.status(400).json({ message: "❌ Ca khám đã được đặt trước" });
    }

    // ⚠️ 6. Giới hạn 10 lượt/ca
    const soCa = await LichKham.count({ where: { maBS, ngayKham, gioKham } });
    if (soCa >= 10) {
      return res.status(400).json({ message: "❌ Ca khám đã đủ số lượng" });
    }

    // ⚠️ 7. Mỗi bệnh nhân tối đa 2 lịch/ngày
    const daDat = await LichKham.count({ where: { maBN, ngayKham } });
    if (daDat >= 2) {
      return res.status(400).json({ message: "❌ Bạn không được đặt quá 2 lịch hẹn trong cùng một ngày" });
    }

    // ✅ OK – Tạo lịch mới
    const maLich = uuidv4().slice(0, 8).toUpperCase();
    const lich = await LichKham.create({ maLich, maBN, maBS, ngayKham, gioKham,tenKhoa, phong, ghiChu });

    res.status(201).json({ message: "✅ Tạo lịch khám thành công", data: lich });

  } catch (err) {
    console.error("❌ Lỗi tạo lịch khám:", err);
    res.status(500).json({ message: "❌ Lỗi tạo lịch khám", error: err.message });
  }
};

exports.getByMaBN = async (req, res) => {
  try {
    const data = await LichKham.findAll({
      where: { maBN: req.params.maBN },
      include: [
        { model: BacSi, attributes: ["hoTen"] },
        { model: BenhNhan, attributes: ["hoTen"] }
      ]
    });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy lịch theo maBN", error: err.message });
  }
};



//  Cập nhật lịch
exports.update = async (req, res) => {
  try {
    const { ngayKham, gioKham, phong, ghiChu } = req.body;
    const [updated] = await LichKham.update(
      { ngayKham, gioKham, phong, ghiChu },
      { where: { maLich: req.params.id } }
    );
    if (updated === 0)
      return res.status(404).json({ message: "Không tìm thấy lịch để cập nhật" });

    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật lịch khám", error: err.message });
  }
};

//  Xoá lịch
exports.remove = async (req, res) => {
  try {
    const deleted = await LichKham.destroy({ where: { maLich: req.params.id } });
    if (deleted === 0)
      return res.status(404).json({ message: "Không tìm thấy lịch để xoá" });
    res.json({ message: "Xoá thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi xoá lịch khám", error: err.message });
  }
};

// KIỂM TRA TRÙNG LỊCH
exports.checkTrungLich = async (req, res) => {
  try {
    const { maBS, ngay, gio } = req.query;

    const exists = await LichKham.findOne({
      where: {
        maBS,
        ngayKham: ngay,
        gioKham: gio
      }
    });

    res.json({ trung: !!exists });
  } catch (err) {
    res.status(500).json({ message: "Lỗi kiểm tra lịch", error: err.message });
  }
};
