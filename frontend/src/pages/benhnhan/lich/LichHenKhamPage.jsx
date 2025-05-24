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
      const lich = await axios.get("/lichkham");
      const khoa = await axios.get("/khoa");
      const ca = await axios.get("/catruc");

      setList(lich.data.data || []);
      setKhoaList(khoa.data.data || []);
      setCaKhamList(ca.data.data || []);
    } catch (error) {
      console.error("❌ Lỗi tải dữ liệu:", error);
    }
  };

  const handleKhoaChange = async (e) => {
    const maKhoa = e.target.value;
    setForm({ ...form, maKhoa, maBS: "" });

    try {
      if (maKhoa) {
        const res = await axios.get(`/bacsi?khoa=${maKhoa}`);
        setBacSiList(res.data.data || []);
      } else {
        setBacSiList([]);
      }
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
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">📅 Đặt lịch khám</h2>

      {/* FORM */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 shadow rounded">
        <select name="maKhoa" value={form.maKhoa} onChange={handleKhoaChange} className="input">
          <option value="">-- Chọn khoa --</option>
          {khoaList.map((k) => (
            <option key={k.maKhoa} value={k.maKhoa}>{k.tenKhoa}</option>
          ))}
        </select>

        <select name="maBS" value={form.maBS} onChange={handleChange} className="input">
          <option value="">-- Chọn bác sĩ --</option>
          {bacSiList.map((bs) => (
            <option key={bs.maBS} value={bs.maBS}>{bs.hoTen}</option>
          ))}
        </select>

        <input type="date" name="ngayKham" value={form.ngayKham} onChange={handleChange} className="input" />

        <select name="gioKham" value={form.gioKham} onChange={handleChange} className="input">
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
          placeholder="Ghi chú"
          className="input col-span-2"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-2"
        >
          ➕ Đặt lịch
        </button>
      </div>

      {/* TABLE */}
      <table className="min-w-full text-sm border bg-white shadow rounded">
        <thead>
          <tr>
            <th>Mã lịch</th>
            <th>Bệnh nhân</th>
            <th>Bác sĩ</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Ghi chú</th>
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
              <td>{l.ghiChu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LichHenKhamPage;
