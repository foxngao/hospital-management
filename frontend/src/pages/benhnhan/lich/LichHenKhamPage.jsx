import React, { useEffect, useState } from "react";
import {
  getAllLich,
  createLich,
  updateLich,
  deleteLich,
} from "../../../services/lichkham/lichkhamService";
import axios from "../../../api/axiosClient";

const LichHenKhamPage = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    maBS: "",
    ngayKham: "",
    gioKham: "",
    phong: "",
    ghiChu: "",
  });
  const [bacSiList, setBacSiList] = useState([]);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    const res = await getAllLich();
    setList(res.data.data || []);
    const bacsi = await axios.get("/bacsi");
    setBacSiList(bacsi.data.data || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const maBN = localStorage.getItem("maBN"); // giả định từ login
    await createLich({ ...form, maBN });
    setForm({ maBS: "", ngayKham: "", gioKham: "", phong: "", ghiChu: "" });
    loadAll();
  };

  const handleUpdate = async (id) => {
    const ngayKham = prompt("Ngày khám mới:");
    const gioKham = prompt("Giờ khám mới:");
    const phong = prompt("Phòng khám:");
    const ghiChu = prompt("Ghi chú:");
    if (ngayKham && gioKham && phong) {
      await updateLich(id, { ngayKham, gioKham, phong, ghiChu });
      loadAll();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xoá lịch này?")) {
      await deleteLich(id);
      loadAll();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">📅 Lịch hẹn khám bệnh</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 shadow rounded">
        <select name="maBS" value={form.maBS} onChange={handleChange} className="input">
          <option value="">-- Chọn bác sĩ --</option>
          {bacSiList.map((bs) => (
            <option key={bs.maBS} value={bs.maBS}>{bs.hoTen}</option>
          ))}
        </select>
        <input type="date" name="ngayKham" value={form.ngayKham} onChange={handleChange} className="input" />
        <input type="time" name="gioKham" value={form.gioKham} onChange={handleChange} className="input" />
        <input name="phong" value={form.phong} onChange={handleChange} placeholder="Phòng" className="input" />
        <textarea name="ghiChu" value={form.ghiChu} onChange={handleChange} placeholder="Ghi chú" className="input col-span-2" />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">
          ➕ Đặt lịch
        </button>
      </div>

      <table className="min-w-full text-sm border bg-white shadow rounded">
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
          {list.map((l) => (
            <tr key={l.maLich} className="border-t">
              <td>{l.maLich}</td>
              <td>{l.BenhNhan?.hoTen}</td>
              <td>{l.BacSi?.hoTen}</td>
              <td>{l.ngayKham}</td>
              <td>{l.gioKham}</td>
              <td>{l.phong}</td>
              <td>{l.ghiChu}</td>
              <td className="space-x-2">
                <button onClick={() => handleUpdate(l.maLich)} className="text-green-600 hover:underline">Sửa</button>
                <button onClick={() => handleDelete(l.maLich)} className="text-red-600 hover:underline">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LichHenKhamPage;
