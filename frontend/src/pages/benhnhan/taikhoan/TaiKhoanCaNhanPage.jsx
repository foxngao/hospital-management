import React, { useEffect, useState } from "react";
import {
  getAllBenhNhan,
  updateBenhNhan,
} from "../../../services/benhnhan/taikhoanService";

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
    const res = await getAllBenhNhan();
    const info = res.data.data?.find(bn => bn.maBN === maTK);
    if (info) {
      setBenhNhan(info);
      setTaiKhoan(info.TaiKhoan || {});
    }
  };

  const handleChange = (e) => {
    setBenhNhan({ ...benhNhan, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updateBenhNhan(maTK, benhNhan);
    alert("✅ Cập nhật thông tin cá nhân thành công");
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-blue-700">👤 Tài khoản cá nhân</h2>

      {/* Thông tin tài khoản */}
      <div className="bg-white rounded shadow p-4 space-y-2">
        <h3 className="font-semibold text-gray-800">Thông tin đăng nhập</h3>
        <div><strong>Tên đăng nhập:</strong> {taiKhoan.tenDangNhap}</div>
        <div><strong>Email:</strong> {taiKhoan.email}</div>
        <div><strong>Trạng thái:</strong> {taiKhoan.trangThai ? "Đang hoạt động" : "Bị khoá"}</div>
        
      </div>

      {/* Thông tin cá nhân */}
      <div className="bg-white rounded shadow p-4 space-y-4">
        <h3 className="font-semibold text-gray-800">Thông tin cá nhân</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="hoTen" value={benhNhan.hoTen} onChange={handleChange} placeholder="Họ tên" className="input" />
          <input name="gioiTinh" value={benhNhan.gioiTinh} onChange={handleChange} placeholder="Giới tính" className="input" />
          <input type="date" name="ngaySinh" value={benhNhan.ngaySinh} onChange={handleChange} className="input" />
          <input name="soDienThoai" value={benhNhan.soDienThoai} onChange={handleChange} placeholder="Số điện thoại" className="input" />
          <input name="diaChi" value={benhNhan.diaChi} onChange={handleChange} placeholder="Địa chỉ" className="input" />
          <input name="bhyt" value={benhNhan.bhyt} onChange={handleChange} placeholder="Số BHYT" className="input" />
        </div>
        <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">
          💾 Cập nhật thông tin
        </button>
      </div>
    </div>
  );
};

export default TaiKhoanCaNhanPage;
