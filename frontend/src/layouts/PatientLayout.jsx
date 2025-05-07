import React from "react";
import { Outlet } from "react-router-dom";

function PatientLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-green-800 text-white p-4">Patient Sidebar</aside>
      <main className="flex-1 p-6 bg-green-50">
        <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>
        <Outlet />
      </main>
    </div>
  );
}

export default PatientLayout;