import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function AdminLayout() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-2 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Admin Menu</h2>

          {/* Tài khoản & phân quyền */}
          <a href="/admin/taikhoan" className="block hover:bg-gray-700 p-2 rounded">📋 Danh sách tài khoản</a>
          <a href="/admin/taikhoan/tao-moi" className="block hover:bg-gray-700 p-2 rounded">👤 Tạo tài khoản</a>
          <a href="/admin/taikhoan/phan-quyen" className="block hover:bg-gray-700 p-2 rounded">🛡️ Phân quyền người dùng</a>

          {/* Nhân sự */}
          <a href="/admin/nhansu/troly" className="block hover:bg-gray-700 p-2 rounded">👥 Quản lý trợ lý bác sĩ</a>
          <a href="/admin/nhansu" className="block hover:bg-gray-700 p-2 rounded">🧑‍🔬 Quản lý nhân viên y tế</a>
          <a href="/admin/bacsi" className="block hover:bg-gray-700 p-2 rounded">🧑‍⚕️ Quản lý bác sĩ</a>

          {/* Quản lý chuyên môn */}
          <a href="/admin/khoa" className="block hover:bg-gray-700 p-2 rounded">🏥 Quản lý khoa</a>
          <a href="/admin/lichkham" className="block hover:bg-gray-700 p-2 rounded">📅 Quản lý lịch khám</a>
          <a href="/admin/xetnghiem" className="block hover:bg-gray-700 p-2 rounded">🧪 Quản lý xét nghiệm</a>
          <a href="/admin/loaixetnghiem" className="block hover:bg-gray-700 p-2 rounded">📄 Quản lý loại xét nghiệm</a>

          {/* Bệnh nhân */}
          <a href="/admin/benhnhan" className="block hover:bg-gray-700 p-2 rounded">🧑‍🦽 Quản lý bệnh nhân</a>
          <a href="/admin/hosobenhan" className="block hover:bg-gray-700 p-2 rounded">📋 Hồ sơ bệnh án</a>

          {/* Thuốc */}
          <a href="/admin/thuoc" className="block hover:bg-gray-700 p-2 rounded">💊 Quản lý thuốc</a>
          <a href="/admin/nhomthuoc" className="block hover:bg-gray-700 p-2 rounded">📦 Quản lý nhóm thuốc</a>
          <a href="/admin/donvitinh" className="block hover:bg-gray-700 p-2 rounded">📐 Quản lý đơn vị tính</a>

          {/* Hóa đơn */}
          <a href="/admin/hoadon" className="block hover:bg-gray-700 p-2 rounded">🧾 Quản lý hoá đơn</a>
          
          <a href="/admin/nhansu/catruc" className="block hover:bg-gray-700 p-2 rounded">🕐 Quản lý ca trực</a>

        </div>

        {/* Nút đăng xuất */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full text-left bg-red-600 hover:bg-red-700 p-2 rounded"
        >
          🔓 Đăng xuất
        </button>
      </aside>

      {/* Nội dung */}
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
