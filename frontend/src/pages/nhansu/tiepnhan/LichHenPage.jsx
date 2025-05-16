import React, { useEffect, useState } from "react";
import {
  getAllLichHen,
  createLichHen,
  updateLichHen,
  deleteLichHen,
} from "../../../services/nhansu/tiepnhan/lichHenService";
import axios from "../../../api/axiosClient";

const LichHenPage = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    maBN: "",
    maBS: "",
    ngayKham: "",
    gioKham: "",
    phong: "",
    ghiChu: "",
  });
  const [benhNhanList, setBenhNhanList] = useState([]);
  const [bacSiList, setBacSiList] = useState([]);

  useEffect(() => {
    fetchData();
    fetchOptions();
    setNowVietnamTime(); // ⏰ Set thời gian thực Việt Nam
  }, []);

  const fetchData = async () => {
    const res = await getAllLichHen();
    setList(res.data.data || []);
  };

  const fetchOptions = async () => {
    const [bn, bs] = await Promise.all([
      axios.get("/benhnhan"),
      axios.get("/bacsi"),
    ]);
    setBenhNhanList(bn.data.data || []);
    setBacSiList(bs.data.data || []);
  };

  const setNowVietnamTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 7); // Chuyển sang UTC+7

    const date = now.toISOString().split("T")[0]; // yyyy-mm-dd
    const time = now.toTimeString().slice(0, 5);   // hh:mm

    setForm((prev) => ({
      ...prev,
      ngayKham: date,
      gioKham: time,
    }));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async () => {
    await createLichHen(form);
    fetchData();
    setNowVietnamTime();
    setForm((prev) => ({
      ...prev,
      maBN: "",
      maBS: "",
      phong: "",
      ghiChu: ""
    }));
  };

  const handleUpdate = async (id) => {
    const ngayKham = prompt("Ngày khám mới:");
    const gioKham = prompt("Giờ khám mới:");
    const phong = prompt("Phòng khám:");
    const ghiChu = prompt("Ghi chú:");
    if (ngayKham && gioKham) {
      await updateLichHen(id, { ngayKham, gioKham, phong, ghiChu });
      fetchData();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xoá lịch này?")) {
      await deleteLichHen(id);
      fetchData();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">📅 Quản lý lịch hẹn khám</h2>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-white p-4 rounded shadow">
        <select name="maBN" value={form.maBN} onChange={handleChange} className="input">
          <option value="">-- Chọn bệnh nhân --</option>
          {benhNhanList.map((bn) => (
            <option key={bn.maBN} value={bn.maBN}>{bn.hoTen}</option>
          ))}
        </select>
        <select name="maBS" value={form.maBS} onChange={handleChange} className="input">
          <option value="">-- Chọn bác sĩ --</option>
          {bacSiList.map((bs) => (
            <option key={bs.maBS} value={bs.maBS}>{bs.hoTen}</option>
          ))}
        </select>
        <input type="date" name="ngayKham" value={form.ngayKham} onChange={handleChange} className="input" />
        <input type="time" name="gioKham" value={form.gioKham} onChange={handleChange} className="input" />
        <input name="phong" placeholder="Phòng" value={form.phong} onChange={handleChange} className="input" />
        <textarea name="ghiChu" placeholder="Ghi chú" value={form.ghiChu} onChange={handleChange} className="input col-span-2" />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">
          ➕ Đặt lịch
        </button>
      </div>

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
          {list.map((lich) => (
            <tr key={lich.maLich} className="border-t">
              <td>{lich.maLich}</td>
              <td>{lich.BenhNhan?.hoTen}</td>
              <td>{lich.BacSi?.hoTen}</td>
              <td>{lich.ngayKham}</td>
              <td>{lich.gioKham}</td>
              <td>{lich.phong}</td>
              <td>{lich.ghiChu}</td>
              <td>
                <button onClick={() => handleUpdate(lich.maLich)} className="text-green-600 hover:underline">Sửa</button>
                <button onClick={() => handleDelete(lich.maLich)} className="text-red-600 hover:underline">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LichHenPage;
