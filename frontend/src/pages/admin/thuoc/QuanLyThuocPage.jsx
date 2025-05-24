import React, { useEffect, useState } from "react";
import {
  getAllThuoc,
  createThuoc,
  updateThuoc,
  deleteThuoc,
  getOneThuoc,
} from "../../../services/thuoc/thuocService";

import {
  getAllNhomThuoc
} from "../../../services/thuoc/nhomthuocService";

import {
  getAllDonViTinh
} from "../../../services/thuoc/donvitinhService";

const QuanLyThuocPage = () => {
  const [thuocList, setThuocList] = useState([]);
  const [formData, setFormData] = useState({});
  const [nhomThuocList, setNhomThuocList] = useState([]);
  const [donViTinhList, setDonViTinhList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const fetchData = async () => {
    const [dsThuoc, dsNhom, dsDonVi] = await Promise.all([
      getAllThuoc(), getAllNhomThuoc(), getAllDonViTinh()
    ]);
    setThuocList(dsThuoc);
    setNhomThuocList(dsNhom);
    setDonViTinhList(dsDonVi);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = async (maThuoc) => {
    const res = await getOneThuoc(maThuoc);
    if (res) {
      setFormData(res);
      setIsUpdate(true);
    }
  };

  const handleSubmit = async () => {
  const dataToSubmit = {
    ...formData,
    hanSuDung: formData.hanSuDung?.slice(0, 10),
    trangThai: 1,
  };

  if (isUpdate) {
    await updateThuoc(formData.maThuoc, dataToSubmit);
  } else {
    await createThuoc(dataToSubmit);
  }

  await fetchData();
  setFormData({});
  setIsUpdate(false);
};



  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn xoá thuốc này?")) {
      await deleteThuoc(id);
      await fetchData();
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-800">💊 Quản lý thuốc</h2>

      {/* Danh sách thuốc */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-blue-100 text-left">
            <tr>
              <th className="px-3 py-2">Mã</th>
              <th className="px-3 py-2">Tên</th>
              <th className="px-3 py-2">Hoạt chất</th>
              <th className="px-3 py-2">ĐVT</th>
              <th className="px-3 py-2">Nhóm</th>
              <th className="px-3 py-2">Tồn</th>
              <th className="px-3 py-2">Hạn</th>
              <th className="px-3 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {thuocList.map(t => (
              <tr key={t.maThuoc} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2">{t.maThuoc}</td>
                <td className="px-3 py-2">{t.tenThuoc}</td>
                <td className="px-3 py-2">{t.tenHoatChat}</td>
                <td className="px-3 py-2">{t.DonViTinh?.tenDVT}</td>
                <td className="px-3 py-2">{t.NhomThuoc?.tenNhom}</td>
                <td className="px-3 py-2">{t.tonKhoHienTai}</td>
                <td className="px-3 py-2">{t.hanSuDung}</td>
                <td className="px-3 py-2 space-x-2">
                  <button onClick={() => handleEdit(t.maThuoc)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Sửa</button>
                  <button onClick={() => handleDelete(t.maThuoc)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form thêm / sửa */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-4">{isUpdate ? "✏️ Sửa thuốc" : "➕ Thêm thuốc mới"}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <input name="tenThuoc" value={formData.tenThuoc || ""} onChange={handleChange} placeholder="Tên thuốc" className="input" />
          <input name="tenHoatChat" value={formData.tenHoatChat || ""} onChange={handleChange} placeholder="Hoạt chất" className="input" />
          <input name="hamLuong" value={formData.hamLuong || ""} onChange={handleChange} placeholder="Hàm lượng" className="input" />
          <input name="soDangKy" value={formData.soDangKy || ""} onChange={handleChange} placeholder="Số đăng ký" className="input" />
          <input name="nuocSanXuat" value={formData.nuocSanXuat || ""} onChange={handleChange} placeholder="Nước SX" className="input" />
          <input name="hangSanXuat" value={formData.hangSanXuat || ""} onChange={handleChange} placeholder="Hãng SX" className="input" />
          <input type="number" name="giaNhap" value={formData.giaNhap || ""} onChange={handleChange} placeholder="Giá nhập" className="input" />
          <input type="number" name="giaBanLe" value={formData.giaBanLe || ""} onChange={handleChange} placeholder="Giá bán lẻ" className="input" />
          <input type="number" name="giaBanBuon" value={formData.giaBanBuon || ""} onChange={handleChange} placeholder="Giá bán buôn" className="input" />
          <input type="number" name="tonKhoToiThieu" value={formData.tonKhoToiThieu || ""} onChange={handleChange} placeholder="Tồn tối thiểu" className="input" />
          <input type="number" name="tonKhoHienTai" value={formData.tonKhoHienTai || ""} onChange={handleChange} placeholder="Tồn hiện tại" className="input" />
          <input type="date" name="hanSuDung" value={formData.hanSuDung || ""} onChange={handleChange} className="input" />
          <select name="maNhom" value={formData.maNhom || ""} onChange={handleChange} className="input">
            <option value="">-- Chọn nhóm thuốc --</option>
            {nhomThuocList.map(n => <option key={n.maNhom} value={n.maNhom}>{n.tenNhom}</option>)}
          </select>
          <select name="maDVT" value={formData.maDVT || ""} onChange={handleChange} className="input">
            <option value="">-- Chọn đơn vị tính --</option>
            {donViTinhList.map(d => <option key={d.maDVT} value={d.maDVT}>{d.tenDVT}</option>)}
          </select>
        </div>
        <div className="mt-4">
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            {isUpdate ? "Cập nhật" : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuanLyThuocPage;
