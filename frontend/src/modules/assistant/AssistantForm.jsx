import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AssistantForm({ onSuccess, editData, setEditData }) {
  const [form, setForm] = useState({ maNS: "", maBacSi: "", phamViUyQuyen: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/assistant/${editData.maTroLy}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Đã cập nhật trợ lý");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/assistant`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Đã thêm trợ lý mới");
      }
      setForm({ maNS: "", maBacSi: "", phamViUyQuyen: "" });
      setEditData(null);
      onSuccess();
    } catch (err) {
      toast.error("Thao tác thất bại");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="maNS"
        value={form.maNS}
        onChange={handleChange}
        placeholder="Mã nhân sự"
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="text"
        name="maBacSi"
        value={form.maBacSi}
        onChange={handleChange}
        placeholder="Mã bác sĩ"
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="text"
        name="phamViUyQuyen"
        value={form.phamViUyQuyen}
        onChange={handleChange}
        placeholder="Phạm vi uỷ quyền (tuỳ chọn)"
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {editData ? "Cập nhật" : "Thêm mới"}
      </button>
    </form>
  );
}

export default AssistantForm;
