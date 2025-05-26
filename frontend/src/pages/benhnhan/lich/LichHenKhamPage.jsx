import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosClient";
import { useNavigate } from "react-router-dom";

const LichHenKhamPage = () => {
  const [form, setForm] = useState({
    maKhoa: "",
    maBS: "",
    ngayKham: "",
    gioKham: "",
    ghiChu: "",
  });

  const [list, setList] = useState([]);
  const [khoaList, setKhoaList] = useState([]);
  const [bacSiList, setBacSiList] = useState([]);
  const [caKhamList, setCaKhamList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const maBN = localStorage.getItem("maBN");
    if (!maBN) {
      alert("⚠️ Vui lòng đăng nhập bằng tài khoản bệnh nhân.");
      navigate("/login");
      return;
    }
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [lich, khoa, ca] = await Promise.all([
        axios.get("/lichkham"),
        axios.get("/khoa"),
        axios.get("/catruc"),
      ]);
      setList(lich.data.data || []);
      setKhoaList(khoa.data.data || []);
      setCaKhamList(ca.data.data || []);
    } catch (err) {
      console.error("❌ Lỗi tải dữ liệu:", err);
    }
  };

  const handleKhoaChange = async (e) => {
    const maKhoa = e.target.value;
    setForm({ ...form, maKhoa, maBS: "" });
    try {
      const res = await axios.get(`/bacsi?khoa=${maKhoa}`);
      setBacSiList(res.data.data || []);
    } catch (err) {
      console.error("❌ Lỗi tải bác sĩ:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const maBN = localStorage.getItem("maBN");
    const { maBS, ngayKham, gioKham } = form;
    if (!maBN || !maBS || !ngayKham || !gioKham) {
      alert("❌ Vui lòng điền đủ thông tin.");
      return;
    }

    try {
      const check = await axios.get(`/lichkham/check?maBS=${maBS}&ngay=${ngayKham}&gio=${gioKham}`);
      if (check.data.trung) {
        alert("⛔ Khung giờ này đã có người đặt. Vui lòng chọn khung khác.");
        return;
      }

      await axios.post("/lichkham", { ...form, maBN });
      alert("✅ Đặt lịch thành công!");
      setForm({ maKhoa: "", maBS: "", ngayKham: "", gioKham: "", ghiChu: "" });
      loadAll();
    } catch (err) {
      console.error("❌ Lỗi đặt lịch:", err);
      alert("❌ Không thể đặt lịch. Vui lòng thử lại.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">📅 Đặt lịch khám bệnh</h1>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 rounded-xl shadow">
        <select name="maKhoa" value={form.maKhoa} onChange={handleKhoaChange} className="border p-2 rounded w-full">
          <option value="">-- Chọn khoa --</option>
          {khoaList.map((k) => (
            <option key={k.maKhoa} value={k.maKhoa}>{k.tenKhoa}</option>
          ))}
        </select>

        <select name="maBS" value={form.maBS} onChange={handleChange} className="border p-2 rounded w-full">
          <option value="">-- Chọn bác sĩ --</option>
          {bacSiList.map((bs) => (
            <option key={bs.maBS} value={bs.maBS}>{bs.hoTen}</option>
          ))}
        </select>

        <input type="date" name="ngayKham" value={form.ngayKham} onChange={handleChange} className="border p-2 rounded w-full" />

        <select name="gioKham" value={form.gioKham} onChange={handleChange} className="border p-2 rounded w-full">
          <option value="">-- Chọn giờ khám --</option>
          {caKhamList.map((ca) => {
            const start = ca.thoiGianBatDau.slice(0, 5);
            const end = ca.thoiGianKetThuc.slice(0, 5);
            return (
              <option key={ca.maCa} value={start}>
                {`${ca.tenCa} (${start} - ${end})`}
              </option>
            );
          })}
        </select>

        <textarea
          name="ghiChu"
          value={form.ghiChu}
          onChange={handleChange}
          placeholder="Ghi chú thêm (nếu có)..."
          className="border p-2 rounded w-full col-span-1 md:col-span-2"
        />

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white font-semibold rounded px-4 py-2 hover:bg-blue-700 transition col-span-1 md:col-span-2"
        >
          ➕ Đặt lịch ngay
        </button>
      </div>

      {/* DANH SÁCH LỊCH */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 text-gray-600 font-semibold">
            <tr>
              <th className="p-3 border">Mã lịch</th>
              <th className="p-3 border">Bệnh nhân</th>
              <th className="p-3 border">Bác sĩ</th>
              <th className="p-3 border">Ngày</th>
              <th className="p-3 border">Giờ</th>
              <th className="p-3 border">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {list.map((l) => (
              <tr key={l.maLich} className="border-t hover:bg-gray-50">
                <td className="p-3 border">{l.maLich}</td>
                <td className="p-3 border">{l.BenhNhan?.hoTen}</td>
                <td className="p-3 border">{l.BacSi?.hoTen}</td>
                <td className="p-3 border">{l.ngayKham}</td>
                <td className="p-3 border">{l.gioKham}</td>
                <td className="p-3 border">{l.ghiChu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LichHenKhamPage;
