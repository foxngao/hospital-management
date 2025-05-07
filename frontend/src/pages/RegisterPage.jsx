import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function RegisterPage() {
  const [form, setForm] = useState({
  tenDangNhap: "",   //  đúng tên backend yêu cầu
  email: "",
  matKhau: "",       //  đúng tên backend yêu cầu
  maNhom: "BENHNHAN",//  đúng tên backend yêu cầu
  trangThai: true
});


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, form);
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      toast.error("Đăng ký thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-600">Đăng ký tài khoản</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={form.tenDangNhap}
            onChange={(e) => setForm({ ...form, tenDangNhap: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            value={form.matKhau}
            onChange={(e) => setForm({ ...form, matKhau: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />

          <select
            value={form.maNhom}
            onChange={(e) => setForm({ ...form, maNhom: e.target.value })}
            className="w-full border p-2 rounded"
          >
            <option value="BENHNHAN">Bệnh nhân</option>
            <option value="BACSI">Bác sĩ</option>           
            <option value="ADMIN">Quản trị viên</option>
          </select>

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Đăng ký
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Quay lại đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
