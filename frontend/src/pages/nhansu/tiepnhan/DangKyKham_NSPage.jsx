import React, { useEffect, useState } from "react";
import {
  getAllLichKham,
  createLichKham,
  deleteLichKham,
} from "../../../services/nhansu/tiepnhan/lichkhamService";
import axios from "../../../api/axiosClient";

// Lấy ngày hôm nay theo giờ Việt Nam
const getTodayVN = () => {
  const now = new Date();
  now.setHours(now.getHours() + 7);
  return now.toISOString().slice(0, 10); // yyyy-mm-dd
};

// Lấy giờ hiện tại theo giờ Việt Nam
const getCurrentTimeVN = () => {
  const now = new Date();
  now.setHours(now.getHours() + 7);
  return now.toTimeString().slice(0, 5); // hh:mm
};

const DangKyKhamPage = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    maBN: "",
    maBS: "",
    ngayKham: getTodayVN(),     // ✅ tự động ngày hôm nay
    gioKham: getCurrentTimeVN(), // ✅ tự động giờ hiện tại
    phong: "",
    ghiChu: ""
  });

  const [benhNhanList, setBenhNhanList] = useState([]);
  const [bacSiList, setBacSiList] = useState([]);

  useEffect(() => {
    fetchData();
    fetchDropdowns();
  }, []);

  const fetchData = async () => {
    const res = await getAllLichKham();
    setList(res.data.data || []);
  };

  const fetchDropdowns = async () => {
    const [bn, bs] = await Promise.all([
      axios.get("/benhnhan"),
      axios.get("/bacsi"), // ✅ gọi đúng API
    ]);
    setBenhNhanList(bn.data.data || []);
    setBacSiList(bs.data.data || []);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async () => {
    await createLichKham(form);
    fetchData();
    setForm({
      maBN: "",
      maBS: "",
      ngayKham: getTodayVN(),
      gioKham: getCurrentTimeVN(),
      phong: "",
      ghiChu: ""
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xoá lịch này?")) {
      await deleteLichKham(id);
      fetchData();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-bold text-blue-700">📝 Đăng ký khám bệnh</h2>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded shadow">
        <select name="maBN" value={form.maBN} onChange={handleChange} className="input">
          <option value="">-- Chọn bệnh nhân --</option>
          {benhNhanList.map(bn => (
            <option key={bn.maBN} value={bn.maBN}>{bn.hoTen}</option>
          ))}
        </select>

        <select name="maBS" value={form.maBS} onChange={handleChange} className="input">
          <option value="">-- Chọn bác sĩ --</option>
          {bacSiList.map(bs => (
            <option key={bs.maBS} value={bs.maBS}>{bs.hoTen}</option>
          ))}
        </select>

        <input type="date" name="ngayKham" value={form.ngayKham} onChange={handleChange} className="input" />
        <input type="time" name="gioKham" value={form.gioKham} onChange={handleChange} className="input" />
        <input name="phong" value={form.phong} onChange={handleChange} placeholder="Phòng khám" className="input" />
        <textarea name="ghiChu" value={form.ghiChu} onChange={handleChange} placeholder="Ghi chú" className="input col-span-2" />
        
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
          ➕ Đăng ký
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full text-sm bg-white shadow rounded">
        <thead>
          <tr>
            <th>Mã lịch</th>
            <th>Bệnh nhân</th>
            <th>Bác sĩ</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Phòng</th>
            <th>Ghi chú</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map(l => (
            <tr key={l.maLich} className="border-t">
              <td>{l.maLich}</td>
              <td>{l.BenhNhan?.hoTen}</td>
              <td>{l.BacSi?.hoTen}</td>
              <td>{l.ngayKham}</td>
              <td>{l.gioKham}</td>
              <td>{l.phong}</td>
              <td>{l.ghiChu}</td>
              <td>
                <button onClick={() => handleDelete(l.maLich)} className="text-red-600 hover:underline">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DangKyKhamPage;
