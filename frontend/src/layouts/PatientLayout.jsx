import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const PatientLayout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-green-800 text-white p-4 space-y-2 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-4">👤 Bệnh nhân</h2>

          <a href="/patient/lich" className="block hover:bg-green-700 p-2 rounded">📅 Lịch hẹn khám</a>

          <a href="/patient/xetnghiem/ketqua" className="block hover:bg-green-700 p-2 rounded">🧪 Kết quả xét nghiệm</a>
          <a href="/patient/hoso" className="block hover:bg-green-700 p-2 rounded">📋 Hồ sơ bệnh án</a>
          <a href="/patient/giohang" className="block hover:bg-green-700 p-2 rounded">💳 Giỏ hàng & Thanh toán</a>
          <a href="/patient/taikhoan" className="block hover:bg-green-700 p-2 rounded">👤 Tài khoản cá nhân</a>
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

export default PatientLayout;
