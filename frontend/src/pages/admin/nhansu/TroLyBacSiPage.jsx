import React, { useEffect, useState } from "react";
import {
  getTroLyList,
  createTroLy,
  updateTroLy,
  deleteTroLy,
} from "../../../services/troly/trolyService";

const TroLyBacSiPage = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user?.maNhom === "ADMIN";

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await getTroLyList();
      const raw = res.data?.data || res.data;
      const safeList = Array.isArray(raw) ? raw : [];
      setList(safeList);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách trợ lý:", err);
      alert("Lỗi tải danh sách trợ lý");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEdit(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xoá trợ lý này?")) return;
    await deleteTroLy(id);
    fetchList();
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateTroLy(form.maTroLy, form);
      } else {
        await createTroLy(form);
      }
      setForm({});
      setIsEdit(false);
      fetchList();
    } catch (err) {
      alert("Lỗi xử lý: " + (err?.response?.data?.message || "Server error"));
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">👩‍⚕️ Quản lý trợ lý bác sĩ</h2>

      <table className="min-w-full border text-sm bg-white rounded shadow">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-2 py-1">Mã trợ lý</th>
            <th>Mã NS</th>
            <th>Mã Bác sĩ</th>
            <th>Phạm vi</th>
            {isAdmin && <th>Hành động</th>}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(list) && list.map((t) => (
            <tr key={t.maTroLy} className="border-t">
              <td className="px-2 py-1">{t.maTroLy}</td>
              <td>{t.maNS}</td>
              <td>{t.maBacSi}</td>
              <td>{t.phamViUyQuyen}</td>
              {isAdmin && (
                <td className="space-x-2">
                  <button onClick={() => handleEdit(t)} className="text-blue-600 hover:underline">
                    Sửa
                  </button>
                  <button onClick={() => handleDelete(t.maTroLy)} className="text-red-600 hover:underline">
                    Xoá
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {isAdmin && (
        <div className="bg-gray-50 p-4 rounded shadow space-y-3">
          <h3 className="font-semibold text-blue-700">{isEdit ? "✏️ Cập nhật" : "➕ Thêm mới"} trợ lý</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="maNS"
              value={form.maNS || ""}
              onChange={handleChange}
              placeholder="Mã nhân sự"
              className="input"
            />
            <input
              name="maBacSi"
              value={form.maBacSi || ""}
              onChange={handleChange}
              placeholder="Mã bác sĩ"
              className="input"
            />
            <textarea
              name="phamViUyQuyen"
              value={form.phamViUyQuyen || ""}
              onChange={handleChange}
              placeholder="Phạm vi uỷ quyền"
              className="input col-span-2"
              rows={3}
            />
          </div>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            {isEdit ? "💾 Cập nhật" : "➕ Thêm trợ lý"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TroLyBacSiPage;
