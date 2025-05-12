// 📁 src/pages/admin/thuoc/QuanLyDonViTinh.jsx
import React, { useEffect, useState } from "react";
import {
  getAllDonViTinh,
  getOneDonViTinh,
  createDonViTinh,
  updateDonViTinh,
  deleteDonViTinh,
} from "../../../services/thuoc/donvitinhService";

const QuanLyDonViTinh = () => {
  const [list, setList] = useState([]);
  const [formData, setFormData] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  const fetchData = async () => {
    const ds = await getAllDonViTinh();
    setList(ds);
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEdit = async (id) => {
    const res = await getOneDonViTinh(id);
    if (res) {
      setFormData(res);
      setIsUpdate(true);
    }
  };

  const handleSubmit = async () => {
    if (isUpdate) await updateDonViTinh(formData.maDVT, formData);
    else await createDonViTinh(formData);
    setFormData({});
    setIsUpdate(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xoá đơn vị tính này?")) {
      await deleteDonViTinh(id);
      fetchData();
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-800">📐 Quản lý đơn vị tính</h2>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-blue-100 text-left">
            <tr><th className="px-3 py-2">Mã</th><th className="px-3 py-2">Tên</th><th className="px-3 py-2">Mô tả</th><th className="px-3 py-2">Hành động</th></tr>
          </thead>
          <tbody>
            {list.map(item => (
              <tr key={item.maDVT} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2">{item.maDVT}</td>
                <td className="px-3 py-2">{item.tenDVT}</td>
                <td className="px-3 py-2">{item.moTa}</td>
                <td className="px-3 py-2 space-x-2">
                  <button onClick={() => handleEdit(item.maDVT)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Sửa</button>
                  <button onClick={() => handleDelete(item.maDVT)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-4">{isUpdate ? "✏️ Sửa đơn vị tính" : "➕ Thêm đơn vị tính"}</h3>
        <div className="grid grid-cols-2 gap-4">
          <input name="tenDVT" value={formData.tenDVT || ""} onChange={handleChange} placeholder="Tên đơn vị tính" className="input" />
          <input name="moTa" value={formData.moTa || ""} onChange={handleChange} placeholder="Mô tả" className="input" />
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

export default QuanLyDonViTinh;
