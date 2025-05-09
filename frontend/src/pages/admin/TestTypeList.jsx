// 📁 src/pages/admin/TestTypeList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";

function TestTypeList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/test-types");
      setData(res.data);
    } catch (err) {
      message.error("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (record = null) => {
    setEditing(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editing) {
        await axios.put(`/api/test-types/${editing.maLoaiXN}`, values);
        message.success("Cập nhật thành công");
      } else {
        await axios.post("/api/test-types", values);
        message.success("Thêm thành công");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      message.error("Lỗi khi lưu dữ liệu");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/test-types/${id}`);
      message.success("Đã xóa");
      fetchData();
    } catch (err) {
      message.error("Không thể xóa");
    }
  };

  const columns = [
    { title: "Mã loại", dataIndex: "maLoaiXN" },
    { title: "Tên loại", dataIndex: "tenLoai" },
    { title: "Mô tả", dataIndex: "moTa" },
    {
      title: "Thao tác",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openModal(record)}>Sửa</Button>
          <Popconfirm title="Bạn chắc chắn muốn xóa?" onConfirm={() => handleDelete(record.maLoaiXN)}>
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh sách loại xét nghiệm</h2>
        <Button type="primary" onClick={() => openModal()}>Thêm loại</Button>
      </div>

      <Table rowKey="maLoaiXN" dataSource={data} columns={columns} loading={loading} />

      <Modal
        title={editing ? "Cập nhật loại" : "Thêm loại"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="maLoaiXN" label="Mã loại" rules={[{ required: true }]}>
            <Input disabled={!!editing} />
          </Form.Item>
          <Form.Item name="tenLoai" label="Tên loại" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="moTa" label="Mô tả">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TestTypeList;
