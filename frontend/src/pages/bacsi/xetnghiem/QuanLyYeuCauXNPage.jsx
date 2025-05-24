import React, { useEffect, useState } from "react";
import {
  getAllYeuCau,
  createYeuCau,
  updateTrangThai,
  deleteYeuCau,
} from "../../../services/xetnghiem/yeucauxetnghiemService";
import axios from "../../../api/axiosClient";
import { useAuth } from "../../../auth/AuthContext";

const QuanLyYeuCauXNPage = () => {
  const { maTK } = useAuth(); // ✅ lấy từ context
  const [maBS, setMaBS] = useState("");
  const [list, setList] = useState([]);
  const [benhNhan, setBenhNhan] = useState([]);
  const [dsLoaiYeuCau, setDsLoaiYeuCau] = useState([]);

  const [form, setForm] = useState({
    maBN: "",
    loaiYeuCau: "",
    trangThai: "Chờ xử lý",
  });

  const fetchData = async () => {
    const res = await getAllYeuCau();
    setList(res.data.data || []);
  };

  const fetchBenhNhan = async () => {
    const res = await axios.get("/benhnhan");
    setBenhNhan(res.data.data || []);
  };

  const fetchLoaiYeuCau = () => {
    setDsLoaiYeuCau([
      { value: "THONG_THUONG", label: "Thông thường" },
      { value: "KHAN_CAP", label: "Khẩn cấp" },
      { value: "THEO_DOI", label: "Theo dõi" },
    ]);
  };

  const fetchMaBS = async () => {
    try {
      const res = await axios.get(`/bacsi/tk/${maTK}`);
      setMaBS(res.data.data.maBS);
    } catch (err) {
      console.error("❌ Lỗi lấy maBS:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBenhNhan();
    fetchLoaiYeuCau();
    fetchMaBS();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const payload = { ...form, maBS };
    await createYeuCau(payload);
    fetchData();
    setForm({ maBN: "", loaiYeuCau: "", trangThai: "Chờ xử lý" });
  };

  const handleUpdate = async (id) => {
    const newStatus = prompt("Nhập trạng thái mới:");
    if (newStatus) {
      await updateTrangThai(id, { trangThai: newStatus });
      fetchData();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xoá yêu cầu này?")) {
      await deleteYeuCau(id);
      fetchData();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">🧪 Quản lý yêu cầu xét nghiệm</h2>

      {/* Form tạo mới */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 shadow rounded">
        <select name="maBN" onChange={handleChange} value={form.maBN} className="input">
          <option value="">-- Chọn bệnh nhân --</option>
          {benhNhan.map((bn) => (
            <option key={bn.maBN} value={bn.maBN}>{bn.hoTen}</option>
          ))}
        </select>

        <select name="loaiYeuCau" onChange={handleChange} value={form.loaiYeuCau} className="input">
          <option value="">-- Loại yêu cầu --</option>
          {dsLoaiYeuCau.map((item, idx) => (
            <option key={idx} value={item.value}>{item.label}</option>
          ))}
        </select>

        <input disabled value="Chờ xử lý" className="input bg-gray-100" />

        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">
          ➕ Tạo yêu cầu
        </button>
      </div>

      {/* Table danh sách */}
      <table className="min-w-full text-sm border bg-white shadow rounded">
        <thead>
          <tr>
            <th>Mã YC</th>
            <th>Bệnh nhân</th>
            <th>Bác sĩ</th>
            <th>Loại</th>
            <th>Trạng thái</th>
            <th>Ngày</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((y) => (
            <tr key={y.maYeuCau} className="border-t">
              <td>{y.maYeuCau}</td>
              <td>{y.BenhNhan?.hoTen}</td>
              <td>{y.BacSi?.hoTen}</td>
              <td>{y.loaiYeuCau}</td>
              <td>{y.trangThai}</td>
              <td>{y.ngayYeuCau}</td>
              <td className="space-x-2">
                <button onClick={() => handleUpdate(y.maYeuCau)} className="text-green-600 hover:underline">Sửa</button>
                <button onClick={() => handleDelete(y.maYeuCau)} className="text-red-600 hover:underline">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuanLyYeuCauXNPage;
