import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import {
  getAllLichLamViec,
  deleteLichLamViec,
  updateLichLamViec,
} from "../../../services/lichlamviec_AD/lichlamviecService";

dayjs.extend(isoWeek);

const ThongKeLichLamViecPage = () => {
  const [lichList, setLichList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [filteredList, setFilteredList] = useState([]);
  const [thongKe, setThongKe] = useState({ bacSi: 0, nhanSu: 0 });

  const [editItem, setEditItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterByWeek();
  }, [selectedDate, lichList]);

  const fetchData = async () => {
    try {
      const res = await getAllLichLamViec();
      setLichList(res.data.data || []);
    } catch {
      toast.error("Lỗi khi tải lịch làm việc");
    }
  };

  const filterByWeek = () => {
    const startOfWeek = dayjs(selectedDate).startOf("isoWeek");
    const endOfWeek = dayjs(selectedDate).endOf("isoWeek");

    const filtered = lichList.filter((item) => {
      const ngay = dayjs(item.ngayLamViec);
      return ngay.isAfter(startOfWeek.subtract(1, "day")) && ngay.isBefore(endOfWeek.add(1, "day"));
    });

    setFilteredList(filtered);

    const maBSSet = new Set(filtered.map((i) => i.maBS).filter(Boolean));
    const maNSSet = new Set(filtered.map((i) => i.maNS).filter(Boolean));
    setThongKe({ bacSi: maBSSet.size, nhanSu: maNSSet.size });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xoá lịch này?")) return;
    try {
      await deleteLichLamViec(id);
      toast.success("Đã xoá");
      fetchData();
    } catch {
      toast.error("Xoá thất bại");
    }
  };

  const handleUpdate = async () => {
    try {
      const data = {
        maCa: editItem.maCa,
        ngayLamViec: editItem.ngayLamViec,
      };
      await updateLichLamViec(editItem.maLichLV, data);
      toast.success("Cập nhật thành công");
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      toast.error("Cập nhật thất bại");
    }
  };

  const weekDays = [...Array(7)].map((_, i) =>
    dayjs(selectedDate).startOf("isoWeek").add(i, "day")
  );

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-blue-700">📊 Thống kê lịch làm việc theo tuần</h2>

      <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row items-center gap-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <div className="text-gray-700 font-medium">
          Tuần: {dayjs(selectedDate).startOf("isoWeek").format("DD/MM")} -{" "}
          {dayjs(selectedDate).endOf("isoWeek").format("DD/MM")}
        </div>
      </div>

      <div className="bg-white rounded shadow p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">
          📆 Thống kê tuần ({weekDays[0].format("DD/MM")} - {weekDays[6].format("DD/MM")})
        </h3>
        <p>👨‍⚕️ Số bác sĩ làm việc: <span className="font-bold text-blue-700">{thongKe.bacSi}</span></p>
        <p>🧑‍⚕️ Số nhân sự y tế: <span className="font-bold text-green-700">{thongKe.nhanSu}</span></p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              {weekDays.map((day, i) => (
                <th key={i} className="px-4 py-2 whitespace-nowrap text-center">
                  {day.format("ddd DD/MM")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {weekDays.map((day, i) => {
                const items = filteredList.filter(
                  (item) =>
                    dayjs(item.ngayLamViec).format("YYYY-MM-DD") === day.format("YYYY-MM-DD")
                );

                return (
                  <td key={i} className="border px-4 py-2 align-top space-y-2">
                    {items.length === 0 ? (
                      <p className="text-gray-400 italic text-center">Không có lịch</p>
                    ) : (
                      items.map((item) => (
                        <div
                          key={item.maLichLV}
                          className="p-3 border rounded-lg bg-white shadow-sm hover:shadow-md transition-all space-y-1"
                        >
                          <p className="text-blue-700 font-semibold">
                            {item.maBS ? "👨‍⚕️ Bác sĩ" : "🧑‍⚕️ Nhân sự y tế"}
                          </p>
                          <p>
                            <span className="font-medium">Mã:</span> {item.maBS || item.maNS}
                          </p>
                          <p>
                            <span className="font-medium">Ca trực:</span> {item.maCa}
                          </p>
                          <p>
                            <span className="font-medium">Ngày:</span>{" "}
                            {dayjs(item.ngayLamViec).format("DD/MM/YYYY")}
                          </p>
                          <div className="flex justify-end gap-2 pt-1 border-t mt-2">
                            <button
                              className="text-blue-600 hover:underline text-xs"
                              onClick={() => {
                                setEditItem(item);
                                setIsModalOpen(true);
                              }}
                            >
                              📝 Sửa
                            </button>
                            <button
                              onClick={() => handleDelete(item.maLichLV)}
                              className="text-red-600 hover:underline text-xs"
                            >
                              🗑️ Xoá
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* FORM SỬA */}
      {isModalOpen && editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-blue-700">🛠 Sửa lịch làm việc</h2>

            <label className="block text-sm font-medium">Ngày làm việc</label>
            <input
              type="date"
              value={dayjs(editItem.ngayLamViec).format("YYYY-MM-DD")}
              onChange={(e) =>
                setEditItem({ ...editItem, ngayLamViec: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />

            <label className="block text-sm font-medium">Ca trực</label>
            <input
              type="text"
              value={editItem.maCa}
              onChange={(e) => setEditItem({ ...editItem, maCa: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                ❌ Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleUpdate}
              >
                💾 Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThongKeLichLamViecPage;
