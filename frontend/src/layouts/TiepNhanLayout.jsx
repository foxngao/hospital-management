import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const TiepNhanLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-yellow-700 text-white flex flex-col justify-between shadow-lg">
        <div className="p-4 space-y-6">
          <h2 className="text-xl font-bold">🛎️ Tiếp nhận</h2>

          {/* Lịch khám */}
          <div>
            <div className="text-sm font-semibold text-yellow-200 uppercase mb-1">Khám & Lịch hẹn</div>
            <nav className="space-y-1">
              <a href="/tiepnhan/lichkham" className="block p-2 rounded hover:bg-yellow-600">📝 Đăng ký khám</a>
              <a href="/tiepnhan/lichhen" className="block p-2 rounded hover:bg-yellow-600">📆 Quản lý lịch hẹn</a>
            </nav>
          </div>

          {/* Hồ sơ */}
          <div>
            <div className="text-sm font-semibold text-yellow-200 uppercase mb-1">Hồ sơ</div>
            <nav className="space-y-1">
              <a href="/tiepnhan/hsba" className="block p-2 rounded hover:bg-yellow-600">📋 Hồ sơ tiếp nhận</a>
            </nav>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-yellow-600">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 p-2 rounded text-left font-semibold"
          >
            🔓 Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Trang Tiếp nhận</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default TiepNhanLayout;
