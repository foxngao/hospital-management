import React from "react";
import { Outlet } from "react-router-dom";

function DoctorLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-blue-800 text-white p-4">Doctor Sidebar</aside>
      <main className="flex-1 p-6 bg-blue-50">
        <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>
        <Outlet />
      </main>
    </div>
  );
}

export default DoctorLayout;
