import React, { useState } from "react";
import { getGioHang } from "../../services/hoadon/hoadonService";

const GioHangBenhNhan = () => {
  const [maBN, setMaBN] = useState("");
  const [gioHang, setGioHang] = useState([]);

  const fetchGioHang = async () => {
  try {
    const res = await getGioHang(maBN);
    setGioHang(res.data.data?.chiTiet || []);
  } catch (err) {
    console.error("❌ Không tìm thấy giỏ hàng:", err);
    alert("❌ Bệnh nhân chưa có giỏ hàng.");
    setGioHang([]);
  }
};

  return (
    <section>
      <h3 className="font-semibold mb-2">🛒 Giỏ hàng bệnh nhân</h3>
      <div className="flex gap-2 mb-2">
        <input
          value={maBN}
          onChange={(e) => setMaBN(e.target.value)}
          placeholder="Mã BN"
          className="input w-64"
        />
        <button onClick={fetchGioHang} className="bg-blue-500 text-white px-4 py-2 rounded">
          🔍 Tìm
        </button>
      </div>
      <table className="min-w-full text-sm border bg-white shadow rounded">
        <thead>
          <tr>
            <th>Loại DV</th>
            <th>Mã DV</th>
            <th>Giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {gioHang.map((g, i) => (
            <tr key={i} className="border-t">
              <td>{g.loaiDichVu}</td>
              <td>{g.maDichVu}</td>
              <td>{g.donGia}</td>
              <td>{g.thanhTien}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default GioHangBenhNhan;
