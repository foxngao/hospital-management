import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function AdminLayout() {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-100 to-blue-50 transition-all duration-500">
      {/* Nút mở menu trên mobile */}
      <div className="flex md:hidden justify-between items-center px-4 py-3 bg-gray-900 text-white shadow-md">
        <h2 className="text-xl font-bold">🛠️ Admin</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Sidebar trái */}
      <aside
        className={`bg-gray-900 text-white w-64 transform md:translate-x-0 transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static absolute z-50 h-full shadow-xl md:flex md:flex-col`}
      >
        <div className="p-4 space-y-6 overflow-y-auto flex-1">
          <h2 className="text-2xl font-bold text-white hidden md:block">🛠️ Admin Menu</h2>

          {/** Khối menu */}
          {renderMenuBlock("Tài khoản & phân quyền", [
            ["📋 Danh sách tài khoản", "/admin/taikhoan"],
            ["👤 Tạo tài khoản", "/admin/taikhoan/tao-moi"],
            ["🛡️ Phân quyền", "/admin/taikhoan/phan-quyen"],
          ])}

          {renderMenuBlock("Nhân sự", [
            ["👥 Trợ lý bác sĩ", "/admin/nhansu/troly"],
            ["🧑‍🔬 Nhân viên y tế", "/admin/nhansu"],
            ["🧑‍⚕️ Bác sĩ", "/admin/bacsi"],
            ["🕐 Quản lý ca trực", "/admin/nhansu/catruc"],
          ])}

          {renderMenuBlock("Chuyên môn", [
            ["🏥 Quản lý khoa", "/admin/khoa"],
            ["📅 Lịch khám", "/admin/lichkham"],
            ["🧪 Xét nghiệm", "/admin/xetnghiem"],
            ["📄 Loại xét nghiệm", "/admin/loaixetnghiem"],
          ])}

          {renderMenuBlock("Bệnh nhân", [
            ["🧑‍🦽 Quản lý bệnh nhân", "/admin/benhnhan"],
            ["📋 Hồ sơ bệnh án", "/admin/hosobenhan"],
          ])}

          {renderMenuBlock("Thuốc & đơn vị", [
            ["💊 Quản lý thuốc", "/admin/thuoc"],
            ["📦 Nhóm thuốc", "/admin/nhomthuoc"],
            ["📐 Đơn vị tính", "/admin/donvitinh"],
          ])}

          {renderMenuBlock("Hóa đơn & Thống kê", [
            ["📊 Thống kê hóa đơn", "/admin/thongke"],
            ["📈 Lịch làm việc", "/admin/thongke/lichlamviec"],
            ["📅 Lịch khám", "/admin/thongke/lickham"],
          ])}
        </div>

        {/* Nút đăng xuất */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 p-2 rounded-lg text-left font-semibold transition duration-200"
          >
            🔓 Đăng xuất
          </button>
        </div>
      </aside>

      {/* Nội dung chính */}
      <main className="flex-1 p-6 overflow-y-auto transition-all">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-6 drop-shadow">
          🎯 Admin Dashboard
        </h1>
        <Outlet />
      </main>
    </div>
  );
}

function renderMenuBlock(title, items) {
  return (
    <div>
      <div className="text-sm font-bold text-blue-300 uppercase mb-2 tracking-widest">
        {title}
      </div>
      <nav className="space-y-1">
        {items.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="block px-3 py-2 rounded-lg hover:bg-blue-600 hover:translate-x-1 transform transition-all duration-200 bg-opacity-20 hover:bg-opacity-30"
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default AdminLayout;
