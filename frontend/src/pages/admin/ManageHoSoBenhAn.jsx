// File: src/pages/admin/ManageHoSoBenhAn.jsx
// Admin chỉ xem + xoá, không được tạo HSBA – dotKhamBenh auto giờ Việt Nam

import React, { useEffect, useState } from "react";
import axios from "../../api/axiosClient";
import toast from "react-hot-toast";

function ManageHoSoBenhAn() {
  const [list, setList] = useState([]);
  const [dsBN, setDsBN] = useState([]);
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role") === "ADMIN";

  const getVNDateTimeLocal = () => {
    const now = new Date();
    now.setHours(now.getHours() + 7);
    return now.toISOString().slice(0, 16);
  };

  const [form, setForm] = useState({
    dotKhamBenh: getVNDateTimeLocal(),
  });

  const fetchAll = async () => {
    try {
      const [res, bnRes] = await Promise.all([
        axios.get("/hsba", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("/benhnhan", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (!res.data.success) throw new Error("API trả về lỗi");
      setList(res.data.data || []);
      setDsBN(bnRes.data.data || []);
    } catch (err) {
      console.error("❌ Lỗi tải dữ liệu:", err);
      toast.error("Lỗi tải dữ liệu hồ sơ bệnh án");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/hsba", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Tạo hồ sơ thành công");
      setForm({ dotKhamBenh: getVNDateTimeLocal() });
      fetchAll();
    } catch {
      toast.error("Lỗi khi lưu hồ sơ");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xoá hồ sơ?")) return;
    try {
      await axios.delete(`/hsba/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Đã xoá hồ sơ");
      fetchAll();
    } catch {
      toast.error("Lỗi xoá hồ sơ");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Quản lý hồ sơ bệnh án</h2>

      {!isAdmin && (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="maBN"
              value={form?.maBN || ""}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">-- Chọn bệnh nhân --</option>
              {dsBN.map((bn) => (
                <option key={bn.maBN} value={bn.maBN}>
                  {bn.hoTen}
                </option>
              ))}
            </select>

            <input
              type="datetime-local"
              name="dotKhamBenh"
              value={form?.dotKhamBenh || ""}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            <input
              name="lichSuBenh"
              value={form?.lichSuBenh || ""}
              onChange={handleChange}
              placeholder="Lịch sử bệnh"
              className="border p-2 rounded"
              required
            />

            <input
              name="ghiChu"
              value={form?.ghiChu || ""}
              onChange={handleChange}
              placeholder="Ghi chú"
              className="border p-2 rounded"
            />
          </div>

          <div className="text-right">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Tạo hồ sơ
            </button>
          </div>
        </form>
      )}

      <table className="w-full border text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Mã HSBA</th>
            <th className="p-2">Bệnh nhân</th>
            <th className="p-2">Đợt khám</th>
            <th className="p-2">Lịch sử bệnh</th>
            <th className="p-2">Ghi chú</th>
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {list.map((row) => (
            <tr key={row.maHSBA} className="border-b">
              <td className="p-2">{row.maHSBA}</td>
              <td className="p-2">{row.BenhNhan?.hoTen || row.maBN}</td>
              <td className="p-2">{row.dotKhamBenh}</td>
              <td className="p-2">{row.lichSuBenh}</td>
              <td className="p-2">{row.ghiChu || "-"}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleDelete(row.maHSBA)} className="text-red-600 hover:underline">
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageHoSoBenhAn;
