import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function PatientMedicalRecord() {
  const [records, setRecords] = useState([]);
  const token = localStorage.getItem("token");
  const maTK = localStorage.getItem("maTK");

  const fetchMyRecords = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/medical-record`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { maBN: maTK },
      });
      setRecords(res.data);
    } catch (err) {
      toast.error("Không thể tải hồ sơ của bạn");
    }
  };

  useEffect(() => {
    fetchMyRecords();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Hồ sơ bệnh án của bạn</h2>
      <ul className="space-y-2">
        {records.map((rec) => (
          <li key={rec.maHS} className="border p-3 rounded shadow">
            📅 Ngày khám: {rec.dotKhamBenh?.split("T")[0]} <br />
            📄 Lịch sử bệnh: {rec.lichSuBenh} <br />
            📝 Ghi chú: {rec.ghiChu}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientMedicalRecord;
