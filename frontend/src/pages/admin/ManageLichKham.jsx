// 📁 src/pages/admin/ManageLichKham.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ManageLichKham() {
  const [lichList, setLichList] = useState([]);
  const [form, setForm] = useState(null);
  const [dsBacSi, setDsBacSi] = useState([]);
  const [dsBenhNhan, setDsBenhNhan] = useState([]);
  const token = localStorage.getItem("token");

  const fetchLichKham = async () => {
    try {
      const res = await axios.get(`/api/lichkham`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLichList(Array.isArray(res.data.data) ? res.data.data : res.data);
    } catch (err) {
      toast.error("Không thể tải lịch khám");
    }
  };

  const fetchOptions = async () => {
    try {
      const [bsRes, bnRes] = await Promise.all([
        axios.get(`/api/bacsi`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`/api/benhnhan`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setDsBacSi(bsRes.data.data || []);
      setDsBenhNhan(bnRes.data.data || []);
    } catch {
      toast.error("Lỗi khi tải bác sĩ hoặc bệnh nhân");
    }
  };

  useEffect(() => {
    fetchLichKham();
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.maLich) {
        await axios.put(`/api/lichkham/${form.maLich}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Cập nhật lịch khám thành công");
      } else {
        await axios.post(`/api/lichkham`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Thêm lịch khám mới");
      }
      setForm(null);
      fetchLichKham();
    } catch {
      toast.error("Lỗi khi lưu lịch khám");
    }
  };

  const handleEdit = (lich) => {
    setForm({ ...lich });
  };

  const handleDelete = async (maLich) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa lịch khám này?")) return;
    try {
      await axios.delete(`/api/lichkham/${maLich}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Đã xoá lịch khám");
      fetchLichKham();
    } catch {
      toast.error("Không thể xoá lịch khám");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Quản lý lịch khám</h2>

      <form onSubmit={handleSubmit} className="space-y-3 bg-gray-100 p-4 rounded mb-6">
        <div className="grid grid-cols-2 gap-4">
          <select name="maBS" value={form?.maBS || ""} onChange={handleChange} className="border p-2 rounded" required>
            <option value="">-- Chọn bác sĩ --</option>
            {dsBacSi.map((bs) => (
              <option key={bs.maBS} value={bs.maBS}>{bs.hoTen}</option>
            ))}
          </select>
          <select name="maBN" value={form?.maBN || ""} onChange={handleChange} className="border p-2 rounded" required>
            <option value="">-- Chọn bệnh nhân --</option>
            {dsBenhNhan.map((bn) => (
              <option key={bn.maBN} value={bn.maBN}>{bn.hoTen}</option>
            ))}
          </select>
          <input type="date" name="ngayKham" value={form?.ngayKham || ""} onChange={handleChange} className="border p-2 rounded" required />
          <input type="time" name="gioKham" value={form?.gioKham || ""} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="phong" value={form?.phong || ""} onChange={handleChange} placeholder="Phòng khám" className="border p-2 rounded" required />
          <input type="text" name="ghiChu" value={form?.ghiChu || ""} onChange={handleChange} placeholder="Ghi chú" className="border p-2 rounded" />
        </div>
        <div className="text-right">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {form?.maLich ? "Cập nhật" : "Tạo mới"}
          </button>
        </div>
      </form>

      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Mã lịch</th>
            <th className="p-2">Bác sĩ</th>
            <th className="p-2">Bệnh nhân</th>
            <th className="p-2">Ngày</th>
            <th className="p-2">Giờ</th>
            <th className="p-2">Phòng</th>
            <th className="p-2">Ghi chú</th>
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {lichList.map((lich) => (
            <tr key={lich.maLich} className="border-b">
              <td className="p-2">{lich.maLich}</td>
              <td className="p-2">{lich.hoTenBS || lich.maBS}</td>
              <td className="p-2">{lich.hoTenBN || lich.maBN}</td>
              <td className="p-2">{lich.ngayKham}</td>
              <td className="p-2">{lich.gioKham}</td>
              <td className="p-2">{lich.phong}</td>
              <td className="p-2">{lich.ghiChu}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleEdit(lich)} className="text-yellow-600 hover:underline">Sửa</button>
                <button onClick={() => handleDelete(lich.maLich)} className="text-red-600 hover:underline">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageLichKham;
