import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosClient";

const LichLamViecBacSiPage = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("/lichlamviec").then((res) => {
      setList(res.data.data || []);
    });
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">📅 Lịch làm việc của bác sĩ</h2>

      <table className="min-w-full text-sm bg-white shadow rounded">
        <thead>
          <tr>
            <th>Mã lịch</th>
            <th>Mã bác sĩ</th>
            <th>Mã ca</th>
            <th>Ngày làm việc</th>
          </tr>
        </thead>
        <tbody>
          {list.map((row) => (
            <tr key={row.maLichLV} className="border-t">
              <td>{row.maLichLV}</td>
              <td>{row.maNS}</td>
              <td>{row.maCa}</td>
              <td>{row.ngayLamViec}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LichLamViecBacSiPage;
