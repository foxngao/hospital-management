import React, { useEffect, useState } from "react";
import dayjs from "dayjs"; // ✅ Thêm thư viện format ngày
import {
  getGioHang,
  addToGioHang,
  confirmGioHang,
  getMyHoaDon,
  getThanhToan,
  deleteItemGioHang,
  createThanhToan,
  updateTrangThaiHoaDon,
} from "../../../services/hoadon_BN/hoadonService";

import {
  getAllThuoc,
  getAllXetNghiem,
  getAllPhieuKham,
} from "../../../services/hoadon_BN/dichVuService";

const GioHangThanhToanPage = () => {
  const maBN = localStorage.getItem("maTK");
  const maNS = localStorage.getItem("maTK");

  const [gioHang, setGioHang] = useState([]);
  const [hoaDonList, setHoaDonList] = useState([]);
  const [chiTietThanhToan, setChiTietThanhToan] = useState([]);
  const [form, setForm] = useState({
    loaiDichVu: "",
    maDichVu: "",
    soLuong: 1,
    donGia: 0,
  });
  const [danhSachDichVu, setDanhSachDichVu] = useState([]);
  const [formTT, setFormTT] = useState({
    maHD: "",
    soTien: "",
    phuongThuc: "",
  });

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

  const handleLoaiDichVuChange = async (e) => {
    const loai = e.target.value;
    setForm({ ...form, loaiDichVu: loai, maDichVu: "", donGia: 0 });

    if (loai === "XETNGHIEM") {
      const res = await getAllXetNghiem();
      setDanhSachDichVu(res.data.data || []);
    } else if (loai === "THUOC") {
      const res = await getAllThuoc();
      setDanhSachDichVu(res.data.data || []);
    } else if (loai === "KHAM") {
      const res = await getAllPhieuKham();
      setDanhSachDichVu(res.data.data || []);
    } else {
      setDanhSachDichVu([]);
    }
  };

  const handleMaDichVuChange = (e) => {
    const ma = e.target.value;
    const selected =
      danhSachDichVu.find(
        (d) => d.maThuoc === ma || d.maXN === ma || d.maPK === ma
      ) || {};
    setForm((f) => ({
      ...f,
      maDichVu: ma,
      donGia: selected.giaBanLe || selected.chiPhi || 0,
    }));
  };

  const handleAddToGio = async () => {
    const thanhTien = form.soLuong * form.donGia;
    await addToGioHang({ ...form, maBN, thanhTien });
    loadGioHang();
  };

  const handleXacNhan = async () => {
    if (!maNS) {
      alert("❌ Thiếu mã nhân sự (maNS)");
      return;
    }
    await confirmGioHang({ maBN, maNS });
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
    await updateTrangThaiHoaDon(formTT.maHD, {
      trangThai: "DA_THANH_TOAN",
    });
    setFormTT({ maHD: "", soTien: "", phuongThuc: "" });
    loadHoaDon();
    handleXemChiTiet(formTT.maHD); // ✅ Cập nhật chi tiết sau thanh toán
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">🛒 Giỏ hàng & thanh toán</h2>

      {/* Form thêm dịch vụ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 shadow rounded">
        <select
          name="loaiDichVu"
          onChange={handleLoaiDichVuChange}
          value={form.loaiDichVu}
          className="border px-2 py-1 rounded"
        >
          <option value="">-- Loại dịch vụ --</option>
          <option value="KHAM">Khám</option>
          <option value="XETNGHIEM">Xét nghiệm</option>
          <option value="THUOC">Thuốc</option>
        </select>

        <select
          name="maDichVu"
          value={form.maDichVu}
          onChange={handleMaDichVuChange}
          className="border px-2 py-1 rounded"
        >
          <option value="">-- Chọn dịch vụ --</option>
          {danhSachDichVu.map((item) => (
            <option
              key={item.maThuoc || item.maXN || item.maPK}
              value={item.maThuoc || item.maXN || item.maPK}
            >
              {item.tenThuoc || item.tenXN || item.maPK}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="soLuong"
          value={form.soLuong}
          onChange={handleChange}
          className="border px-2 py-1 rounded"
          placeholder="Số lượng"
        />
        <input
          type="number"
          name="donGia"
          value={form.donGia}
          onChange={handleChange}
          className="border px-2 py-1 rounded"
          placeholder="Đơn giá"
        />
        <button
          onClick={handleAddToGio}
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-2"
        >
          ➕ Thêm vào giỏ
        </button>
      </div>

      {/* Giỏ hàng */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">1️⃣ Giỏ hàng dịch vụ</h3>
        <table className="w-full text-sm border">
          <thead>
            <tr>
              <th>Loại</th>
              <th>Mã DV</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {gioHang.map((item, i) => (
              <tr key={i} className="border-t">
                <td>{item.loaiDichVu}</td>
                <td>{item.maDichVu}</td>
                <td>{item.soLuong}</td>
                <td>{item.donGia}</td>
                <td>{item.thanhTien}</td>
                <td>
                  <button
                    onClick={() => handleXoaItem(item.maCTGH)}
                    className="text-red-600 hover:underline"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleXacNhan}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          ✅ Xác nhận giỏ hàng
        </button>
      </div>

      {/* Hóa đơn */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">2️⃣ Danh sách hóa đơn</h3>
        <table className="w-full text-sm border">
          <thead>
            <tr>
              <th>Mã HD</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày lập</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {hoaDonList.map((hd) => (
              <tr key={hd.maHD} className="border-t">
                <td>{hd.maHD}</td>
                <td>{hd.tongTien}</td>
                <td>{hd.trangThai}</td>
                <td>{dayjs(hd.ngayLap).format("DD/MM/YYYY HH:mm")}</td>
                <td>
                  <button
                    onClick={() => handleXemChiTiet(hd.maHD)}
                    className="text-blue-600 hover:underline"
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Thanh toán */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">💸 Gửi thanh toán</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Mã hoá đơn (maHD)"
            value={formTT.maHD}
            onChange={(e) => handleMaHDChange(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <input
            type="number"
            placeholder="Số tiền"
            value={formTT.soTien}
            disabled
            className="border px-2 py-1 rounded bg-gray-100"
          />
          <select
            value={formTT.phuongThuc}
            onChange={(e) =>
              setFormTT({ ...formTT, phuongThuc: e.target.value })
            }
            className="border px-2 py-1 rounded"
          >
            <option value="">-- Phương thức --</option>
            <option value="TIEN_MAT">Tiền mặt</option>
            <option value="CHUYEN_KHOAN">Chuyển khoản</option>
          </select>
          <button
            onClick={handleThanhToan}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            💳 Thanh toán
          </button>
        </div>
      </div>

      {/* Chi tiết thanh toán */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">3️⃣ Chi tiết thanh toán</h3>
        <table className="w-full text-sm border">
          <thead>
            <tr>
              <th>Mã TT</th>
              <th>Mã HD</th>
              <th>Số tiền</th>
              <th>Phương thức</th>
            </tr>
          </thead>
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
