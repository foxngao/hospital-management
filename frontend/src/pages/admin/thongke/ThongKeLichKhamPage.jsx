import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosClient";

const ThongKeLichKhamPage = () => {
  const [lichList, setLichList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [thongKe, setThongKe] = useState({
    tongLich: 0,
    soBacSi: 0,
    soBenhNhan: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("/lichkham");
    setLichList(res.data.data || []);
  };

  const handleFilter = () => {
    if (!selectedDate) return;

    const filtered = lichList.filter(
      (item) => item.ngayKham?.slice(0, 10) === selectedDate
    );

    const uniqueBS = new Set(filtered.map((item) => item.maBS));
    const uniqueBN = new Set(filtered.map((item) => item.maBN));

    setThongKe({
      tongLich: filtered.length,
      soBacSi: uniqueBS.size,
      soBenhNhan: uniqueBN.size,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-blue-700">📅 Thống kê lịch khám bệnh trong ngày</h2>

      <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row items-center gap-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          🔍 Thống kê
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">📆 Ngày: {selectedDate || "Chưa chọn"}</h3>
        <p>📄 Tổng số lịch khám: <span className="font-bold text-blue-700">{thongKe.tongLich}</span></p>
        <p>👨‍⚕️ Số bác sĩ tham gia: <span className="font-bold text-green-700">{thongKe.soBacSi}</span></p>
        <p>🧑‍🦽 Số bệnh nhân: <span className="font-bold text-red-600">{thongKe.soBenhNhan}</span></p>
      </div>
    </div>
  );
};

export default ThongKeLichKhamPage;
