import React, { useState } from "react";
import { createThanhToan } from "../../services/hoadon/hoadonService";
import axios from "../../api/axiosClient";

const ThanhToanForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    maHD: "",
    soTien: "",
    phuongThuc: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleThanhToan = async () => {
    await createThanhToan(form);
    await axios.put(`/hoadon/${form.maHD}`, { trangThai: "Đã thanh toán" });
    alert("✔ Ghi nhận thanh toán và cập nhật trạng thái");
    setForm({ maHD: "", soTien: "", phuongThuc: "" });
    onSuccess();
  };

  return (
    <section>
      <h3 className="font-semibold mb-2">💳 Ghi nhận thanh toán</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <input name="maHD" value={form.maHD} onChange={handleChange} placeholder="Mã hóa đơn" className="input" />
        <input name="soTien" type="number" value={form.soTien} onChange={handleChange} placeholder="Số tiền" className="input" />
        <select name="phuongThuc" value={form.phuongThuc} onChange={handleChange} className="input">
          <option value="">-- Phương thức --</option>
          <option>Tiền mặt</option>
          <option>Chuyển khoản</option>
        </select>
      </div>
      <button onClick={handleThanhToan} className="mt-3 bg-green-600 text-white px-4 py-2 rounded">
        💵 Ghi nhận
      </button>
    </section>
  );
};

export default ThanhToanForm;
