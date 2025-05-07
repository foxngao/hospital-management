import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function PatientLabTest() {
  const [tests, setTests] = useState([]);
  const token = localStorage.getItem("token");
  const maTK = localStorage.getItem("maTK");

  const fetchMyTests = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/lab-test`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { maBN: maTK },
      });
      setTests(res.data);
    } catch (err) {
      toast.error("Không thể tải danh sách phiếu");
    }
  };

  useEffect(() => {
    fetchMyTests();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Kết quả xét nghiệm của bạn</h2>
      <ul className="space-y-2">
        {tests.map((test) => (
          <li key={test.maPXN} className="border p-3 rounded shadow bg-white">
            🧪 Mã phiếu: {test.maPXN} <br />
            🧫 Loại: {test.maLoaiXN} <br />
            📅 Ngày yêu cầu: {test.ngayYeuCau?.split("T")[0]} <br />
            📃 Kết quả: {test.ketQua || "Đang chờ..."} <br />
            📌 Trạng thái: {test.trangThai}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientLabTest;
