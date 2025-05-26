import React, { useEffect, useState } from "react";
import {
  getAllLichKham,
  createLichKham,
  deleteLichKham,
} from "../../../services/nhansu/tiepnhan/lichkhamService";
import axios from "../../../api/axiosClient";

const getTodayVN = () => {
  const now = new Date();
  now.setHours(now.getHours() + 7);
  return now.toISOString().slice(0, 10);
};

const getCurrentTimeVN = () => {
  const now = new Date();
  now.setHours(now.getHours() + 7);
  return now.toTimeString().slice(0, 5);
};

const DangKyKhamPage = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    maBN: "",
    maBS: "",
    ngayKham: getTodayVN(),
    gioKham: getCurrentTimeVN(),
    phong: "",
    ghiChu: "",
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
      axios.get("/bacsi"),
    ]);
    setBenhNhanList(bn.data.data || []);
    setBacSiList(bs.data.data || []);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async () => {
    await createLichKham(form);
    fetchData();
    setForm({
      maBN: "",
      maBS: "",
      ngayKham: getTodayVN(),
      gioKham: getCurrentTimeVN(),
      phong: "",
      ghiChu: "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xoá lịch này?")) {
      await deleteLichKham(id);
      fetchData();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-blue-700">📝 Đăng ký khám bệnh</h2>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow-lg">
        <select
          name="maBN"
          value={form.maBN}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">-- Chọn bệnh nhân --</option>
          {benhNhanList.map((bn) => (
            <option key={bn.maBN} value={bn.maBN}>
              {bn.hoTen}
            </option>
          ))}
        </select>

        <select
          name="maBS"
          value={form.maBS}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">-- Chọn bác sĩ --</option>
          {bacSiList.map((bs) => (
            <option key={bs.maBS} value={bs.maBS}>
              {bs.hoTen}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="ngayKham"
          value={form.ngayKham}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="time"
          name="gioKham"
          value={form.gioKham}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />

        <input
          name="phong"
          value={form.phong}
          onChange={handleChange}
          placeholder="Phòng khám"
          className="border border-gray-300 rounded px-3 py-2"
        />

        <textarea
          name="ghiChu"
          value={form.ghiChu}
          onChange={handleChange}
          placeholder="Ghi chú"
          className="border border-gray-300 rounded px-3 py-2 col-span-1 md:col-span-2"
        />

        <div className="md:col-span-3">
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
          >
            ➕ Đăng ký
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="min-w-full text-sm bg-white shadow rounded">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Mã lịch</th>
              <th className="px-4 py-2 text-left">Bệnh nhân</th>
              <th className="px-4 py-2 text-left">Bác sĩ</th>
              <th className="px-4 py-2 text-left">Ngày</th>
              <th className="px-4 py-2 text-left">Giờ</th>
              <th className="px-4 py-2 text-left">Phòng</th>
              <th className="px-4 py-2 text-left">Ghi chú</th>
              <th className="px-4 py-2 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {list.map((l) => (
              <tr key={l.maLich} className="border-t">
                <td className="px-4 py-2">{l.maLich}</td>
                <td className="px-4 py-2">{l.BenhNhan?.hoTen}</td>
                <td className="px-4 py-2">{l.BacSi?.hoTen}</td>
                <td className="px-4 py-2">{l.ngayKham}</td>
                <td className="px-4 py-2">{l.gioKham}</td>
                <td className="px-4 py-2">{l.phong}</td>
                <td className="px-4 py-2">{l.ghiChu}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(l.maLich)}
                    className="text-red-600 hover:underline"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-4">
                  Không có lịch hẹn nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DangKyKhamPage;
