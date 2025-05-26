import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const PatientLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white flex flex-col justify-between shadow-lg">
        <div className="p-4 space-y-6">
          <h2 className="text-xl font-bold">👤 Bệnh nhân</h2>

          {/* Lịch hẹn */}
          <div>
            <div className="text-sm font-semibold text-green-200 uppercase mb-1">Lịch khám</div>
            <nav className="space-y-1">
              <a href="/patient/lich" className="block p-2 rounded hover:bg-green-700">📅 Lịch hẹn khám</a>
            </nav>
          </div>

          {/* Hồ sơ & Xét nghiệm */}
          <div>
            <div className="text-sm font-semibold text-green-200 uppercase mb-1">Hồ sơ bệnh án</div>
            <nav className="space-y-1">
              <a href="/patient/hoso" className="block p-2 rounded hover:bg-green-700">📋 Hồ sơ bệnh án</a>
              <a href="/patient/xetnghiem" className="block p-2 rounded hover:bg-green-700">🧪 Kết quả xét nghiệm</a>
            </nav>
          </div>

          {/* Thanh toán */}
          <div>
            <div className="text-sm font-semibold text-green-200 uppercase mb-1">Thanh toán</div>
            <nav className="space-y-1">
              <a href="/patient/hoadon" className="block p-2 rounded hover:bg-green-700">💳 Giỏ hàng & Hóa đơn</a>
            </nav>
          </div>

          {/* Tài khoản */}
          <div>
            <div className="text-sm font-semibold text-green-200 uppercase mb-1">Tài khoản</div>
            <nav className="space-y-1">
              <a href="/patient/taikhoan" className="block p-2 rounded hover:bg-green-700">👤 Thông tin cá nhân</a>
            </nav>
          </div>
        </div>

        {/* Nút đăng xuất */}
        <div className="p-4 border-t border-green-800">
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Trang Bệnh Nhân</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout;
