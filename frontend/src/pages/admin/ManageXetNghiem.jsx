// 📁 File: src/pages/admin/ManageXetNghiem.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ManageXetNghiem() {
  const [list, setList] = useState([]);
  const [dsLoai, setDsLoai] = useState([]);
  const [form, setForm] = useState(null);
  const token = localStorage.getItem("token");

  const fetchAll = async () => {
    try {
      const [xnRes, loaiRes] = await Promise.all([
        axios.get("/api/xetnghiem", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("/api/loaixetnghiem", { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setList(Array.isArray(xnRes.data.data) ? xnRes.data.data : xnRes.data);
      setDsLoai(loaiRes.data.data || []);
    } catch {
      toast.error("Lỗi tải dữ liệu xét nghiệm");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form?.maXN) {
        await axios.put(`/api/xetnghiem/${form.maXN}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Đã cập nhật xét nghiệm");
      } else {
        await axios.post("/api/xetnghiem", form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Đã thêm xét nghiệm");
      }
      setForm(null);
      fetchAll();
    } catch {
      toast.error("Lỗi khi lưu xét nghiệm");
    }
  };

  const handleEdit = (item) => setForm({ ...item });

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xoá xét nghiệm?")) return;
    try {
      await axios.delete(`/api/xetnghiem/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Đã xoá");
      fetchAll();
    } catch {
      toast.error("Lỗi xoá xét nghiệm");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Quản lý loại xét nghiệm</h2>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="tenXN"
            value={form?.tenXN || ""}
            onChange={handleChange}
            placeholder="Tên xét nghiệm"
            className="border p-2 rounded"
            required
          />
          <select
            name="maLoaiXN"
            value={form?.maLoaiXN || ""}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">-- Chọn loại --</option>
            {dsLoai.map((loai) => (
              <option key={loai.maLoaiXN} value={loai.maLoaiXN}>
                {loai.tenLoai}
              </option>
            ))}
          </select>
          <input
            name="chiPhi"
            type="number"
            step="0.01"
            value={form?.chiPhi || ""}
            onChange={handleChange}
            placeholder="Chi phí (VNĐ)"
            className="border p-2 rounded"
            required
          />
          <input
            name="thoiGianTraKetQua"
            value={form?.thoiGianTraKetQua || ""}
            onChange={handleChange}
            placeholder="Thời gian trả kết quả (vd: 1 ngày)"
            className="border p-2 rounded"
          />
        </div>
        <div className="text-right">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {form?.maXN ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </form>

      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Mã</th>
            <th className="p-2">Tên</th>
            <th className="p-2">Loại</th>
            <th className="p-2">Chi phí</th>
            <th className="p-2">TG trả KQ</th>
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, idx) => (
            <tr key={item.maXN || idx} className="border-b">
              <td className="p-2">{item.maXN}</td>
              <td className="p-2">{item.tenXN}</td>
              <td className="p-2">{item.maLoaiXN}</td>
              <td className="p-2">{item.chiPhi?.toLocaleString() || "-"}</td>
              <td className="p-2">{item.thoiGianTraKetQua || "-"}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleEdit(item)} className="text-yellow-600 hover:underline">Sửa</button>
                <button onClick={() => handleDelete(item.maXN)} className="text-red-600 hover:underline">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageXetNghiem;
