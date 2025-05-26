import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function LoginPage() {
  const [form, setForm] = useState({ tenDangNhap: "", matKhau: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, form);

      if (res.data && res.data.token && res.data.user) {
        const { token, user } = res.data;

        // ✅ Lưu token và thông tin tài khoản
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("maTK", user.maTK);
        localStorage.setItem("role", user.maNhom);
        localStorage.setItem("loaiNS", user.loaiNS || "");

        // ✅ Lưu maBN nếu là bệnh nhân
        if (user.maNhom === "BENHNHAN") {
          localStorage.setItem("maBN", user.maBN);
        }

        // ✅ Lưu maBS nếu là bác sĩ
        if (user.maNhom === "BACSI") {
          localStorage.setItem("maBS", user.maBS); // 🔥 DÒNG QUAN TRỌNG
        }

        toast.success("Đăng nhập thành công!");

        // ✅ Điều hướng chính xác theo vai trò
        switch (user.maNhom) {
          case "ADMIN":
            navigate("/admin");
            break;
          case "BACSI":
            navigate("/doctor");
            break;
          case "BENHNHAN":
            navigate("/patient");
            break;
          case "NHANSU":
            if (user.loaiNS === "YT") navigate("/yta");
            else if (user.loaiNS === "XN") navigate("/xetnghiem");
            else if (user.loaiNS === "TN") navigate("/tiepnhan");
            else navigate("/nhansu");
            break;
          default:
            navigate("/404");
        }
      } else {
        toast.error("Sai tài khoản hoặc mật khẩu!");
      }
    } catch (err) {
      toast.error("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Đăng nhập hệ thống bệnh viện
        </h1>
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
            type="password"
            placeholder="Mật khẩu"
            value={form.matKhau}
            onChange={(e) => setForm({ ...form, matKhau: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
