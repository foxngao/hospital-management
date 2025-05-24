import React, { useEffect, useState } from "react";
import {
  getLichByBS,
  createLich,
  updateLich,
  deleteLich,
} from "../../../services/lich/lichlamviecService";
import axios from "../../../api/axiosClient";

const LichLamViecPage = () => {
  const maNS = localStorage.getItem("maTK");
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    maCa: "",
    ngayLamViec: "", // sẽ tự set theo giờ VN
  });
  const [caList, setCaList] = useState([]);

  // Set ngày hôm nay theo giờ Việt Nam
  useEffect(() => {
    const nowVN = new Date().toLocaleString("en-CA", {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).split(",")[0]; // yyyy-mm-dd
    setForm((f) => ({ ...f, ngayLamViec: nowVN }));
  }, []);

  useEffect(() => {
    fetchData();
    fetchCaList();
  }, []);

  const fetchData = async () => {
    const res = await getLichByBS(maNS);
    setList(res.data.data || []);
  };

  const fetchCaList = async () => {
    const res = await axios.get("/catruc");
    setCaList(res.data.data || []);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async () => {
    if (!form.maCa || !form.ngayLamViec) return alert("Vui lòng nhập đầy đủ thông tin");
    await createLich({ ...form, maNS });
    fetchData();
    setForm((f) => ({ ...f, maCa: "" }));
  };

  const handleUpdate = async (id) => {
    const ngay = prompt("Nhập ngày mới (yyyy-mm-dd):");
    const ca = prompt("Nhập mã ca mới:");
    if (ngay && ca) {
      await updateLich(id, { ngayLamViec: ngay, maCa: ca });
      fetchData();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xoá lịch này?")) {
      await deleteLich(id);
      fetchData();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">📅 Lịch làm việc cá nhân</h2>

      {/* Form tạo lịch */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded shadow">
        <select name="maCa" value={form.maCa} onChange={handleChange} className="input">
          <option value="">-- Chọn ca trực --</option>
          {caList.map((ca) => (
            <option key={ca.maCa} value={ca.maCa}>
              {ca.maCa} - {ca.tenCa}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="ngayLamViec"
          value={form.ngayLamViec}
          onChange={handleChange}
          className="input"
        />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
          ➕ Thêm lịch
        </button>
      </div>

      {/* Table lịch làm việc */}
      <table className="min-w-full text-sm bg-white shadow rounded">
        <thead>
          <tr>
            <th>Mã lịch</th>
            <th>Mã ca</th>
            <th>Ngày</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((row) => (
            <tr key={row.maLichLV} className="border-t">
              <td>{row.maLichLV}</td>
              <td>{row.maCa}</td>
              <td>{row.ngayLamViec}</td>
              <td className="space-x-2">
                <button
                  onClick={() => handleUpdate(row.maLichLV)}
                  className="text-green-600 hover:underline"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(row.maLichLV)}
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
  );
};

export default LichLamViecPage;
