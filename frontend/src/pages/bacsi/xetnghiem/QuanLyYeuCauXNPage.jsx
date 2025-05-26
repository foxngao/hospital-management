// 📁 src/pages/bacsi/xetnghiem/QuanLyYeuCauXNPage.jsx

import React, { useEffect, useState } from "react";
import {
  getAllYeuCau,
  createYeuCau,
  updateTrangThai,
  deleteYeuCau,
} from "../../../services/xetnghiem/yeucauxetnghiemService";
import axios from "../../../api/axiosClient";
import { useAuth } from "../../../auth/AuthContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const QuanLyYeuCauXNPage = () => {
  const { maTK } = useAuth();
  const [maBS, setMaBS] = useState("");
  const [list, setList] = useState([]);
  const [benhNhan, setBenhNhan] = useState([]);
  const [dsLoaiYeuCau, setDsLoaiYeuCau] = useState([]);

  const [form, setForm] = useState({
    maBN: "",
    loaiYeuCau: "",
    trangThai: "Chờ xử lý",
  });

  useEffect(() => {
    fetchData();
    fetchBenhNhan();
    fetchLoaiYeuCau();
    fetchMaBS();
  }, []);

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
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-blue-700">🧪 Quản lý yêu cầu xét nghiệm</h2>

      {/* Form tạo mới */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-lg shadow">
        <select
          name="maBN"
          value={form.maBN}
          onChange={handleChange}
          className="form-select w-full border-gray-300 rounded-md"
        >
          <option value="">-- Chọn bệnh nhân --</option>
          {benhNhan.map((bn) => (
            <option key={bn.maBN} value={bn.maBN}>{bn.hoTen}</option>
          ))}
        </select>

        <select
          name="loaiYeuCau"
          value={form.loaiYeuCau}
          onChange={handleChange}
          className="form-select w-full border-gray-300 rounded-md"
        >
          <option value="">-- Loại yêu cầu --</option>
          {dsLoaiYeuCau.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>

        <input
          disabled
          value="Chờ xử lý"
          className="form-input w-full bg-gray-100 text-gray-700"
        />

        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
        >
          ➕ Tạo yêu cầu
        </button>
      </div>

      {/* Danh sách */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Mã YC</th>
              <th className="px-4 py-2">Bệnh nhân</th>
              <th className="px-4 py-2">Bác sĩ</th>
              <th className="px-4 py-2">Loại</th>
              <th className="px-4 py-2">Trạng thái</th>
              <th className="px-4 py-2">Ngày</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((y) => (
              <tr key={y.maYeuCau} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{y.maYeuCau}</td>
                <td className="px-4 py-2">{y.BenhNhan?.hoTen}</td>
                <td className="px-4 py-2">{y.BacSi?.hoTen}</td>
                <td className="px-4 py-2">{y.loaiYeuCau}</td>
                <td className="px-4 py-2">{y.trangThai}</td>
                <td className="px-4 py-2">
                  {dayjs(y.ngayYeuCau).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm")}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleUpdate(y.maYeuCau)}
                    className="text-green-600 hover:underline"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(y.maYeuCau)}
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

export default QuanLyYeuCauXNPage;
