import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function AdminLayout() {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Nút mở menu trên mobile */}
      <div className="flex md:hidden justify-between items-center p-4 bg-gray-900 text-white">
        <h2 className="text-xl font-bold">🛠️ Admin</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 flex-shrink-0 shadow-lg transform transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:flex md:flex-col md:static absolute z-50 h-full`}
      >
        <div className="p-4 space-y-6 overflow-y-auto flex-1">
          <h2 className="text-xl font-bold hidden md:block">🛠️ Admin Menu</h2>

          {/* Tài khoản */}
          <div>
            <div className="text-sm font-semibold text-gray-400 uppercase mb-1">Tài khoản & phân quyền</div>
            <nav className="space-y-1">
              <a href="/admin/taikhoan" className="block p-2 rounded hover:bg-gray-700">📋 Danh sách tài khoản</a>
              <a href="/admin/taikhoan/tao-moi" className="block p-2 rounded hover:bg-gray-700">👤 Tạo tài khoản</a>
              <a href="/admin/taikhoan/phan-quyen" className="block p-2 rounded hover:bg-gray-700">🛡️ Phân quyền</a>
            </nav>
          </div>

          {/* Nhân sự */}
          <div>
            <div className="text-sm font-semibold text-gray-400 uppercase mb-1">Nhân sự</div>
            <nav className="space-y-1">
              <a href="/admin/nhansu/troly" className="block p-2 rounded hover:bg-gray-700">👥 Trợ lý bác sĩ</a>
              <a href="/admin/nhansu" className="block p-2 rounded hover:bg-gray-700">🧑‍🔬 Nhân viên y tế</a>
              <a href="/admin/bacsi" className="block p-2 rounded hover:bg-gray-700">🧑‍⚕️ Bác sĩ</a>
              <a href="/admin/nhansu/catruc" className="block p-2 rounded hover:bg-gray-700">🕐 Quản lý ca trực</a>
            </nav>
          </div>

          {/* Chuyên môn */}
          <div>
            <div className="text-sm font-semibold text-gray-400 uppercase mb-1">Chuyên môn</div>
            <nav className="space-y-1">
              <a href="/admin/khoa" className="block p-2 rounded hover:bg-gray-700">🏥 Quản lý khoa</a>
              <a href="/admin/lichkham" className="block p-2 rounded hover:bg-gray-700">📅 Lịch khám</a>
              <a href="/admin/xetnghiem" className="block p-2 rounded hover:bg-gray-700">🧪 Xét nghiệm</a>
              <a href="/admin/loaixetnghiem" className="block p-2 rounded hover:bg-gray-700">📄 Loại xét nghiệm</a>
            </nav>
          </div>

          {/* Bệnh nhân */}
          <div>
            <div className="text-sm font-semibold text-gray-400 uppercase mb-1">Bệnh nhân</div>
            <nav className="space-y-1">
              <a href="/admin/benhnhan" className="block p-2 rounded hover:bg-gray-700">🧑‍🦽 Quản lý bệnh nhân</a>
              <a href="/admin/hosobenhan" className="block p-2 rounded hover:bg-gray-700">📋 Hồ sơ bệnh án</a>
            </nav>
          </div>

          {/* Thuốc */}
          <div>
            <div className="text-sm font-semibold text-gray-400 uppercase mb-1">Thuốc & đơn vị</div>
            <nav className="space-y-1">
              <a href="/admin/thuoc" className="block p-2 rounded hover:bg-gray-700">💊 Quản lý thuốc</a>
              <a href="/admin/nhomthuoc" className="block p-2 rounded hover:bg-gray-700">📦 Nhóm thuốc</a>
              <a href="/admin/donvitinh" className="block p-2 rounded hover:bg-gray-700">📐 Đơn vị tính</a>
            </nav>
          </div>

          {/* Hóa đơn & Thống kê */}
          <div>
            <div className="text-sm font-semibold text-gray-400 uppercase mb-1">Hóa đơn & Thống kê</div>
            <nav className="space-y-1">
              <a href="/admin/thongke" className="block p-2 rounded hover:bg-gray-700">📊 Thống kê hóa đơn</a>
              <a href="/admin/thongke/lichlamviec" className="block p-2 rounded hover:bg-gray-700">📈 Lịch làm việc</a>
              <a href="/admin/thongke/lickham" className="block p-2 rounded hover:bg-gray-700">📅 Lịch khám</a>
            </nav>
          </div>
        </div>

        {/* Nút đăng xuất */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 p-2 rounded text-left font-semibold"
          >
            🔓 Đăng xuất
          </button>
        </div>
      </aside>

      {/* Nội dung */}
      <main className="flex-1 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
