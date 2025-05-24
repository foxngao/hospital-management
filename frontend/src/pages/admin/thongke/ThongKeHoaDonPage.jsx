import React, { useEffect, useState } from "react";
import { thongKeHoaDon } from "../../../services/hoadon/thongkeService";
import dayjs from "dayjs";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ThongKeHoaDonPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [chon, setChon] = useState("homnay");
  const [data, setData] = useState(null);

  useEffect(() => {
    handleFilter("homnay");
  }, []);

  const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");

  const handleFilter = async (type) => {
    const today = dayjs();
    let start = today;
    let end = today;

    if (type === "homnay") {
      start = end = today;
    } else if (type === "thangnay") {
      start = today.startOf("month");
      end = today.endOf("month");
    } else if (type === "tuychon" && from && to) {
      start = dayjs(from);
      end = dayjs(to);
    }

    const res = await thongKeHoaDon(formatDate(start), formatDate(end));
    setData(res.data.data);
    setChon(type);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">📊 Thống kê hoá đơn</h2>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 shadow rounded">
        <select
          value={chon}
          onChange={(e) => setChon(e.target.value)}
          className="input"
        >
          <option value="homnay">Hôm nay</option>
          <option value="thangnay">Tháng này</option>
          <option value="tuychon">Tùy chọn</option>
        </select>
        {chon === "tuychon" && (
          <>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="input"
            />
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="input"
            />
          </>
        )}
        <button
          onClick={() => handleFilter(chon)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Lọc
        </button>
      </div>

      {/* Kết quả */}
      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 shadow rounded text-lg">
            <div>📦 Tổng số hoá đơn: <strong>{data.tongSo}</strong></div>
            <div>💰 Tổng doanh thu: <strong>{data.tongTien ? data.tongTien.toLocaleString() + "đ" : "0đ"}</strong></div>
            <div>❌ Chưa thanh toán: <strong>{data.chuaThanhToan}</strong></div>
            <div>✅ Đã thanh toán: <strong>{data.daThanhToan}</strong></div>
          </div>

          {/* Biểu đồ tròn */}
          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-lg font-semibold mb-4">📈 Tỷ lệ hóa đơn theo trạng thái</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Đã thanh toán", value: data.daThanhToan },
                    { name: "Chưa thanh toán", value: data.chuaThanhToan },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  <Cell fill="#4ade80" />
                  <Cell fill="#f87171" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default ThongKeHoaDonPage;
