import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Spin } from "antd";

function UserList() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user");
      setUsers(res.data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách người dùng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "tenDangNhap",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      render: (val) => (val ? "Hoạt động" : "Đã khóa"),
    },
    {
      title: "Nhóm quyền",
      dataIndex: "maNhom",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Danh sách người dùng</h2>
      {loading ? <Spin /> : <Table dataSource={users} rowKey="maTK" columns={columns} />}
    </div>
  );
}

export default UserList;