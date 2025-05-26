import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const YtaLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col justify-between shadow-lg">
        <div className="p-4 space-y-6">
          <h2 className="text-xl font-bold">👩‍⚕️ Điều dưỡng / Y tá</h2>

          {/* Bệnh nhân */}
          <div>
            <div className="text-sm font-semibold text-green-200 uppercase mb-1">Bệnh nhân</div>
            <nav className="space-y-1">
              <a href="/yta/benhnhan/dangky" className="block p-2 rounded hover:bg-green-600">
                👥 Bệnh nhân đăng ký
              </a>
              <a href="/yta/benhnhan/ghinhantinhtrang" className="block p-2 rounded hover:bg-green-600">
                🩺 Ghi nhận tình trạng
              </a>
            </nav>
          </div>

          {/* Lịch bác sĩ */}
          <div>
            <div className="text-sm font-semibold text-green-200 uppercase mb-1">Lịch bác sĩ</div>
            <nav className="space-y-1">
              <a href="/yta/lichlamviec" className="block p-2 rounded hover:bg-green-600">
                📅 Lịch bác sĩ cùng ca
              </a>
            </nav>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-green-600">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 p-2 rounded text-left font-semibold"
          >
            🔓 Đăng xuất
          </button>
        </div>
      </aside>

      {/* Nội dung */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Trang Điều dưỡng / Y tá</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default YtaLayout;
// LoaiNS: YT
