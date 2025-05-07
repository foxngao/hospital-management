import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function DoctorMedicalRecord() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    maBN: "",
    dotKhamBenh: "",
    lichSuBenh: "",
    ghiChu: ""
  });
  const token = localStorage.getItem("token");

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/medical-record`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(res.data);
    } catch (err) {
      toast.error("Lỗi khi tải hồ sơ bệnh án");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/medical-record`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Tạo hồ sơ thành công");
      setForm({ maBN: "", dotKhamBenh: "", lichSuBenh: "", ghiChu: "" });
      fetchRecords();
    } catch (err) {
      toast.error("Không thể tạo hồ sơ");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tạo hồ sơ bệnh án</h2>
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Mã bệnh nhân"
          value={form.maBN}
          onChange={(e) => setForm({ ...form, maBN: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="date"
          value={form.dotKhamBenh}
          onChange={(e) => setForm({ ...form, dotKhamBenh: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Lịch sử bệnh"
          value={form.lichSuBenh}
          onChange={(e) => setForm({ ...form, lichSuBenh: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Ghi chú"
          value={form.ghiChu}
          onChange={(e) => setForm({ ...form, ghiChu: e.target.value })}
          className="border p-2 w-full"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Tạo hồ sơ</button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Tất cả hồ sơ</h3>
      <ul className="space-y-3">
        {records.map((rec) => (
          <li key={rec.maHS} className="border p-3 rounded shadow">
            🆔 {rec.maHS} <br />
            👤 Mã bệnh nhân: {rec.maBN} <br />
            📅 Ngày khám: {rec.dotKhamBenh?.split("T")[0]} <br />
            📄 Lịch sử bệnh: {rec.lichSuBenh} <br />
            📝 Ghi chú: {rec.ghiChu}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorMedicalRecord;
