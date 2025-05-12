import React, { useEffect, useState } from "react";
import { getAllThuoc, getDonViTinh } from "../../../services/donthuoc/thuocService";
import {
  getDonThuocByPK,
  createDonThuoc,
  deleteChiTietDonThuoc,
} from "../../../services/donthuoc/donthuocService";

const KeDonThuocPage = () => {
  const [thuocs, setThuocs] = useState([]);
  const [donVis, setDonVis] = useState([]);
  const [dsDonThuoc, setDsDonThuoc] = useState([]);
  const [form, setForm] = useState({
    maPK: "",
    maThuoc: "",
    lieuLuong: "",
    donVi: "",
    soNgay: "",
    ghiChu: "",
  });

  useEffect(() => {
    fetchInit();
  }, []);

  const fetchInit = async () => {
    const resThuoc = await getAllThuoc();
    const resDonVi = await getDonViTinh();
    setThuocs(resThuoc.data.data || []);
    setDonVis(resDonVi.data.data || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchDon = async () => {
    if (!form.maPK) return;
    const res = await getDonThuocByPK(form.maPK);
    setDsDonThuoc(res.data.data || []);
  };

  const handleAdd = async () => {
    if (!form.maPK || !form.maThuoc || !form.lieuLuong) return alert("Thiếu dữ liệu!");
    await createDonThuoc(form);
    fetchDon();
    setForm({ ...form, maThuoc: "", lieuLuong: "", donVi: "", soNgay: "", ghiChu: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xoá mục này?")) {
      await deleteChiTietDonThuoc(id);
      fetchDon();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">💊 Kê đơn thuốc</h2>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-white p-4 rounded shadow">
        <input
          name="maPK"
          value={form.maPK}
          onChange={handleChange}
          placeholder="Nhập mã phiếu khám"
          className="input col-span-2"
        />
        <button onClick={fetchDon} className="bg-green-600 text-white px-4 py-2 rounded col-span-1">
          📄 Xem đơn
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-white p-4 rounded shadow">
        <select name="maThuoc" value={form.maThuoc} onChange={handleChange} className="input">
          <option value="">-- Chọn thuốc --</option>
          {thuocs.map((t) => (
            <option key={t.maThuoc} value={t.maThuoc}>
              {t.tenThuoc}
            </option>
          ))}
        </select>
        <input name="lieuLuong" value={form.lieuLuong} onChange={handleChange} placeholder="Liều lượng" className="input" />
        <select name="donVi" value={form.donVi} onChange={handleChange} className="input">
          <option value="">-- Đơn vị --</option>
          {donVis.map((dv) => (
            <option key={dv.maDVT} value={dv.tenDVT}>{dv.tenDVT}</option>
          ))}
        </select>
        <input name="soNgay" value={form.soNgay} onChange={handleChange} placeholder="Số ngày" className="input" />
        <input name="ghiChu" value={form.ghiChu} onChange={handleChange} placeholder="Ghi chú" className="input" />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
          ➕ Thêm
        </button>
      </div>

      <table className="min-w-full text-sm bg-white shadow rounded">
        <thead>
          <tr>
            <th>Thuốc</th><th>Liều</th><th>Đơn vị</th><th>Số ngày</th><th>Ghi chú</th><th></th>
          </tr>
        </thead>
        <tbody>
          {dsDonThuoc.map((ct) => (
            <tr key={ct.maCT || ct.maThuoc + ct.maDon} className="border-t">
              <td>{ct.tenThuoc}</td>
              <td>{ct.lieuLuong}</td>
              <td>{ct.donVi}</td>
              <td>{ct.soNgay}</td>
              <td>{ct.ghiChu}</td>
              <td>
                <button onClick={() => handleDelete(ct.maCT)} className="text-red-600 hover:underline">
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

export default KeDonThuocPage;
