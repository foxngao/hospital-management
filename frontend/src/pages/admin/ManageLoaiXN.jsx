// 📁 File: src/pages/admin/ManageLoaiXN.jsx
// ✅ Quản lý danh mục loại xét nghiệm

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ManageLoaiXN() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(null);
  const token = localStorage.getItem("token");

  const fetchAll = async () => {
    try {
      const res = await axios.get("/api/loaixetnghiem", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setList(res.data.data || res.data);
    } catch {
      toast.error("Lỗi khi tải danh sách loại xét nghiệm");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form?.maLoaiXN) {
        await axios.put(`/api/loaixetnghiem/${form.maLoaiXN}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Đã cập nhật loại xét nghiệm");
      } else {
        await axios.post(`/api/loaixetnghiem`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Đã thêm loại xét nghiệm");
      }
      setForm(null);
      fetchAll();
    } catch {
      toast.error("Lỗi khi lưu loại xét nghiệm");
    }
  };

  const handleEdit = (item) => setForm({ ...item });

  const handleDelete = async (id) => {
    if (!window.confirm("Xoá loại xét nghiệm này?")) return;
    try {
      await axios.delete(`/api/loaixetnghiem/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Đã xoá loại xét nghiệm");
      fetchAll();
    } catch {
      toast.error("Lỗi khi xoá");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Quản lý loại xét nghiệm</h2>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="tenLoai"
            value={form?.tenLoai || ""}
            onChange={handleChange}
            placeholder="Tên loại xét nghiệm"
            className="border p-2 rounded"
            required
          />
          <input
            name="moTa"
            value={form?.moTa || ""}
            onChange={handleChange}
            placeholder="Mô tả"
            className="border p-2 rounded"
          />
        </div>
        <div className="text-right">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {form?.maLoaiXN ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </form>

      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Mã loại</th>
            <th className="p-2">Tên loại</th>
            <th className="p-2">Mô tả</th>
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={item.maLoaiXN || index} className="border-b">
              <td className="p-2">{item.maLoaiXN}</td>
              <td className="p-2">{item.tenLoai}</td>
              <td className="p-2">{item.moTa || "-"}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleEdit(item)} className="text-yellow-600 hover:underline">Sửa</button>
                <button onClick={() => handleDelete(item.maLoaiXN)} className="text-red-600 hover:underline">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageLoaiXN;
