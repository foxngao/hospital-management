// 📁 src/pages/admin/MedicineTypeList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";

function MedicineTypeList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/medicine-type");
      setData(res.data);
    } catch (err) {
      message.error("Lỗi khi tải nhóm thuốc");
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

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editing) {
        await axios.put(`/api/medicine-type/${editing.maNhom}`, values);
        message.success("Cập nhật thành công");
      } else {
        await axios.post("/api/medicine-type", values);
        message.success("Thêm nhóm thuốc mới");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      message.error("Không thể lưu");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/medicine-type/${id}`);
      message.success("Xóa thành công");
      fetchData();
    } catch (err) {
      message.error("Không thể xóa");
    }
  };

  const columns = [
    {
      title: "Mã nhóm",
      dataIndex: "maNhom",
    },
    {
      title: "Tên nhóm",
      dataIndex: "tenNhom",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openModal(record)}>
            Sửa
          </Button>
          <Popconfirm title="Bạn chắc chắn muốn xóa?" onConfirm={() => handleDelete(record.maNhom)}>
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
        <h2 className="text-xl font-bold">Danh sách nhóm thuốc</h2>
        <Button type="primary" onClick={() => openModal()}>
          Thêm nhóm thuốc
        </Button>
      </div>
      <Table rowKey="maNhom" columns={columns} dataSource={data} loading={loading} />

      <Modal
        title={editing ? "Cập nhật nhóm thuốc" : "Thêm nhóm thuốc"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="maNhom" label="Mã nhóm" rules={[{ required: true }]}>
            <Input disabled={!!editing} />
          </Form.Item>
          <Form.Item name="tenNhom" label="Tên nhóm" rules={[{ required: true }]}>
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

export default MedicineTypeList;
