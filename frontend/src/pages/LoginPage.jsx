import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axiosClient";
import toast from "react-hot-toast";

function LoginPage() {
  const [form, setForm] = useState({ tenDangNhap: "", matKhau: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await axios.post("/auth/login", form);


      if (res.data && res.data.token && res.data.user) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("maTK", user.maTK);
        localStorage.setItem("role", user.maNhom);
        localStorage.setItem("loaiNS", user.loaiNS || "");

        if (user.maNhom === "BENHNHAN") {
          localStorage.setItem("maBN", user.maBN);
        }

        if (user.maNhom === "BACSI") {
          localStorage.setItem("maBS", user.maBS);
        }

        toast.success("Đăng nhập thành công!");

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md border border-blue-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Đăng nhập bệnh viện
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={form.tenDangNhap}
            onChange={(e) => setForm({ ...form, tenDangNhap: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Nhập mật khẩu + nút hiển thị */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={form.matKhau}
              onChange={(e) => setForm({ ...form, matKhau: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-600"
              tabIndex={-1}
            >
              {showPassword ? (
                // 👁 Mắt mở
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                // 👁 Mắt đóng
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.957 9.957 0 012.742-4.362m3.382-2.22A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.628 5.568M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-500 hover:underline font-medium">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
