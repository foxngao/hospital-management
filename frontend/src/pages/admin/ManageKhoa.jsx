import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageKhoa = () => {
  const [dsKhoa, setDsKhoa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ maKhoa: "", tenKhoa: "", moTa: "" });
  const [editMode, setEditMode] = useState(false);

  const fetchKhoa = async () => {
    try {
      const res = await axios.get("/api/khoa");
      setDsKhoa(res.data.data);
    } catch (err) {
      console.error("❌ Lỗi load khoa:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKhoa();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`/api/khoa/${form.maKhoa}`, {
          tenKhoa: form.tenKhoa,
          moTa: form.moTa,
        });
        alert("✅ Sửa thành công");
      } else {
        await axios.post("/api/khoa", {
          tenKhoa: form.tenKhoa,
          moTa: form.moTa,
        });
        alert("✅ Tạo mới thành công");
      }
      setForm({ maKhoa: "", tenKhoa: "", moTa: "" });
      setEditMode(false);
      fetchKhoa();
    } catch (err) {
      alert("❌ Lỗi xử lý: " + err.response?.data?.message);
    }
  };

  const handleEdit = (khoa) => {
    setForm(khoa);
    setEditMode(true);
  };

  const handleDelete = async (maKhoa) => {
    if (!window.confirm("Bạn có chắc muốn xoá?")) return;
    try {
      await axios.delete(`/api/khoa/${maKhoa}`);
      alert("✅ Xoá thành công");
      fetchKhoa();
    } catch (err) {
      alert("❌ Không thể xoá khoa: " + err.response?.data?.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-3">Quản lý Khoa</h2>

      <form onSubmit={handleSubmit} className="mb-5 space-y-3">
        <div>
          <input
            type="text"
            name="tenKhoa"
            placeholder="Tên khoa"
            value={form.tenKhoa}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <textarea
            name="moTa"
            placeholder="Mô tả"
            value={form.moTa || ""}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editMode ? "💾 Lưu sửa" : "➕ Thêm mới"}
        </button>
        {editMode && (
          <button
            type="button"
            onClick={() => {
              setForm({ maKhoa: "", tenKhoa: "", moTa: "" });
              setEditMode(false);
            }}
            className="ml-2 px-3 py-2 bg-gray-300 rounded"
          >
            Huỷ
          </button>
        )}
      </form>

      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Mã</th>
            <th className="p-2 border">Tên</th>
            <th className="p-2 border">Mô tả</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="4" className="p-4 text-center">Đang tải...</td></tr>
          ) : (
            dsKhoa.map((khoa) => (
              <tr key={khoa.maKhoa}>
                <td className="border p-2">{khoa.maKhoa}</td>
                <td className="border p-2">{khoa.tenKhoa}</td>
                <td className="border p-2">{khoa.moTa}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(khoa)}
                    className="px-2 py-1 bg-yellow-400 text-white rounded"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(khoa.maKhoa)}
                    className="px-2 py-1 bg-red-600 text-white rounded"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageKhoa;
