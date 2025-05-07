import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [keyword, setKeyword] = useState("");
  const token = localStorage.getItem("token");

  const fetchMedicines = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/pharmacy`, {
        headers: { Authorization: `Bearer ${token}` },
        params: keyword ? { tenThuoc: keyword } : {},
      });
      setMedicines(res.data);
    } catch (err) {
      toast.error("Không thể tải danh sách thuốc");
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, [keyword]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Danh sách thuốc</h2>

      <input
        type="text"
        placeholder="Tìm theo tên thuốc"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border px-3 py-2 mb-4 w-full"
      />

      <ul className="space-y-3">
        {medicines.map((thuoc) => (
          <li key={thuoc.maThuoc} className="border p-3 rounded shadow">
            💊 <strong>{thuoc.tenThuoc}</strong><br />
            🔖 Nhóm: {thuoc.maNhom}<br />
            📦 Đơn vị: {thuoc.donVi}<br />
            💰 Giá: {thuoc.gia} VND<br />
            📦 Số lượng: {thuoc.soLuong}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicineList;
