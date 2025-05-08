// 📁 src/pages/admin/DepartmentList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Input, Modal, message, Popconfirm } from "antd";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [form] = Form.useForm();

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/department");
      setDepartments(res.data);
    } catch (err) {
      message.error("Lỗi khi tải danh sách khoa");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const showModal = (record = null) => {
    setEditingDept(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingDept) {
        await axios.put(`/api/department/${editingDept.maKhoa}`, values);
        message.success("Cập nhật khoa thành công");
      } else {
        await axios.post("/api/department", values);
        message.success("Thêm khoa mới thành công");
      }
      setIsModalOpen(false);
      fetchDepartments();
    } catch (err) {
      message.error("Không thể lưu");
    }
  };

  const handleDelete = async (maKhoa) => {
    try {
      await axios.delete(`/api/department/${maKhoa}`);
      message.success("Xóa thành công");
      fetchDepartments();
    } catch (err) {
      message.error("Không thể xóa");
    }
  };

  const columns = [
    {
      title: "Mã khoa",
      dataIndex: "maKhoa",
    },
    {
      title: "Tên khoa",
      dataIndex: "tenKhoa",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>
            Sửa
          </Button>
          <Popconfirm title="Xóa khoa này?" onConfirm={() => handleDelete(record.maKhoa)}>
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh sách khoa - phòng</h2>
        <Button type="primary" onClick={() => showModal()}>
          Thêm khoa
        </Button>
      </div>
      <Table dataSource={departments} rowKey="maKhoa" columns={columns} loading={loading} />

      <Modal
        title={editingDept ? "Cập nhật khoa" : "Thêm khoa mới"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="maKhoa" label="Mã khoa" rules={[{ required: true }]}>
            <Input disabled={!!editingDept} />
          </Form.Item>
          <Form.Item name="tenKhoa" label="Tên khoa" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="moTa" label="Mô tả">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default DepartmentList;
