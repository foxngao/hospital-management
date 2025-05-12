import React, { useEffect, useState } from "react";
import {
  getPhieuByBacSi,
  createPhieuKham,
  updatePhieuKham,
  deletePhieuKham,
} from "../../../services/kham/phieukhamService";
import axios from "../../../api/axiosClient";

const PhieuKhamPage = () => {
  const maBS = localStorage.getItem("maTK");
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    maHSBA: "", maBN: "", trieuChung: "", chuanDoan: "", loiDan: "", trangThai: "Chờ duyệt"
  });
  const [hosos, setHoSo] = useState([]);
  const [benhnhans, setBenhNhans] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getPhieuByBacSi(maBS);
    setList(res.data.data || []);

    const hs = await axios.get("/hsba");
    const bn = await axios.get("/benhnhan");
    setHoSo(hs.data.data || []);
    setBenhNhans(bn.data.data || []);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async () => {
    await createPhieuKham({ ...form, maBS });
    setForm({ maHSBA: "", maBN: "", trieuChung: "", chuanDoan: "", loiDan: "", trangThai: "Chờ duyệt" });
    loadData();
  };

  const handleUpdate = async (id) => {
    const trieuChung = prompt("Triệu chứng:");
    const chuanDoan = prompt("Chẩn đoán:");
    const loiDan = prompt("Lời dặn:");
    const trangThai = prompt("Trạng thái:");
    if (trieuChung && chuanDoan && loiDan && trangThai) {
      await updatePhieuKham(id, { trieuChung, chuanDoan, loiDan, trangThai });
      loadData();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xoá phiếu này?")) {
      await deletePhieuKham(id);
      loadData();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">📋 Quản lý phiếu khám bệnh</h2>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-white p-4 shadow rounded">
        <select name="maHSBA" value={form.maHSBA} onChange={handleChange} className="input">
          <option value="">-- Chọn hồ sơ --</option>
          {hosos.map(h => <option key={h.maHSBA} value={h.maHSBA}>{h.maHSBA}</option>)}
        </select>
        <select name="maBN" value={form.maBN} onChange={handleChange} className="input">
          <option value="">-- Chọn bệnh nhân --</option>
          {benhnhans.map(bn => <option key={bn.maBN} value={bn.maBN}>{bn.hoTen}</option>)}
        </select>
        <input name="trieuChung" value={form.trieuChung} onChange={handleChange} placeholder="Triệu chứng" className="input" />
        <input name="chuanDoan" value={form.chuanDoan} onChange={handleChange} placeholder="Chẩn đoán" className="input" />
        <input name="loiDan" value={form.loiDan} onChange={handleChange} placeholder="Lời dặn" className="input" />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">➕ Lưu</button>
      </div>

      {/* Table */}
      <table className="min-w-full text-sm bg-white shadow rounded">
        <thead>
          <tr>
            <th>Mã PK</th><th>HSBA</th><th>Bệnh nhân</th><th>Triệu chứng</th><th>Chẩn đoán</th><th>Lời dặn</th><th>Trạng thái</th><th>Ngày</th><th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((p) => (
            <tr key={p.maPK} className="border-t">
              <td>{p.maPK}</td>
              <td>{p.maHSBA}</td>
              <td>{p.maBN}</td>
              <td>{p.trieuChung}</td>
              <td>{p.chuanDoan}</td>
              <td>{p.loiDan}</td>
              <td>{p.trangThai}</td>
              <td>{p.ngayKham}</td>
              <td className="space-x-2">
                <button onClick={() => handleUpdate(p.maPK)} className="text-green-600 hover:underline">Sửa</button>
                <button onClick={() => handleDelete(p.maPK)} className="text-red-600 hover:underline">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PhieuKhamPage;
