// 📁 src/pages/admin/thuoc/QuanLyNhomThuoc.jsx
import React, { useEffect, useState } from "react";
import {
  getAllNhomThuoc,
  getOneNhomThuoc,
  createNhomThuoc,
  updateNhomThuoc,
  deleteNhomThuoc,
} from "../../../services/thuoc/nhomthuocService";

const QuanLyNhomThuoc = () => {
  const [list, setList] = useState([]);
  const [formData, setFormData] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  const fetchData = async () => {
    const ds = await getAllNhomThuoc();
    setList(ds);
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEdit = async (id) => {
    const res = await getOneNhomThuoc(id);
    if (res) {
      setFormData(res);
      setIsUpdate(true);
    }
  };

  const handleSubmit = async () => {
    if (isUpdate) await updateNhomThuoc(formData.maNhom, formData);
    else await createNhomThuoc(formData);
    setFormData({});
    setIsUpdate(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xoá nhóm này?")) {
      await deleteNhomThuoc(id);
      fetchData();
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-800">📦 Quản lý nhóm thuốc</h2>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-blue-100 text-left">
            <tr><th className="px-3 py-2">Mã</th><th className="px-3 py-2">Tên</th><th className="px-3 py-2">Mô tả</th><th className="px-3 py-2">Hành động</th></tr>
          </thead>
          <tbody>
            {list.map(item => (
              <tr key={item.maNhom} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2">{item.maNhom}</td>
                <td className="px-3 py-2">{item.tenNhom}</td>
                <td className="px-3 py-2">{item.moTa}</td>
                <td className="px-3 py-2 space-x-2">
                  <button onClick={() => handleEdit(item.maNhom)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Sửa</button>
                  <button onClick={() => handleDelete(item.maNhom)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-4">{isUpdate ? "✏️ Sửa nhóm thuốc" : "➕ Thêm nhóm thuốc"}</h3>
        <div className="grid grid-cols-2 gap-4">
          <input name="tenNhom" value={formData.tenNhom || ""} onChange={handleChange} placeholder="Tên nhóm thuốc" className="input" />
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

export default QuanLyNhomThuoc;
