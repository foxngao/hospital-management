import React, { useEffect, useState } from "react";
import { getHoSoByBenhNhan } from "../../../services/hoso_BN/hsbaService";

const HoSoBenhAnPage = () => {
  const [list, setList] = useState([]);
  const maBN = localStorage.getItem("maTK"); // mã bệnh nhân lấy từ token

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getHoSoByBenhNhan(maBN);
      setList(res.data.data || []);
    } catch (err) {
      console.error("❌ Lỗi khi gọi API hồ sơ:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-blue-700 mb-4">📋 Hồ sơ bệnh án của tôi</h2>

      <table className="min-w-full text-sm bg-white shadow rounded">
        <thead>
          <tr>
            <th>Mã HSBA</th>
            <th>Đợt khám bệnh</th>
            <th>Lịch sử bệnh</th>
            <th>Ghi chú</th>
            <th>Ngày lập</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.maHSBA} className="border-t">
              <td>{item.maHSBA}</td>
              <td>{item.dotKhamBenh}</td>
              <td>{item.lichSuBenh}</td>
              <td>{item.ghiChu}</td>
              <td>{item.ngayLap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HoSoBenhAnPage;
