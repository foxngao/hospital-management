// 📁 src/pages/admin/RoleAssignment.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Select, message, Spin } from "antd";

const { Option } = Select;

function RoleAssignment() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user");
      setUsers(res.data);
    } catch (err) {
      message.error("Lỗi khi tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get("/api/roles");
      setRoles(res.data);
    } catch (err) {
      message.error("Lỗi khi tải nhóm quyền");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const handleChangeRole = async (maTK, newRole) => {
    try {
      await axios.put(`/api/user/${maTK}/role`, { maNhom: newRole });
      message.success("Cập nhật quyền thành công");
      fetchUsers();
    } catch (err) {
      message.error("Cập nhật thất bại");
    }
  };

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "tenDangNhap",
    },
    {
      title: "Nhóm quyền",
      dataIndex: "maNhom",
      render: (role, record) => (
        <Select
          value={role}
          onChange={(val) => handleChangeRole(record.maTK, val)}
          style={{ width: 150 }}
        >
          {roles.map((r) => (
            <Option key={r.maNhom} value={r.maNhom}>
              {r.tenNhom}
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Phân quyền người dùng</h2>
      {loading ? <Spin /> : <Table dataSource={users} rowKey="maTK" columns={columns} />}
    </div>
  );
}

export default RoleAssignment;
