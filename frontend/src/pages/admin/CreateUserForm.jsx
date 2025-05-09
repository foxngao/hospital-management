// 📁 src/pages/admin/CreateUserForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

function CreateUserForm({ onSuccess }) {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [dsKhoa, setDsKhoa] = useState([]);
  const [form, setForm] = useState({
    tenDangNhap: "",
    matKhau: "",
    email: "",
    vaiTro: "",
    maKhoa: "",
    loaiNS: "",
    capBac: "",
    chuyenMon: "",
    hoTen: "",
    trinhDo: "",
    chucVu: "",
    ngaySinh: "",
    gioiTinh: "",
    diaChi: "",
    soDienThoai: "",
    bhyt: ""
  });

  const token = localStorage.getItem("token");

  const fetchKhoa = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/khoa`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDsKhoa(Array.isArray(res.data.data) ? res.data.data : res.data);
    } catch (err) {
      toast.error("Không thể tải danh sách khoa");
    }
  };

  useEffect(() => {
    fetchKhoa();
    if (isEdit) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/tai-khoan/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setForm({
            tenDangNhap: res.data.tenDangNhap,
            matKhau: "",
            email: res.data.email,
            vaiTro: res.data.maNhom,
            maKhoa: res.data.maKhoa || "",
            loaiNS: res.data.loaiNS || "",
            capBac: res.data.capBac || "",
            chuyenMon: res.data.chuyenMon || "",
            hoTen: res.data.hoTen || "",
            trinhDo: res.data.trinhDo || "",
            chucVu: res.data.chucVu || "",
            ngaySinh: res.data.ngaySinh || "",
            gioiTinh: res.data.gioiTinh || "",
            diaChi: res.data.diaChi || "",
            soDienThoai: res.data.soDienThoai || "",
            bhyt: res.data.bhyt || ""
          });
        })
        .catch(() => toast.error("Không tải được thông tin tài khoản"));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      tenDangNhap: form.tenDangNhap,
      email: form.email,
      maNhom: form.vaiTro,
    };
    if (!isEdit) payload.matKhau = form.matKhau;
    if (form.vaiTro === "BACSI" || form.vaiTro === "NHANSU") payload.maKhoa = form.maKhoa;

    if (form.vaiTro === "NHANSU") {
      Object.assign(payload, {
        hoTen: form.hoTen,
        loaiNS: form.loaiNS,
        capBac: form.capBac,
        chuyenMon: form.chuyenMon
      });
    }

    if (form.vaiTro === "BACSI") {
      Object.assign(payload, {
        hoTen: form.hoTen,
        chuyenMon: form.chuyenMon,
        trinhDo: form.trinhDo,
        chucVu: form.chucVu
      });
    }

    if (form.vaiTro === "BENHNHAN") {
      Object.assign(payload, {
        hoTen: form.hoTen,
        ngaySinh: form.ngaySinh,
        gioiTinh: form.gioiTinh,
        diaChi: form.diaChi,
        soDienThoai: form.soDienThoai,
        bhyt: form.bhyt
      });
    }

    try {
      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/tai-khoan/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Cập nhật tài khoản thành công");
        navigate("/admin/taikhoan");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/tai-khoan`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Tạo tài khoản thành công");
        navigate("/admin/taikhoan");
      }
    } catch (err) {
      toast.error("Lỗi: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{isEdit ? "Cập nhật tài khoản" : "Tạo tài khoản"}</h2>

      <input type="text" name="tenDangNhap" value={form.tenDangNhap} onChange={handleChange} placeholder="Tên đăng nhập" className="border p-2 w-full rounded" required disabled={isEdit} />

      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full rounded" required />

      {!isEdit && (
        <input type="password" name="matKhau" value={form.matKhau} onChange={handleChange} placeholder="Mật khẩu" className="border p-2 w-full rounded" required />
      )}

      <select name="vaiTro" value={form.vaiTro} onChange={handleChange} className="border p-2 w-full rounded">
        <option value="ADMIN">Admin</option>
        <option value="BACSI">Bác sĩ</option>
        <option value="NHANSU">Nhân viên y tế</option>
        <option value="BENHNHAN">Bệnh nhân</option>
      </select>

      {(form.vaiTro === "BACSI" || form.vaiTro === "NHANSU") && (
        <select name="maKhoa" value={form.maKhoa} onChange={handleChange} className="border p-2 w-full rounded" required>
          <option value="">-- Chọn khoa --</option>
          {dsKhoa.map((khoa) => (
            <option key={khoa.maKhoa} value={khoa.maKhoa}>
              {khoa.tenKhoa} ({khoa.maKhoa})
            </option>
          ))}
        </select>
      )}

      {form.vaiTro === "NHANSU" && (
        <>
          <input type="text" name="hoTen" value={form.hoTen} onChange={handleChange} placeholder="Họ tên" className="border p-2 w-full rounded" required />
          <input type="text" name="loaiNS" value={form.loaiNS} onChange={handleChange} placeholder="Loại nhân sự" className="border p-2 w-full rounded" required />
          <input type="text" name="capBac" value={form.capBac} onChange={handleChange} placeholder="Cấp bậc" className="border p-2 w-full rounded" required />
          <input type="text" name="chuyenMon" value={form.chuyenMon} onChange={handleChange} placeholder="Chuyên môn" className="border p-2 w-full rounded" required />
        </>
      )}

      {form.vaiTro === "BACSI" && (
        <>
          <input type="text" name="hoTen" value={form.hoTen} onChange={handleChange} placeholder="Họ tên" className="border p-2 w-full rounded" required />
          <input type="text" name="chuyenMon" value={form.chuyenMon} onChange={handleChange} placeholder="Chuyên môn" className="border p-2 w-full rounded" required />
          <input type="text" name="trinhDo" value={form.trinhDo} onChange={handleChange} placeholder="Trình độ" className="border p-2 w-full rounded" required />
          <input type="text" name="chucVu" value={form.chucVu} onChange={handleChange} placeholder="Chức vụ" className="border p-2 w-full rounded" required />
        </>
      )}

      {form.vaiTro === "BENHNHAN" && (
        <>
          <input type="text" name="hoTen" value={form.hoTen} onChange={handleChange} placeholder="Họ tên" className="border p-2 w-full rounded" required />
          <input type="date" name="ngaySinh" value={form.ngaySinh} onChange={handleChange} className="border p-2 w-full rounded" required />
          <select name="gioiTinh" value={form.gioiTinh} onChange={handleChange} className="border p-2 w-full rounded" required>
            <option value="">-- Chọn giới tính --</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
          <input type="text" name="diaChi" value={form.diaChi} onChange={handleChange} placeholder="Địa chỉ" className="border p-2 w-full rounded" required />
          <input type="text" name="soDienThoai" value={form.soDienThoai} onChange={handleChange} placeholder="Số điện thoại" className="border p-2 w-full rounded" required />
          <input type="text" name="bhyt" value={form.bhyt} onChange={handleChange} placeholder="Số thẻ BHYT" className="border p-2 w-full rounded" />
        </>
      )}

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        {isEdit ? "Cập nhật" : "Tạo tài khoản"}
      </button>
    </form>
  );
}

export default CreateUserForm;
