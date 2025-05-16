import React, { useEffect, useState } from "react";
import {
  getAllPhieu,
  createPhieu,
  updatePhieu,
  deletePhieu,
} from "../../../services/nhansu/xetnghiem/phieuxetnghiemService";
import axios from "../../../api/axiosClient";

const PhieuXetNghiemPage = () => {
  const [list, setList] = useState([]);

  const todayVN = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
  });

  const [form, setForm] = useState({
    maYeuCau: "",
    maXN: "",
    maHSBA: "",
    ngayThucHien: todayVN,
    ghiChu: "",
  });

  const maNS = localStorage.getItem("maTK");
  const [dsYeuCau, setDsYeuCau] = useState([]);
  const [dsXN, setDsXN] = useState([]);
  const [dsHSBA, setDsHSBA] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getAllPhieu();
    setList(res.data.data || []);

    const [yc, xn, hs] = await Promise.all([
      axios.get("/yeucauxetnghiem"),
      axios.get("/xetnghiem"),
      axios.get("/hsba"),
    ]);

    setDsYeuCau(yc.data.data || []);
    setDsXN(xn.data.data || []);
    setDsHSBA(hs.data.data || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    await createPhieu({ ...form, maNS });
    loadData();
    setForm({ maYeuCau: "", maXN: "", maHSBA: "", ngayThucHien: todayVN, ghiChu: "" });
  };

  const handleUpdate = async (id, ketQua, ghiChu) => {
    await updatePhieu(id, { ketQua, ghiChu });
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xoá phiếu này?")) {
      await deletePhieu(id);
      loadData();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">📋 Phiếu xét nghiệm</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 shadow rounded">
        <select name="maYeuCau" value={form.maYeuCau} onChange={handleChange} className="input">
          <option value="">-- Chọn yêu cầu --</option>
          {dsYeuCau.map((y) => (
            <option key={y.maYeuCau} value={y.maYeuCau}>{y.maYeuCau}</option>
          ))}
        </select>
        <select name="maXN" value={form.maXN} onChange={handleChange} className="input">
          <option value="">-- Chọn xét nghiệm --</option>
          {dsXN.map((x) => (
            <option key={x.maXN} value={x.maXN}>{x.tenXN}</option>
          ))}
        </select>
        <select name="maHSBA" value={form.maHSBA} onChange={handleChange} className="input">
          <option value="">-- Chọn hồ sơ bệnh án --</option>
          {dsHSBA.map((h) => (
            <option key={h.maHSBA} value={h.maHSBA}>{h.maHSBA}</option>
          ))}
        </select>
        <input
          type="date"
          name="ngayThucHien"
          value={form.ngayThucHien}
          onChange={handleChange}
          className="input"
        />
        <textarea
          name="ghiChu"
          value={form.ghiChu}
          onChange={handleChange}
          placeholder="Ghi chú"
          className="input col-span-2"
        />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">
          ➕ Tạo phiếu
        </button>
      </div>

      <table className="min-w-full text-sm border bg-white shadow rounded">
        <thead>
          <tr>
            <th>Mã</th><th>Yêu cầu</th><th>Xét nghiệm</th><th>HSBA</th>
            <th>Ngày</th><th>Kết quả</th><th>Ghi chú</th><th>Người nhập</th><th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((p) => (
            <tr key={p.maPhieuXN} className="border-t">
              <td>{p.maPhieuXN}</td>
              <td>{p.maYeuCau}</td>
              <td>{p.XetNghiem?.tenXN}</td>
              <td>{p.maHSBA}</td>
              <td>{p.ngayThucHien}</td>
              <td>
                <input
                  defaultValue={p.ketQua || ""}
                  onBlur={(e) => handleUpdate(p.maPhieuXN, e.target.value, p.ghiChu)}
                  className="input w-24"
                />
              </td>
              <td>
                <input
                  defaultValue={p.ghiChu || ""}
                  onBlur={(e) => handleUpdate(p.maPhieuXN, p.ketQua, e.target.value)}
                  className="input w-32"
                />
              </td>
              <td>{p.NhanSuYTe?.hoTen}</td>
              <td>
                <button onClick={() => handleDelete(p.maPhieuXN)} className="text-red-600 hover:underline">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PhieuXetNghiemPage;
