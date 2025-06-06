// 📁 src/pages/admin/ManageBacSi.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosClient";
import toast from "react-hot-toast";

function ManageBacSi() {
  const [dsBacSi, setDsBacSi] = useState([]);
  const [dsKhoa, setDsKhoa] = useState([]);
  const [form, setForm] = useState(null);
  const token = localStorage.getItem("token");

  const fetchBacSi = async () => {
    try {
      const res = await axios.get(`/bacsi`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("BacSi API response:", res.data);
      setDsBacSi(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      toast.error("Lỗi khi tải danh sách bác sĩ");
    }
  };

  const fetchKhoa = async () => {
    try {
      const res = await axios.get(`/khoa`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDsKhoa(Array.isArray(res.data.data) ? res.data.data : res.data);
    } catch (err) {
      toast.error("Lỗi khi tải danh sách khoa");
    }
  };

  useEffect(() => {
    fetchBacSi();
    fetchKhoa();
  }, []);

  const handleEdit = (bs) => {
    setForm({ ...bs });
  };

  const handleDelete = async (maBS) => {
    if (!window.confirm("Xác nhận xóa bác sĩ?")) return;
    try {
      await axios.delete(`/bacsi/${maBS}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Đã xóa bác sĩ");
      fetchBacSi();
    } catch (err) {
      toast.error("Không thể xóa bác sĩ");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form) return;
    try {
      await axios.put(`/bacsi/${form.maBS}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Cập nhật bác sĩ thành công");
      setForm(null);
      fetchBacSi();
    } catch (err) {
      toast.error("Lỗi khi cập nhật bác sĩ");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Quản lý bác sĩ</h2>

      {form && (
        <form onSubmit={handleUpdate} className="space-y-3 bg-gray-100 p-4 rounded mb-6">
          <div className="grid grid-cols-2 gap-4">
            <input name="hoTen" value={form.hoTen} onChange={handleChange} placeholder="Họ tên" className="border p-2 rounded" required />
            <input name="chuyenMon" value={form.chuyenMon} onChange={handleChange} placeholder="Chuyên môn" className="border p-2 rounded" required />
            <input name="trinhDo" value={form.trinhDo} onChange={handleChange} placeholder="Trình độ" className="border p-2 rounded" required />
            <input name="chucVu" value={form.chucVu} onChange={handleChange} placeholder="Chức vụ" className="border p-2 rounded" required />
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
            <th className="p-2">Mã BS</th>
            <th className="p-2">Họ tên</th>
            <th className="p-2">Chuyên môn</th>
            <th className="p-2">Trình độ</th>
            <th className="p-2">Chức vụ</th>
            <th className="p-2">Mã khoa</th>
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {dsBacSi.map((bs) => (
            <tr key={bs.maBS} className="border-b">
              <td className="p-2">{bs.maBS}</td>
              <td className="p-2">{bs.hoTen}</td>
              <td className="p-2">{bs.chuyenMon}</td>
              <td className="p-2">{bs.trinhDo}</td>
              <td className="p-2">{bs.chucVu}</td>
              <td className="p-2">{bs.maKhoa}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleEdit(bs)} className="text-yellow-600 hover:underline">Sửa</button>
                <button onClick={() => handleDelete(bs.maBS)} className="text-red-600 hover:underline">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageBacSi;
