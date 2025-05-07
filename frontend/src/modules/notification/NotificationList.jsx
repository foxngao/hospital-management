import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const params = {};
      if (filter === "read") params.daDoc = true;
      if (filter === "unread") params.daDoc = false;

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/notification`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setNotifications(res.data);
    } catch (err) {
      toast.error("Không thể tải thông báo");
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/notification/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotifications();
    } catch (err) {
      toast.error("Không thể đánh dấu là đã đọc");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Thông báo của bạn</h2>

      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">Tất cả</option>
          <option value="unread">Chưa đọc</option>
          <option value="read">Đã đọc</option>
        </select>
      </div>

      <ul className="space-y-3">
        {notifications.map((tb) => (
          <li key={tb.maTB} className="border p-4 rounded shadow bg-white">
            <div className="flex justify-between">
              <div>
                <strong>{tb.tieuDe}</strong>
                <div>{tb.noiDung}</div>
                <div className="text-sm text-gray-500">
                  {new Date(tb.thoiGian).toLocaleString()}
                </div>
              </div>
              {!tb.daDoc && (
                <button
                  onClick={() => markAsRead(tb.maTB)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Đánh dấu đã đọc
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationList;
