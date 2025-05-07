import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function PatientBilling() {
  const [bills, setBills] = useState([]);
  const token = localStorage.getItem("token");
  const maTK = localStorage.getItem("maTK");

  const fetchBills = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/billing/benh-nhan/${maTK}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBills(res.data);
    } catch (err) {
      toast.error("Không thể tải danh sách hóa đơn");
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Hóa đơn của bạn</h2>
      <ul className="space-y-2">
        {bills.map((bill) => (
          <li
            key={bill.maHD}
            className="border p-3 rounded shadow bg-white"
          >
            🧾 Mã hóa đơn: {bill.maHD} <br />
            📅 Ngày tạo: {bill.createdAt?.split("T")[0]} <br />
            💰 Tổng tiền: {bill.tongTien} VND <br />
            🏷️ Trạng thái: {bill.trangThai === "da_thanh_toan" ? "Đã thanh toán" : "Chưa thanh toán"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientBilling;
