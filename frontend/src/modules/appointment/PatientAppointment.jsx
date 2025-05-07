import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function PatientAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    maBS: "",
    maCa: "",
    ngayHen: "",
    ghiChu: ""
  });

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/appointment`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filtered = res.data.filter(item => item.maBN === localStorage.getItem("maTK"));
      setAppointments(filtered);
    } catch (err) {
      toast.error("Lỗi khi tải lịch khám");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/appointment`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Đặt lịch thành công");
      fetchData();
    } catch (err) {
      toast.error("Lỗi khi đặt lịch");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Đặt lịch khám</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Mã bác sĩ"
          value={form.maBS}
          onChange={(e) => setForm({ ...form, maBS: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Mã ca khám"
          value={form.maCa}
          onChange={(e) => setForm({ ...form, maCa: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="date"
          value={form.ngayHen}
          onChange={(e) => setForm({ ...form, ngayHen: e.target.value })}
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Đặt lịch
        </button>
      </form>

      <h3 className="text-lg font-semibold mt-6 mb-2">Lịch hẹn của bạn</h3>
      <ul className="space-y-2">
        {appointments.map((item) => (
          <li key={item.maLH} className="border p-3 rounded shadow">
            🧑‍⚕️ Bác sĩ: {item.tenBS || item.maBS} <br />
            🕒 Thời gian: {item.ngayHen} <br />
            📝 Ghi chú: {item.ghiChu}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientAppointment;
