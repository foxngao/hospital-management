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
    setNowVietnamTime();
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
    now.setHours(now.getHours() + 7);
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().slice(0, 5);

    setForm((prev) => ({
      ...prev,
      ngayKham: date,
      gioKham: time,
    }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    await createLichHen(form);
    fetchData();
    setNowVietnamTime();
    setForm((prev) => ({
      ...prev,
      maBN: "",
      maBS: "",
      phong: "",
      ghiChu: "",
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
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-blue-700">📅 Quản lý lịch hẹn khám</h2>

      {/* Form đặt lịch */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-white p-6 rounded-xl shadow">
        <select name="maBN" value={form.maBN} onChange={handleChange} className="border rounded p-2 col-span-2">
          <option value="">-- Chọn bệnh nhân --</option>
          {benhNhanList.map((bn) => (
            <option key={bn.maBN} value={bn.maBN}>{bn.hoTen}</option>
          ))}
        </select>
        <select name="maBS" value={form.maBS} onChange={handleChange} className="border rounded p-2 col-span-2">
          <option value="">-- Chọn bác sĩ --</option>
          {bacSiList.map((bs) => (
            <option key={bs.maBS} value={bs.maBS}>{bs.hoTen}</option>
          ))}
        </select>
        <input type="date" name="ngayKham" value={form.ngayKham} onChange={handleChange} className="border rounded p-2" />
        <input type="time" name="gioKham" value={form.gioKham} onChange={handleChange} className="border rounded p-2" />
        <input name="phong" placeholder="Phòng" value={form.phong} onChange={handleChange} className="border rounded p-2 col-span-2" />
        <textarea name="ghiChu" placeholder="Ghi chú" value={form.ghiChu} onChange={handleChange} className="border rounded p-2 col-span-6 h-20" />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white rounded p-2 font-semibold col-span-6 hover:bg-blue-700"
        >
          ➕ Đặt lịch
        </button>
      </div>

      {/* Danh sách lịch hẹn */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="p-3">Mã lịch</th>
              <th className="p-3">Bệnh nhân</th>
              <th className="p-3">Bác sĩ</th>
              <th className="p-3">Ngày</th>
              <th className="p-3">Giờ</th>
              <th className="p-3">Phòng</th>
              <th className="p-3">Ghi chú</th>
              <th className="p-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {list.map((lich) => (
              <tr key={lich.maLich} className="border-t">
                <td className="p-3">{lich.maLich}</td>
                <td className="p-3">{lich.BenhNhan?.hoTen}</td>
                <td className="p-3">{lich.BacSi?.hoTen}</td>
                <td className="p-3">{lich.ngayKham}</td>
                <td className="p-3">{lich.gioKham}</td>
                <td className="p-3">{lich.phong}</td>
                <td className="p-3">{lich.ghiChu}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleUpdate(lich.maLich)}
                    className="text-green-600 hover:underline"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(lich.maLich)}
                    className="text-red-600 hover:underline"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LichHenPage;
