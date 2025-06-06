import React, { useEffect, useState } from "react";
import axios from "../../api/axiosClient";
import toast from "react-hot-toast";

function ManageNhanSu() {
  const [dsNhanSu, setDsNhanSu] = useState([]);
  const [dsKhoa, setDsKhoa] = useState([]);
  const [form, setForm] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNhanSu();
    fetchKhoa();
  }, []);

  const fetchNhanSu = async () => {
    try {
      const res = await axios.get("/nhansu", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDsNhanSu(res.data.data || []);
    } catch {
      toast.error("Không thể tải danh sách nhân sự");
    }
  };

  const fetchKhoa = async () => {
    try {
      const res = await axios.get("/khoa", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDsKhoa(res.data.data || []);
    } catch {
      toast.error("Không thể tải danh sách khoa");
    }
  };

  const handleEdit = (ns) => setForm({ ...ns });

  const handleDelete = async (maNS) => {
    if (!window.confirm("Xác nhận xoá nhân sự này?")) return;
    try {
      await axios.delete(`/nhansu/${maNS}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Đã xoá nhân sự");
      fetchNhanSu();
    } catch {
      toast.error("Không thể xoá nhân sự");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form) return;
    try {
      await axios.put(`/nhansu/${form.maNS}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Cập nhật thành công");
      setForm(null);
      fetchNhanSu();
    } catch {
      toast.error("Lỗi khi cập nhật");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">👥 Quản lý nhân viên y tế</h2>

      {form && (
        <form
          onSubmit={handleUpdate}
          className="bg-white shadow-md rounded-lg p-6 space-y-4 mb-8 border"
        >
          <h3 className="text-lg font-semibold text-gray-700">📝 Cập nhật thông tin</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="hoTen"
              value={form.hoTen}
              onChange={handleChange}
              placeholder="Họ tên"
              className="border px-3 py-2 rounded"
              required
            />
            <select
              name="loaiNS"
              value={form.loaiNS}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              required
            >
              <option value="">-- Chọn loại nhân sự --</option>
              <option value="YT">Y tá / Điều dưỡng</option>
              <option value="TN">Tiếp nhận</option>
              <option value="XN">Nhân viên xét nghiệm</option>
              <option value="HC">Hành chính</option>
              <option value="KT">Kế toán</option>
            </select>
            <input
              name="capBac"
              value={form.capBac}
              onChange={handleChange}
              placeholder="Cấp bậc"
              className="border px-3 py-2 rounded"
              required
            />
            <input
              name="chuyenMon"
              value={form.chuyenMon}
              onChange={handleChange}
              placeholder="Chuyên môn"
              className="border px-3 py-2 rounded"
              required
            />
            <select
              name="maKhoa"
              value={form.maKhoa}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              required
            >
              <option value="">-- Chọn khoa --</option>
              {dsKhoa.map((k) => (
                <option key={k.maKhoa} value={k.maKhoa}>
                  {k.tenKhoa} ({k.maKhoa})
                </option>
              ))}
            </select>
          </div>
          <div className="text-right pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              💾 Lưu cập nhật
            </button>
            <button
              type="button"
              onClick={() => setForm(null)}
              className="ml-2 px-4 py-2 border rounded hover:bg-gray-100"
            >
              ❌ Hủy
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm border rounded-lg bg-white shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Mã NS</th>
              <th className="p-3 text-left">Họ tên</th>
              <th className="p-3 text-left">Loại</th>
              <th className="p-3 text-left">Cấp bậc</th>
              <th className="p-3 text-left">Chuyên môn</th>
              <th className="p-3 text-left">Khoa</th>
              <th className="p-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {dsNhanSu.map((ns) => (
              <tr key={ns.maNS} className="border-t hover:bg-gray-50">
                <td className="p-3">{ns.maNS}</td>
                <td className="p-3">{ns.hoTen}</td>
                <td className="p-3">{ns.loaiNS}</td>
                <td className="p-3">{ns.capBac}</td>
                <td className="p-3">{ns.chuyenMon}</td>
                <td className="p-3">{ns.maKhoa}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(ns)}
                    className="text-yellow-600 hover:underline text-sm"
                  >
                    📝 Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(ns.maNS)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    🗑️ Xoá
                  </button>
                </td>
              </tr>
            ))}
            {dsNhanSu.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500 italic">
                  Không có dữ liệu nhân sự.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageNhanSu;
