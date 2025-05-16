// 📁 src/pages/admin/AdminUserList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchUsers = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tai-khoan`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit }, // Gửi tham số phân trang
      });
      setUsers(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error("Error fetching users:", err); // Log lỗi chi tiết
      toast.error(err.response?.data?.message || "Không thể tải danh sách tài khoản");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Bạn chưa đăng nhập");
      return;
    }
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/tai-khoan/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Đã xóa tài khoản");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err); // Log lỗi chi tiết
      toast.error(err.response?.data?.message || "Lỗi khi xóa tài khoản");
    }
  };

  const filtered = users.filter(
    (u) =>
      u.tenDangNhap?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = {
    ADMIN: filtered.filter((u) => u.maNhom === "ADMIN"),
    BACSI: filtered.filter((u) => u.maNhom === "BACSI"),
    NHANSU: filtered.filter((u) => u.maNhom === "NHANSU"),
    BENHNHAN: filtered.filter((u) => u.maNhom === "BENHNHAN"),
  };

  const commonColumns = (
    <>
      <th className="p-2">Mã tài khoản</th>
      <th className="p-2">Tên đăng nhập</th>
      <th className="p-2">Email</th>
      <th className="p-2">Trạng thái</th>
    </>
  );

  const renderSection = (label, role, data) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <table className="w-full border text-left mb-4">
        <thead>
          <tr className="bg-gray-100">
            {commonColumns}
            {role === "BACSI" && (
              <>
                <th className="p-2">Khoa</th>
                <th className="p-2">Chuyên môn</th>
                <th className="p-2">Chức vụ</th>
                <th className="p-2">Trình độ</th>
              </>
            )}
            {role === "NHANSU" && (
              <>
                <th className="p-2">Khoa</th>
                <th className="p-2">Loại</th>
                <th className="p-2">Chuyên môn</th>
                <th className="p-2">Cấp bậc</th>
              </>
            )}
            {role === "BENHNHAN" && (
              <>
                <th className="p-2">Họ tên</th>
                <th className="p-2">Giới tính</th>
                <th className="p-2">Ngày sinh</th>
                <th className="p-2">SĐT</th>
                <th className="p-2">BHYT</th>
              </>
            )}
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.maTK || user.tenDangNhap} className="border-b">
              <td className="p-2">{user.maTK}</td>
              <td className="p-2">{user.tenDangNhap}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.trangThai === 1 ? "Hoạt động" : "Đã khóa"}</td>
              {role === "BACSI" && (
                <>
                  <td className="p-2">{user.tenKhoa || user.maKhoa || "-"}</td>
                  <td className="p-2">{user.chuyenMon || "-"}</td>
                  <td className="p-2">{user.chucVu || "-"}</td>
                  <td className="p-2">{user.trinhDo || "-"}</td>
                </>
              )}
              {role === "NHANSU" && (
                <>
                  <td className="p-2">{user.tenKhoa || user.maKhoa || "-"}</td>
                  <td className="p-2">{user.loaiNS || "-"}</td>
                  <td className="p-2">{user.chuyenMon || "-"}</td>
                  <td className="p-2">{user.capBac || "-"}</td>
                </>
              )}
              {role === "BENHNHAN" && (
                <>
                  <td className="p-2">{user.hoTen || "-"}</td>
                  <td className="p-2">{user.gioiTinh || "-"}</td>
                  <td className="p-2">{user.ngaySinh || "-"}</td>
                  <td className="p-2">{user.soDienThoai || "-"}</td>
                  <td className="p-2">{user.bhyt || "-"}</td>
                </>
              )}
              <td className="p-2 space-x-2">
                <Link
                  to={`/admin/taikhoan/sua/${user.maTK}`}
                  state={{ user }}
                  className="text-yellow-600 hover:underline"
                >
                  Sửa
                </Link>

                <button
                  onClick={() => handleDelete(user.maTK)}
                  className="text-red-600 hover:underline"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-4 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh sách tài khoản</h2>
        <Link
          to="/admin/taikhoan/tao-moi"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Tạo tài khoản
        </Link>
      </div>

      <input
        type="text"
        placeholder="Tìm kiếm theo tên đăng nhập hoặc email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-6 rounded"
      />

      {loading ? (
        <p>Đang tải...</p>
      ) : filtered.length === 0 ? (
        <p>Không có tài khoản nào</p>
      ) : (
        <>
          {renderSection("🟦 Quản trị viên (ADMIN)", "ADMIN", grouped.ADMIN)}
          {renderSection("🟩 Bác sĩ (BACSI)", "BACSI", grouped.BACSI)}
          {renderSection("🟨 Nhân viên y tế (NHANSU)", "NHANSU", grouped.NHANSU)}
          {renderSection("🟧 Bệnh nhân (BENHNHAN)", "BENHNHAN", grouped.BENHNHAN)}
        </>
      )}
    </div>
  );
}

export default AdminUserList;
