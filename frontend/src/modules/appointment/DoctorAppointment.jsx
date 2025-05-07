import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function DoctorAppointment() {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/appointment`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filtered = res.data.filter(item => item.maBS === localStorage.getItem("maTK"));
      setAppointments(filtered);
    } catch (err) {
      toast.error("Lỗi khi tải lịch khám của bác sĩ");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lịch hẹn của bác sĩ</h2>
      <ul className="space-y-2">
        {appointments.map((item) => (
          <li key={item.maLH} className="border p-3 rounded shadow">
            🧑‍⚕️ Bệnh nhân: {item.tenBN || item.maBN} <br />
            🏥 Khoa: {item.maKhoa} <br />
            ⏰ Thời gian: {item.ngayHen} <br />
            📝 Ghi chú: {item.ghiChu}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorAppointment;
