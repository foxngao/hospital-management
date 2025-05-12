import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const DoctorLayout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-blue-800 text-white p-4 space-y-2 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-4">🔹 Bác sĩ</h2>
          <a href="/doctor/xetnghiem" className="block hover:bg-blue-700 p-2 rounded" > 🧪 Yêu cầu xét nghiệm </a>
          <a href="/doctor/xetnghiem/phieu" className="block hover:bg-blue-700 p-2 rounded"> 📄 Phiếu xét nghiệm </a>
          <a href="/doctor/lich" className="block hover:bg-blue-700 p-2 rounded"> 📅 Lịch làm việc </a>
          <a href="/doctor/kham" className="block hover:bg-blue-700 p-2 rounded">📋 Phiếu khám bệnh</a>
          <a href="/doctor/kham/donthuoc" className="block hover:bg-blue-700 p-2 rounded">💊 Kê đơn thuốc</a>
          <a href="/doctor/lichhen" className="block hover:bg-blue-700 p-2 rounded">🗓️ Lịch hẹn khám bệnh</a>

        </div>

        <button
          onClick={handleLogout}
          className="mt-4 w-full text-left bg-red-600 hover:bg-red-700 p-2 rounded"
        >
          🔓 Đăng xuất
        </button>
      </aside>

      <main className="flex-1 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;
