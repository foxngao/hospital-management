// 📁 src/pages/admin/ManageNhanSu.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ManageNhanSu() {
  const [dsNhanSu, setDsNhanSu] = useState([]);
  const [dsKhoa, setDsKhoa] = useState([]);
  const [form, setForm] = useState(null);
  const token = localStorage.getItem("token");

  const fetchNhanSu = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/nhansu`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDsNhanSu(Array.isArray(res.data.data) ? res.data.data : res.data);
    } catch (err) {
      toast.error("Lỗi khi tải danh sách nhân sự");
    }
  };

  const fetchKhoa = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/khoa`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDsKhoa(Array.isArray(res.data.data) ? res.data.data : res.data);
    } catch (err) {
      toast.error("Lỗi khi tải khoa");
    }
  };

  useEffect(() => {
    fetchNhanSu();
    fetchKhoa();
  }, []);

  const handleEdit = (ns) => {
    setForm({ ...ns });
  };

  const handleDelete = async (maNS) => {
    if (!window.confirm("Xác nhận xóa nhân sự?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/nhansu/${maNS}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Đã xóa nhân sự");
      fetchNhanSu();
    } catch (err) {
      toast.error("Không thể xóa nhân sự");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form) return;
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/nhansu/${form.maNS}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Cập nhật nhân sự thành công");
      setForm(null);
      fetchNhanSu();
    } catch (err) {
      toast.error("Lỗi khi cập nhật nhân sự");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Quản lý nhân viên y tế</h2>

      {form && (
        <form onSubmit={handleUpdate} className="space-y-3 bg-gray-100 p-4 rounded mb-6">
          <div className="grid grid-cols-2 gap-4">
            <input name="hoTen" value={form.hoTen} onChange={handleChange} placeholder="Họ tên" className="border p-2 rounded" required />
            <input name="loaiNS" value={form.loaiNS} onChange={handleChange} placeholder="Loại nhân sự" className="border p-2 rounded" required />
            <input name="capBac" value={form.capBac} onChange={handleChange} placeholder="Cấp bậc" className="border p-2 rounded" required />
            <input name="chuyenMon" value={form.chuyenMon} onChange={handleChange} placeholder="Chuyên môn" className="border p-2 rounded" required />
            <select name="maKhoa" value={form.maKhoa} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">-- Chọn khoa --</option>
              {dsKhoa.map((khoa) => (
                <option key={khoa.maKhoa} value={khoa.maKhoa}>
                  {khoa.tenKhoa} ({khoa.maKhoa})
                </option>
              ))}
            </select>
          </div>
          <div className="text-right">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Lưu cập nhật
            </button>
          </div>
        </form>
      )}

      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Mã NS</th>
            <th className="p-2">Họ tên</th>
            <th className="p-2">Loại</th>
            <th className="p-2">Cấp bậc</th>
            <th className="p-2">Chuyên môn</th>
            <th className="p-2">Mã khoa</th>
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {dsNhanSu.map((ns) => (
            <tr key={ns.maNS} className="border-b">
              <td className="p-2">{ns.maNS}</td>
              <td className="p-2">{ns.hoTen}</td>
              <td className="p-2">{ns.loaiNS}</td>
              <td className="p-2">{ns.capBac}</td>
              <td className="p-2">{ns.chuyenMon}</td>
              <td className="p-2">{ns.maKhoa}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleEdit(ns)} className="text-yellow-600 hover:underline">Sửa</button>
                <button onClick={() => handleDelete(ns.maNS)} className="text-red-600 hover:underline">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageNhanSu;
