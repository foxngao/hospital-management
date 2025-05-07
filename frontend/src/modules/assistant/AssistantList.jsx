import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AssistantList() {
  const [assistants, setAssistants] = useState([]);
  const [form, setForm] = useState({ maNS: "", maBacSi: "", phamViUyQuyen: "" });
  const [editing, setEditing] = useState(null);
  const token = localStorage.getItem("token");

  const fetchAssistants = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/assistant`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssistants(res.data);
    } catch (err) {
      toast.error("Không thể tải danh sách trợ lý");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/assistant/${editing.maTroLy}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Đã cập nhật trợ lý");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/assistant`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Đã thêm trợ lý");
      }
      setForm({ maNS: "", maBacSi: "", phamViUyQuyen: "" });
      setEditing(null);
      fetchAssistants();
    } catch (err) {
      toast.error("Thao tác thất bại");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Xác nhận xoá trợ lý?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/assistant/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Đã xoá trợ lý");
      fetchAssistants();
    } catch (err) {
      toast.error("Xoá thất bại");
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý Trợ lý</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          type="text"
          name="maNS"
          value={form.maNS}
          onChange={(e) => setForm({ ...form, maNS: e.target.value })}
          placeholder="Mã nhân sự"
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="maBacSi"
          value={form.maBacSi}
          onChange={(e) => setForm({ ...form, maBacSi: e.target.value })}
          placeholder="Mã bác sĩ"
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="phamViUyQuyen"
          value={form.phamViUyQuyen}
          onChange={(e) => setForm({ ...form, phamViUyQuyen: e.target.value })}
          placeholder="Phạm vi uỷ quyền (tuỳ chọn)"
          className="border p-2 w-full rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editing ? "Cập nhật" : "Thêm mới"}
        </button>
      </form>

      <ul className="space-y-2">
        {assistants.map((item) => (
          <li
            key={item.maTroLy}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p>👤 Mã trợ lý: {item.maTroLy}</p>
              <p>🧑‍⚕️ Mã bác sĩ: {item.maBacSi}</p>
              <p>📌 Phạm vi: {item.phamViUyQuyen || "Không có"}</p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-yellow-400 text-white px-3 py-1 rounded"
                onClick={() => {
                  setForm({
                    maNS: item.maNS,
                    maBacSi: item.maBacSi,
                    phamViUyQuyen: item.phamViUyQuyen,
                  });
                  setEditing(item);
                }}
              >
                Sửa
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(item.maTroLy)}
              >
                Xoá
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssistantList;
