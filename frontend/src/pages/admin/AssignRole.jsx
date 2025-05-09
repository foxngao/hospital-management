// 📁 src/pages/admin/AssignRole.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AssignRole() {
  const [users, setUsers] = useState([]);
  const [updatedRoles, setUpdatedRoles] = useState({});
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tai-khoan`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      toast.error("Không thể tải danh sách tài khoản");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (id, newRole) => {
    setUpdatedRoles((prev) => ({ ...prev, [id]: newRole }));
  };

  const handleSave = async (id) => {
    const maNhom = updatedRoles[id];
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/tai-khoan/${id}`, { maNhom }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Cập nhật quyền thành công");
      fetchUsers();
    } catch (err) {
      toast.error("Lỗi khi cập nhật quyền");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Phân quyền người dùng</h2>
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Tên đăng nhập</th>
            <th className="p-2">Email</th>
            <th className="p-2">Quyền hiện tại</th>
            <th className="p-2">Gán quyền mới</th>
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.maTK} className="border-b">
              <td className="p-2">{u.tenDangNhap}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.maNhom}</td>
              <td className="p-2">
                <select
                  value={updatedRoles[u.maTK] || u.maNhom}
                  onChange={(e) => handleChange(u.maTK, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="BACSI">Bác sĩ</option>
                  <option value="NHANSU">Nhân viên y tế</option>
                  <option value="BENHNHAN">Bệnh nhân</option>
                </select>
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleSave(u.maTK)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Lưu
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignRole;
