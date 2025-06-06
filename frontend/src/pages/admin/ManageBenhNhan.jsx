// 📁 src/pages/admin/ManageBenhNhan.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosClient";
import toast from "react-hot-toast";

function ManageBenhNhan() {
  const [dsBenhNhan, setDsBenhNhan] = useState([]);
  const [form, setForm] = useState(null);
  const token = localStorage.getItem("token");

  const fetchBenhNhan = async () => {
    try {
      const res = await axios.get(`/benhnhan`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDsBenhNhan(Array.isArray(res.data.data) ? res.data.data : res.data);
    } catch (err) {
      toast.error("Lỗi khi tải danh sách bệnh nhân");
    }
  };

  useEffect(() => {
    fetchBenhNhan();
  }, []);

  const handleEdit = (bn) => {
    setForm({ ...bn });
  };

  const handleDelete = async (maBN) => {
    if (!window.confirm("Xác nhận xóa bệnh nhân?")) return;
    try {
      await axios.delete(`/benhnhan/${maBN}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Đã xóa bệnh nhân");
      fetchBenhNhan();
    } catch (err) {
      toast.error("Không thể xóa bệnh nhân");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form) return;
    try {
      await axios.put(`/benhnhan/${form.maBN}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Cập nhật bệnh nhân thành công");
      setForm(null);
      fetchBenhNhan();
    } catch (err) {
      toast.error("Lỗi khi cập nhật bệnh nhân");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Quản lý bệnh nhân</h2>

      {form && (
        <form onSubmit={handleUpdate} className="space-y-3 bg-gray-100 p-4 rounded mb-6">
          <div className="grid grid-cols-2 gap-4">
            <input name="hoTen" value={form.hoTen} onChange={handleChange} placeholder="Họ tên" className="border p-2 rounded" required />
            <input name="gioiTinh" value={form.gioiTinh} onChange={handleChange} placeholder="Giới tính" className="border p-2 rounded" required />
            <input type="date" name="ngaySinh" value={form.ngaySinh} onChange={handleChange} className="border p-2 rounded" required />
            <input name="soDienThoai" value={form.soDienThoai} onChange={handleChange} placeholder="Số điện thoại" className="border p-2 rounded" required />
            <input name="diaChi" value={form.diaChi} onChange={handleChange} placeholder="Địa chỉ" className="border p-2 rounded" required />
            <input name="bhyt" value={form.bhyt} onChange={handleChange} placeholder="Số BHYT (nếu có)" className="border p-2 rounded" />
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
            <th className="p-2">Mã BN</th>
            <th className="p-2">Họ tên</th>
            <th className="p-2">Giới tính</th>
            <th className="p-2">Ngày sinh</th>
            <th className="p-2">SĐT</th>
            <th className="p-2">Địa chỉ</th>
            <th className="p-2">BHYT</th>
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {dsBenhNhan.map((bn) => (
            <tr key={bn.maBN} className="border-b">
              <td className="p-2">{bn.maBN}</td>
              <td className="p-2">{bn.hoTen}</td>
              <td className="p-2">{bn.gioiTinh}</td>
              <td className="p-2">{bn.ngaySinh}</td>
              <td className="p-2">{bn.soDienThoai}</td>
              <td className="p-2">{bn.diaChi}</td>
              <td className="p-2">{bn.bhyt || "-"}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleEdit(bn)} className="text-yellow-600 hover:underline">Sửa</button>
                <button onClick={() => handleDelete(bn.maBN)} className="text-red-600 hover:underline">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageBenhNhan;
