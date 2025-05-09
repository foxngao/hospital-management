import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";

import AdminLayout from "../layouts/AdminLayout";
import AdminHome from "../pages/AdminHome";
import DoctorHome from "../pages/DoctorHome";
import PatientHome from "../pages/PatientHome";
import DoctorLayout from "../layouts/DoctorLayout";
import PatientLayout from "../layouts/PatientLayout";

import AssistantList from "../modules/assistant/AssistantList"; //  import danh sách trợ lý

import PrivateRoute from "../auth/PrivateRoute"; //  import route bảo vệ
import CreateUserForm from "../pages/admin/CreateUserForm";//  import form tạo tài khoản người dùng
import AdminUserList from "../pages/admin/AdminUserList";//  import danh sách người dùng
import AssignRole from "../pages/admin/AssignRole";//  import phân quyền người dùng
import ManageKhoa from "../pages/admin/ManageKhoa";//  import quản lý khoa
import ManageBacSi from "../pages/admin/ManageBacSi";//  import quản lý bác sĩ




function AppRoutes() {
  return (
    <Routes>
      {/* Trang công khai */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/*  Route cần đăng nhập */}
      <Route path="/admin" element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
          <Route path="taikhoan" element={<AdminUserList />} />
          <Route path="taikhoan/tao-moi" element={<CreateUserForm />} />
          <Route path="taikhoan/sua/:id" element={<CreateUserForm />} />
          <Route path="taikhoan/phan-quyen" element={<AssignRole />} />
          <Route path="khoa" element={<ManageKhoa />} />
          <Route path="bacsi" element={<ManageBacSi />} />
          
          <Route path="assistants" element={<AssistantList />} />
        </Route>
      </Route>

      {/* Các route layout khác  */}
      <Route path="/doctor" element={<PrivateRoute />}>
        <Route element={<DoctorLayout />}>
          <Route index element={<DoctorHome />} />
        </Route>
      </Route>

      <Route path="/patient/*" element={<PatientLayout />}>
           <Route element={<PatientLayout />}>
          <Route index element={<PatientHome />} />
        </Route>
      </Route>


      {/* Điều hướng mặc định và 404 */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
