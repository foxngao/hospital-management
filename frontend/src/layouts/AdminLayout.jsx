import React from "react";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-2">
        <h2 className="text-xl font-bold mb-4">Admin Menu</h2>
        <a href="/admin/assistants" className="block hover:bg-gray-700 p-2 rounded">
          👥 Quản lý Trợ lý
        </a>
        {/* thêm thêm các mục khác nếu cần */}
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
