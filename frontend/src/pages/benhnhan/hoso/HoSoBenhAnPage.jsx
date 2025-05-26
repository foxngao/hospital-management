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
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">📋 Hồ sơ bệnh án của tôi</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-100 text-blue-800 text-left">
              <th className="px-4 py-2">Mã HSBA</th>
              <th className="px-4 py-2">Đợt khám bệnh</th>
              <th className="px-4 py-2">Lịch sử bệnh</th>
              <th className="px-4 py-2">Ghi chú</th>
              <th className="px-4 py-2">Ngày lập</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center px-4 py-6 text-gray-500 italic">
                  Không có hồ sơ bệnh án nào.
                </td>
              </tr>
            ) : (
              list.map((item) => (
                <tr key={item.maHSBA} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{item.maHSBA}</td>
                  <td className="px-4 py-2">{item.dotKhamBenh}</td>
                  <td className="px-4 py-2">{item.lichSuBenh}</td>
                  <td className="px-4 py-2">{item.ghiChu}</td>
                  <td className="px-4 py-2">{item.ngayLap}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HoSoBenhAnPage;
