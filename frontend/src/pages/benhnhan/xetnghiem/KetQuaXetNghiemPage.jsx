import React, { useEffect, useState } from "react";
import { getAllKetQua } from "../../../services/xetnghiem_BN/ketquaxetnghiemService";

const KetQuaXetNghiemPage = () => {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [ngayFilter, setNgayFilter] = useState("");
  const maBN = localStorage.getItem("maBN");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllKetQua();
      const all = res.data.data || [];

      console.log("📥 Dữ liệu xét nghiệm trả về:", all);

      const own = all.filter(item => item.YeuCau?.maBN === maBN);
      setList(own);
      setFiltered(own);
    } catch (err) {
      console.error("❌ Lỗi tải kết quả xét nghiệm:", err);
    }
  };

  const handleFilter = () => {
    let result = list;
    if (ngayFilter) {
      result = result.filter(item => item.ngayThucHien?.slice(0, 10) === ngayFilter);
    }
    setFiltered(result);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">🧪 Kết quả xét nghiệm</h1>

      {/* FILTER */}
      <div className="bg-white p-4 rounded-xl shadow flex flex-wrap items-center gap-4">
        <input
          type="date"
          value={ngayFilter}
          onChange={(e) => setNgayFilter(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Lọc theo ngày
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 text-gray-600 font-semibold">
            <tr>
              <th className="p-3 border">Ngày</th>
              <th className="p-3 border">Tên XN</th>
              <th className="p-3 border">Loại XN</th>
              <th className="p-3 border">Kết quả</th>
              <th className="p-3 border">Người thực hiện</th>
              <th className="p-3 border">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500 italic">
                  Không có kết quả phù hợp.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.maPhieuXN} className="border-t hover:bg-gray-50">
                  <td className="p-3 border">
                    {item.ngayThucHien
                      ? new Date(item.ngayThucHien).toLocaleDateString("vi-VN")
                      : "-"}
                  </td>
                  <td className="p-3 border">{item.XetNghiem?.tenXN}</td>
                  <td className="p-3 border">{item.XetNghiem?.maLoaiXN}</td>
                  <td className="p-3 border">{item.ketQua || "Chưa có"}</td>
                  <td className="p-3 border">{item.NhanSuYTe?.hoTen || "N/A"}</td>
                  <td className="p-3 border">{item.ghiChu || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KetQuaXetNghiemPage;
