import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const XetNghiemLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-indigo-700 text-white p-4 space-y-2 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-4">🧪 Nhân viên xét nghiệm</h2>
          <a href="/xetnghiem/xetnghiem/yeucau" className="block hover:bg-indigo-600 p-2 rounded">📩 Yêu cầu xét nghiệm</a>
          <a href="/xetnghiem/xetnghiem/phieu" className="block hover:bg-indigo-600 p-2 rounded">📄 Phiếu xét nghiệm</a>
          {/* <a href="/xetnghiem/lichsu" className="block hover:bg-indigo-600 p-2 rounded">📊 Lịch sử kết quả</a> */}
        </div>
        <button onClick={logout} className="mt-4 bg-red-600 hover:bg-red-700 p-2 rounded text-left">🔓 Đăng xuất</button>
      </aside>
      <main className="flex-1 bg-gray-100 overflow-y-auto"><Outlet /></main>
    </div>
  );
};

export default XetNghiemLayout;
//LoaiNS: XN
//--------------------------------------------------------------------------------