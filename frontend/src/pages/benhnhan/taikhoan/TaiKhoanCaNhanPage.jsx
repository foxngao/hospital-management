import React, { useEffect, useState } from "react";
import { updateBenhNhan, getBenhNhanByMaTK } from "../../../services/benhnhan/taikhoanService";

const TaiKhoanCaNhanPage = () => {
  const maTK = localStorage.getItem("maTK");

  const [taiKhoan, setTaiKhoan] = useState({});
  const [benhNhan, setBenhNhan] = useState({
    hoTen: "", gioiTinh: "", ngaySinh: "", diaChi: "", soDienThoai: "", bhyt: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getBenhNhanByMaTK(maTK);
      const info = res.data.data;
      if (info?.ngaySinh) {
        info.ngaySinh = info.ngaySinh.split("T")[0];
      }
      setBenhNhan(info);
      setTaiKhoan(info.TaiKhoan || {});
    } catch (err) {
      console.error("❌ Lỗi lấy thông tin:", err);
    }
  };

  const handleChange = (e) => {
    setBenhNhan({ ...benhNhan, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateBenhNhan(benhNhan.maBN, benhNhan);
      alert("✅ Cập nhật thông tin thành công");
    } catch (err) {
      alert("❌ Cập nhật thất bại");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-blue-700">👤 Tài khoản cá nhân</h2>

      {/* Thông tin đăng nhập */}
      <div className="bg-white rounded shadow p-4 space-y-2">
        <h3 className="font-semibold text-gray-800">Thông tin đăng nhập</h3>
        <div><strong>Tên đăng nhập:</strong> {taiKhoan.tenDangNhap || "..."}</div>
        <div><strong>Email:</strong> {taiKhoan.email || "Chưa có"}</div>
        <div><strong>Trạng thái:</strong> {taiKhoan.trangThai ? "Đang hoạt động" : "Bị khoá"}</div>
      </div>

      {/* Thông tin cá nhân */}
      <div className="bg-white rounded shadow p-4 space-y-4">
        <h3 className="font-semibold text-gray-800">Thông tin cá nhân</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="hoTen"
            value={benhNhan.hoTen || ""}
            onChange={handleChange}
            placeholder="Họ tên"
            className="input"
          />

          <select
            name="gioiTinh"
            value={benhNhan.gioiTinh || ""}
            onChange={handleChange}
            className="input"
          >
            <option value="">-- Chọn giới tính --</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>

          <input
            type="date"
            name="ngaySinh"
            value={benhNhan.ngaySinh || ""}
            onChange={handleChange}
            className="input"
          />

          <input
            name="soDienThoai"
            value={benhNhan.soDienThoai || ""}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="input"
          />

          <input
            name="diaChi"
            value={benhNhan.diaChi || ""}
            onChange={handleChange}
            placeholder="Địa chỉ"
            className="input"
          />

          <input
            name="bhyt"
            value={benhNhan.bhyt || ""}
            onChange={handleChange}
            placeholder="Số BHYT"
            className="input"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          💾 Cập nhật thông tin
        </button>
      </div>
    </div>
  );
};

export default TaiKhoanCaNhanPage;
