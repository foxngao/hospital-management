import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const XetNghiemLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white flex flex-col justify-between shadow-lg">
        <div className="p-4 space-y-6">
          <h2 className="text-xl font-bold">🧪 Xét nghiệm</h2>

          {/* Chức năng xét nghiệm */}
          <div>
            <div className="text-sm font-semibold text-indigo-200 uppercase mb-1">Quản lý xét nghiệm</div>
            <nav className="space-y-1">
              <a href="/xetnghiem/xetnghiem/yeucau" className="block p-2 rounded hover:bg-indigo-600">
                📩 Yêu cầu xét nghiệm
              </a>
              <a href="/xetnghiem/xetnghiem/phieu" className="block p-2 rounded hover:bg-indigo-600">
                📄 Phiếu xét nghiệm
              </a>
              {/* Mở nếu bạn cần thêm:
              <a href="/xetnghiem/lichsu" className="block p-2 rounded hover:bg-indigo-600">
                📊 Lịch sử kết quả
              </a> */}
            </nav>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-indigo-600">
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Trang Xét nghiệm</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default XetNghiemLayout;
// LoaiNS: XN
