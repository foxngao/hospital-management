// 📁 src/pages/admin/MedicineList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, InputNumber, Select, message, Popconfirm } from "antd";

function MedicineList() {
  const [data, setData] = useState([]);
  const [units, setUnits] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [thuocRes, dvtRes, nhomRes] = await Promise.all([
        axios.get("/api/medicine"),
        axios.get("/api/unit"),
        axios.get("/api/medicine-type"),
      ]);
      setData(thuocRes.data);
      setUnits(dvtRes.data);
      setGroups(nhomRes.data);
    } catch (err) {
      message.error("Không thể tải dữ liệu thuốc");
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
        await axios.put(`/api/medicine/${editing.maThuoc}`, values);
        message.success("Cập nhật thuốc thành công");
      } else {
        await axios.post("/api/medicine", values);
        message.success("Thêm thuốc thành công");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      message.error("Không thể lưu");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/medicine/${id}`);
      message.success("Xóa thuốc thành công");
      fetchData();
    } catch (err) {
      message.error("Không thể xóa");
    }
  };

  const columns = [
    { title: "Mã thuốc", dataIndex: "maThuoc" },
    { title: "Tên thuốc", dataIndex: "tenThuoc" },
    { title: "Hoạt chất", dataIndex: "tenHoatChat" },
    { title: "Hàm lượng", dataIndex: "hamLuong" },
    { title: "Đơn vị", dataIndex: "maDVT" },
    { title: "Nhóm", dataIndex: "maNhom" },
    {
      title: "Thao tác",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openModal(record)}>Sửa</Button>
          <Popconfirm title="Xóa thuốc này?" onConfirm={() => handleDelete(record.maThuoc)}>
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh sách thuốc</h2>
        <Button type="primary" onClick={() => openModal()}>Thêm thuốc</Button>
      </div>
      <Table rowKey="maThuoc" columns={columns} dataSource={data} loading={loading} />

      <Modal
        title={editing ? "Cập nhật thuốc" : "Thêm thuốc"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="maThuoc" label="Mã thuốc" rules={[{ required: true }]}>
            <Input disabled={!!editing} />
          </Form.Item>
          <Form.Item name="tenThuoc" label="Tên thuốc" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tenHoatChat" label="Hoạt chất" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="hamLuong" label="Hàm lượng">
            <Input />
          </Form.Item>
          <Form.Item name="maDVT" label="Đơn vị tính" rules={[{ required: true }]}>
            <Select options={units.map(u => ({ value: u.maDVT, label: u.tenDVT }))} />
          </Form.Item>
          <Form.Item name="maNhom" label="Nhóm thuốc" rules={[{ required: true }]}>
            <Select options={groups.map(g => ({ value: g.maNhom, label: g.tenNhom }))} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default MedicineList;
