import React, { useEffect, useState } from "react";
import { getAllKetQua } from "../../../services/xetnghiem_BN/ketquaxetnghiemService";

const KetQuaXetNghiemPage = () => {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [ngayFilter, setNgayFilter] = useState("");
  const maBN = localStorage.getItem("maTK");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getAllKetQua();
    const all = res.data.data || [];
    const own = all.filter(item => item.YeuCau?.maBN === maBN);
    setList(own);
    setFiltered(own);
  };

  const handleFilter = () => {
    let result = list;
    if (ngayFilter) {
      result = result.filter(item => item.ngayThucHien === ngayFilter);
    }
    setFiltered(result);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-blue-700">🧪 Kết quả xét nghiệm của bạn</h2>

      <div className="bg-white p-4 rounded shadow flex flex-wrap gap-4 items-center">
        <input
          type="date"
          value={ngayFilter}
          onChange={(e) => setNgayFilter(e.target.value)}
          className="input"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Lọc theo ngày
        </button>
      </div>

      <table className="min-w-full text-sm bg-white shadow rounded">
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Tên XN</th>
            <th>Loại XN</th>
            <th>Kết quả</th>
            <th>Bác sĩ</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.maPhieuXN} className="border-t">
              <td>{item.ngayThucHien}</td>
              <td>{item.XetNghiem?.tenXN}</td>
              <td>{item.XetNghiem?.loaiXN}</td>
              <td>{item.ketQua}</td>
              <td>{item.NhanSuYTe?.hoTen}</td>
              <td>{item.ghiChu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KetQuaXetNghiemPage;
