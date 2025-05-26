import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosClient";

const ThongKeLichLamViecPage = () => {
  const [lichList, setLichList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [thongKe, setThongKe] = useState({ bacSi: 0, nhanSu: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("/lichlamviec");
    setLichList(res.data.data || []);
  };

  const handleFilter = () => {
    if (!selectedDate) return;

    const filtered = lichList.filter((item) => {
      const ngay = item.ngayLamViec?.slice(0, 10); // YYYY-MM-DD
      return ngay === selectedDate;
    });

    const maBSSet = new Set(filtered.map((item) => item.maBS).filter((v) => v));
    const maNSSet = new Set(filtered.map((item) => item.maNS).filter((v) => v));

    setThongKe({ bacSi: maBSSet.size, nhanSu: maNSSet.size });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-blue-700">📊 Thống kê lịch làm việc trong ngày</h2>

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

      <div className="bg-white rounded shadow p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">📅 Ngày: {selectedDate || "Chưa chọn"}</h3>
        <p>👨‍⚕️ Số bác sĩ làm việc: <span className="font-bold text-blue-700">{thongKe.bacSi}</span></p>
        <p>🧑‍⚕️ Số nhân sự y tế: <span className="font-bold text-green-700">{thongKe.nhanSu}</span></p>
      </div>
    </div>
  );
};

export default ThongKeLichLamViecPage;
