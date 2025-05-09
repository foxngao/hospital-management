// 📁 src/pages/admin/UnitList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";

function UnitList() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const fetchUnits = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/unit");
      setUnits(res.data);
    } catch (err) {
      message.error("Lỗi khi tải danh sách đơn vị tính");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
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

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editing) {
        await axios.put(`/api/unit/${editing.maDVT}`, values);
        message.success("Cập nhật thành công");
      } else {
        await axios.post("/api/unit", values);
        message.success("Thêm thành công");
      }
      setIsModalOpen(false);
      fetchUnits();
    } catch (err) {
      message.error("Không thể lưu");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/unit/${id}`);
      message.success("Xóa thành công");
      fetchUnits();
    } catch (err) {
      message.error("Không thể xóa");
    }
  };

  const columns = [
    { title: "Mã đơn vị", dataIndex: "maDVT" },
    { title: "Tên đơn vị", dataIndex: "tenDVT" },
    { title: "Mô tả", dataIndex: "moTa" },
    {
      title: "Thao tác",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openModal(record)}>Sửa</Button>
          <Popconfirm title="Xóa đơn vị này?" onConfirm={() => handleDelete(record.maDVT)}>
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh sách đơn vị tính</h2>
        <Button type="primary" onClick={() => openModal()}>Thêm đơn vị</Button>
      </div>

      <Table rowKey="maDVT" columns={columns} dataSource={units} loading={loading} />

      <Modal
        title={editing ? "Cập nhật đơn vị" : "Thêm đơn vị"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="maDVT" label="Mã đơn vị" rules={[{ required: true }]}>
            <Input disabled={!!editing} />
          </Form.Item>
          <Form.Item name="tenDVT" label="Tên đơn vị" rules={[{ required: true }]}>
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

export default UnitList;
