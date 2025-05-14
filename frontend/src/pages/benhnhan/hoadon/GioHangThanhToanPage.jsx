import React, { useEffect, useState } from "react";
import {
  getGioHang,
  addToGioHang,
  confirmGioHang,
  getMyHoaDon,
  getThanhToan,
  deleteItemGioHang,
  createThanhToan,
  updateTrangThaiHoaDon
} from "../../../services/hoadon_BN/hoadonService";

const GioHangThanhToanPage = () => {
  const maBN = localStorage.getItem("maTK");
  const [gioHang, setGioHang] = useState([]);
  const [hoaDonList, setHoaDonList] = useState([]);
  const [chiTietThanhToan, setChiTietThanhToan] = useState([]);
  const [form, setForm] = useState({ loaiDichVu: "", maDichVu: "", soLuong: 1, donGia: 0 });
  const [formTT, setFormTT] = useState({ maHD: "", soTien: "", phuongThuc: "" });

  useEffect(() => {
    if (maBN) {
      loadGioHang();
      loadHoaDon();
    }
  }, [maBN]);

  const loadGioHang = async () => {
    try {
      const res = await getGioHang(maBN);
      setGioHang(res.data.data?.chiTiet || []);
    } catch {
      setGioHang([]);
    }
  };

  const loadHoaDon = async () => {
    const res = await getMyHoaDon(maBN);
    setHoaDonList(res.data.data || []);
  };

  const handleAddToGio = async () => {
    const thanhTien = form.soLuong * form.donGia;
    await addToGioHang({ ...form, maBN, thanhTien });
    loadGioHang();
  };

  const handleXacNhan = async () => {
    await confirmGioHang({ maBN });
    loadGioHang();
    loadHoaDon();
  };

  const handleXemChiTiet = async (maHD) => {
    const res = await getThanhToan(maHD);
    setChiTietThanhToan(res.data.data || []);
  };

  const handleXoaItem = async (id) => {
    if (window.confirm("Xoá dòng này khỏi giỏ hàng?")) {
      await deleteItemGioHang(id);
      loadGioHang();
    }
  };

  const handleThanhToan = async () => {
    await createThanhToan(formTT);
    await updateTrangThaiHoaDon(formTT.maHD, { trangThai: "DA_THANH_TOAN" });
    setFormTT({ maHD: "", soTien: "", phuongThuc: "" });
    loadHoaDon();
    alert("✅ Thanh toán thành công!");
  };

  const handleMaHDChange = (value) => {
    const selected = hoaDonList.find((hd) => hd.maHD === value);
    if (selected) {
      setFormTT({ ...formTT, maHD: value, soTien: selected.tongTien });
    } else {
      setFormTT({ ...formTT, maHD: value, soTien: "" });
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">🛒 Giỏ hàng & thanh toán</h2>

      {/* Form thêm dịch vụ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 shadow rounded">
        <select name="loaiDichVu" onChange={handleChange} className="input">
          <option value="">-- Loại dịch vụ --</option>
          <option value="KHAM">Khám</option>
          <option value="XETNGHIEM">Xét nghiệm</option>
          <option value="THUOC">Thuốc</option>
        </select>
        <input name="maDichVu" onChange={handleChange} className="input" placeholder="Mã dịch vụ" />
        <input type="number" name="soLuong" onChange={handleChange} className="input" placeholder="Số lượng" />
        <input type="number" name="donGia" onChange={handleChange} className="input" placeholder="Đơn giá" />
        <button onClick={handleAddToGio} className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">
          ➕ Thêm vào giỏ
        </button>
      </div>

      {/* 1️⃣ Giỏ hàng */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">1️⃣ Giỏ hàng dịch vụ</h3>
        <table className="w-full text-sm border">
          <thead><tr><th>Loại</th><th>Mã DV</th><th>Số lượng</th><th>Đơn giá</th><th>Thành tiền</th><th></th></tr></thead>
          <tbody>
            {gioHang.map((item, i) => (
              <tr key={i} className="border-t">
                <td>{item.loaiDichVu}</td>
                <td>{item.maDichVu}</td>
                <td>{item.soLuong}</td>
                <td>{item.donGia}</td>
                <td>{item.thanhTien}</td>
                <td>
                  <button onClick={() => handleXoaItem(item.maCTGH)} className="text-red-600 hover:underline">
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleXacNhan} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
          ✅ Xác nhận giỏ hàng
        </button>
      </div>

      {/* 2️⃣ Hóa đơn */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">2️⃣ Danh sách hóa đơn</h3>
        <table className="w-full text-sm border">
          <thead><tr><th>Mã HD</th><th>Tổng tiền</th><th>Trạng thái</th><th>Ngày lập</th><th></th></tr></thead>
          <tbody>
            {hoaDonList.map((hd) => (
              <tr key={hd.maHD} className="border-t">
                <td>{hd.maHD}</td>
                <td>{hd.tongTien}</td>
                <td>{hd.trangThai}</td>
                <td>{hd.ngayLap}</td>
                <td><button onClick={() => handleXemChiTiet(hd.maHD)} className="text-blue-600 hover:underline">Chi tiết</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 💸 Form thanh toán */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">💸 Gửi thanh toán</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Mã hoá đơn (maHD)"
            value={formTT.maHD}
            onChange={(e) => handleMaHDChange(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Số tiền"
            value={formTT.soTien}
            disabled
            className="input bg-gray-100"
          />
          <select
            value={formTT.phuongThuc}
            onChange={(e) => setFormTT({ ...formTT, phuongThuc: e.target.value })}
            className="input"
          >
            <option value="">-- Phương thức --</option>
            <option value="TIEN_MAT">Tiền mặt</option>
            <option value="CHUYEN_KHOAN">Chuyển khoản</option>
          </select>
          <button onClick={handleThanhToan} className="bg-purple-600 text-white px-4 py-2 rounded">
            💳 Thanh toán
          </button>
        </div>
      </div>

      {/* 3️⃣ Chi tiết thanh toán */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">3️⃣ Chi tiết thanh toán</h3>
        <table className="w-full text-sm border">
          <thead><tr><th>Mã TT</th><th>Mã HD</th><th>Số tiền</th><th>Phương thức</th></tr></thead>
          <tbody>
            {chiTietThanhToan.map((tt) => (
              <tr key={tt.maTT} className="border-t">
                <td>{tt.maTT}</td>
                <td>{tt.maHD}</td>
                <td>{tt.soTien}</td>
                <td>{tt.phuongThuc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GioHangThanhToanPage;
