import React, { useEffect, useState } from "react";
import {
  getAllPhieu,
  createPhieu,
  updatePhieu,
  deletePhieu,
} from "../../../services/xetnghiem/phieuxetnghiemService";
import axios from "../../../api/axiosClient";

const PhieuXetNghiemPage = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    maYeuCau: "",
    maXN: "",
    maNS: "",
    maHSBA: "",
    ngayThucHien: "",
    ghiChu: "",
  });
  const [yeuCauList, setYeuCauList] = useState([]);
  const [xetNghiemList, setXetNghiemList] = useState([]);
  const [nhanSuList, setNhanSuList] = useState([]);
  const [hoSoList, setHoSoList] = useState([]);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    const res = await getAllPhieu();
    setList(res.data.data || []);
    const [yc, xn, ns, hs] = await Promise.all([
      axios.get("/yeucauxetnghiem"),
      axios.get("/xetnghiem"),
      axios.get("/nhansu"),
      axios.get("/hsba"),
    ]);
    setYeuCauList(yc.data.data || []);
    setXetNghiemList(xn.data.data || []);
    setNhanSuList(ns.data.data || []);
    setHoSoList(hs.data.data || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    await createPhieu(form);
    loadAll();
    setForm({
      maYeuCau: "",
      maXN: "",
      maNS: "",
      maHSBA: "",
      ngayThucHien: "",
      ghiChu: "",
    });
  };

  const handleUpdate = async (id, payload) => {
    await updatePhieu(id, payload);
    loadAll();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn xoá không?")) {
      await deletePhieu(id);
      loadAll();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">📄 Quản lý phiếu xét nghiệm</h2>

      {/* Form tạo mới */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 shadow rounded">
        <select name="maYeuCau" value={form.maYeuCau} onChange={handleChange} className="input">
          <option value="">-- Chọn yêu cầu --</option>
          {yeuCauList.map((item) => (
            <option key={item.maYeuCau} value={item.maYeuCau}>{item.maYeuCau}</option>
          ))}
        </select>
        <select name="maXN" value={form.maXN} onChange={handleChange} className="input">
          <option value="">-- Chọn xét nghiệm --</option>
          {xetNghiemList.map((item) => (
            <option key={item.maXN} value={item.maXN}>{item.tenXN}</option>
          ))}
        </select>
        <select name="maNS" value={form.maNS} onChange={handleChange} className="input">
          <option value="">-- Chọn nhân sự --</option>
          {nhanSuList.map((item) => (
            <option key={item.maNS} value={item.maNS}>{item.hoTen}</option>
          ))}
        </select>
        <select name="maHSBA" value={form.maHSBA} onChange={handleChange} className="input">
          <option value="">-- Chọn hồ sơ bệnh án --</option>
          {hoSoList.map((item) => (
            <option key={item.maHSBA} value={item.maHSBA}>{item.maHSBA}</option>
          ))}
        </select>
        <input type="date" name="ngayThucHien" value={form.ngayThucHien} onChange={handleChange} className="input" />
        <textarea name="ghiChu" value={form.ghiChu} onChange={handleChange} placeholder="Ghi chú" className="input col-span-2" />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">
          ➕ Tạo phiếu
        </button>
      </div>

      {/* Bảng danh sách */}
      <table className="min-w-full text-sm border bg-white shadow rounded">
        <thead>
          <tr>
            <th>Mã phiếu</th>
            <th>Yêu cầu</th>
            <th>Xét nghiệm</th>
            <th>Nhân sự</th>
            <th>HSBA</th>
            <th>Ngày</th>
            <th>Kết quả</th>
            <th>Ghi chú</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((p) => (
            <tr key={p.maPhieuXN} className="border-t">
              <td>{p.maPhieuXN}</td>
              <td>{p.maYeuCau}</td>
              <td>{p.XetNghiem?.tenXN}</td>
              <td>{p.NhanSuYTe?.hoTen}</td>
              <td>{p.maHSBA}</td>
              <td>{p.ngayThucHien}</td>
              <td>
                <input
                  name="ketQua"
                  defaultValue={p.ketQua || ""}
                  onBlur={(e) => handleUpdate(p.maPhieuXN, { ketQua: e.target.value })}
                  className="border px-1 py-0.5 w-24"
                />
              </td>
              <td>
                <input
                  name="ghiChu"
                  defaultValue={p.ghiChu || ""}
                  onBlur={(e) => handleUpdate(p.maPhieuXN, { ghiChu: e.target.value })}
                  className="border px-1 py-0.5 w-32"
                />
              </td>
              <td>
                <button onClick={() => handleDelete(p.maPhieuXN)} className="text-red-600 hover:underline">
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

export default PhieuXetNghiemPage;
