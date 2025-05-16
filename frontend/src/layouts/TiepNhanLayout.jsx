import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const TiepNhanLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-yellow-700 text-white p-4 space-y-2 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-4">🛎️ Nhân viên tiếp nhận</h2>
          <a href="/tiepnhan/lichkham" className="block hover:bg-yellow-600 p-2 rounded">📝 Đăng ký khám</a>
          <a href="/tiepnhan/lichhen" className="block hover:bg-yellow-600 p-2 rounded">📆 Quản lý lịch hẹn</a>
          <a href="/tiepnhan/hsba" className="block hover:bg-yellow-600 p-2 rounded">📋 Hồ sơ tiếp nhận</a>
        </div>
        <button onClick={logout} className="mt-4 bg-red-600 hover:bg-red-700 p-2 rounded text-left">🔓 Đăng xuất</button>
      </aside>
      <main className="flex-1 bg-gray-100 overflow-y-auto"><Outlet /></main>
    </div>
  );
};

export default TiepNhanLayout;
//LoaiNS: TN
//--------------------------------------------------------------------------------