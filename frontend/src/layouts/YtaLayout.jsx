  import React from "react";
  import { Outlet } from "react-router-dom";
  import { useAuth } from "../auth/AuthContext";

  const YtaLayout = () => {
    const { logout } = useAuth();

    return (
      <div className="flex h-screen">
        <aside className="w-64 bg-green-700 text-white p-4 space-y-2 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-4">👩‍⚕️ Điều dưỡng / Y tá</h2>
            <a href="/yta/benhnhan/dangky" className="block hover:bg-green-600 p-2 rounded">👥 Bệnh nhân đăng ký</a>
            <a href="/yta/benhnhan/ghinhantinhtrang" className="block hover:bg-green-600 p-2 rounded">🩺 Ghi nhận tình trạng</a>
            <a href="/yta/lichlamviec" className="block hover:bg-green-600 p-2 rounded">📅 Lịch bác sĩ</a>
          </div>
          <button onClick={logout} className="mt-4 bg-red-600 hover:bg-red-700 p-2 rounded text-left">🔓 Đăng xuất</button>
        </aside>
        <main className="flex-1 bg-gray-100 overflow-y-auto"><Outlet /></main>
      </div>
    );
  };

  export default YtaLayout;
//LoaiNS: YT