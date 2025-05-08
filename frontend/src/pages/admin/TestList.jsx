// 📁 src/pages/admin/TestList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm } from "antd";

function TestList() {
  const [tests, setTests] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [res1, res2] = await Promise.all([
        axios.get("/api/tests"),
        axios.get("/api/test-types"),
      ]);
      setTests(res1.data);
      setTypes(res2.data);
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
    if (record) form.setFieldsValue(record);
    else form.resetFields();
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editing) {
        await axios.put(`/api/tests/${editing.maXN}`, values);
        message.success("Cập nhật thành công");
      } else {
        await axios.post("/api/tests", values);
        message.success("Thêm thành công");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      message.error("Lỗi khi lưu xét nghiệm");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tests/${id}`);
      message.success("Đã xóa");
      fetchData();
    } catch (err) {
      message.error("Không thể xóa");
    }
  };

  const columns = [
    { title: "Mã xét nghiệm", dataIndex: "maXN" },
    { title: "Tên xét nghiệm", dataIndex: "tenXN" },
    { title: "Loại xét nghiệm", dataIndex: "maLoaiXN" },
    { title: "Chi phí", dataIndex: "chiPhi" },
    { title: "Thời gian trả", dataIndex: "thoiGianTraKetQua" },
    {
      title: "Thao tác",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openModal(record)}>Sửa</Button>
          <Popconfirm title="Bạn chắc chắn muốn xóa?" onConfirm={() => handleDelete(record.maXN)}>
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh sách xét nghiệm</h2>
        <Button type="primary" onClick={() => openModal()}>Thêm xét nghiệm</Button>
      </div>

      <Table rowKey="maXN" dataSource={tests} columns={columns} loading={loading} />

      <Modal
        title={editing ? "Cập nhật xét nghiệm" : "Thêm xét nghiệm"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="maXN" label="Mã xét nghiệm" rules={[{ required: true }]}>
            <Input disabled={!!editing} />
          </Form.Item>
          <Form.Item name="tenXN" label="Tên xét nghiệm" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="maLoaiXN" label="Loại xét nghiệm" rules={[{ required: true }]}>
            <Select>
              {types.map((type) => (
                <Select.Option key={type.maLoaiXN} value={type.maLoaiXN}>
                  {type.tenLoai}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="chiPhi" label="Chi phí" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="thoiGianTraKetQua" label="Thời gian trả kết quả">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TestList;
