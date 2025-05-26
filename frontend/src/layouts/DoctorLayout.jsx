import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const DoctorLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col justify-between shadow-lg">
        <div className="p-4 space-y-6">
          <h2 className="text-xl font-bold">👨‍⚕️ Bác sĩ</h2>

          {/* Lịch & Hẹn */}
          <div>
            <div className="text-sm font-semibold text-blue-200 uppercase mb-1">Lịch làm việc</div>
            <nav className="space-y-1">
              <a href="/doctor/lich" className="block p-2 rounded hover:bg-blue-700">📅 Lịch làm việc</a>
              <a href="/doctor/lichhen" className="block p-2 rounded hover:bg-blue-700">🗓️ Lịch hẹn bệnh nhân</a>
            </nav>
          </div>

          {/* Khám bệnh */}
          <div>
            <div className="text-sm font-semibold text-blue-200 uppercase mb-1">Khám & điều trị</div>
            <nav className="space-y-1">
              <a href="/doctor/kham" className="block p-2 rounded hover:bg-blue-700">📋 Phiếu khám bệnh</a>
              <a href="/doctor/kham/donthuoc" className="block p-2 rounded hover:bg-blue-700">💊 Kê đơn thuốc</a>
            </nav>
          </div>

          {/* Xét nghiệm */}
          <div>
            <div className="text-sm font-semibold text-blue-200 uppercase mb-1">Xét nghiệm</div>
            <nav className="space-y-1">
              <a href="/doctor/xetnghiem" className="block p-2 rounded hover:bg-blue-700">🧪 Yêu cầu xét nghiệm</a>
              <a href="/doctor/xetnghiem/phieu" className="block p-2 rounded hover:bg-blue-700">📄 Phiếu xét nghiệm</a>
            </nav>
          </div>
        </div>

        {/* Đăng xuất */}
        <div className="p-4 border-t border-blue-800">
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Trang Bác sĩ</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;
