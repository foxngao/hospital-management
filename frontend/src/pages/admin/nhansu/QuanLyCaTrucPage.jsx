import React, { useEffect, useState } from "react";
import {
  getAllCaTruc,
  createCaTruc,
  updateCaTruc,
  deleteCaTruc,
} from "../../../services/catruc/catrucService";

const QuanLyCaTrucPage = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    tenCa: "",
    thoiGianBatDau: "",
    thoiGianKetThuc: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getAllCaTruc();
    setList(res.data.data || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    await createCaTruc(form);
    fetchData();
    setForm({ tenCa: "", thoiGianBatDau: "", thoiGianKetThuc: "" });
  };

  const handleUpdate = async (id) => {
    const tenCa = prompt("Tên ca mới:");
    const batDau = prompt("Giờ bắt đầu (hh:mm:ss):");
    const ketThuc = prompt("Giờ kết thúc (hh:mm:ss):");
    if (tenCa && batDau && ketThuc) {
      await updateCaTruc(id, {
        tenCa,
        thoiGianBatDau: batDau,
        thoiGianKetThuc: ketThuc,
      });
      fetchData();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xoá ca này?")) {
      await deleteCaTruc(id);
      fetchData();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">🕐 Quản lý ca trực bệnh viện</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded shadow">
        <input
          name="tenCa"
          value={form.tenCa}
          onChange={handleChange}
          placeholder="Tên ca"
          className="input"
        />
        <input
          type="time"
          name="thoiGianBatDau"
          value={form.thoiGianBatDau}
          onChange={handleChange}
          className="input"
        />
        <input
          type="time"
          name="thoiGianKetThuc"
          value={form.thoiGianKetThuc}
          onChange={handleChange}
          className="input"
        />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
          ➕ Thêm ca
        </button>
      </div>

      <table className="min-w-full text-sm bg-white shadow rounded">
        <thead>
          <tr>
            <th>Mã ca</th>
            <th>Tên ca</th>
            <th>Bắt đầu</th>
            <th>Kết thúc</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((ca) => (
            <tr key={ca.maCa} className="border-t">
              <td>{ca.maCa}</td>
              <td>{ca.tenCa}</td>
              <td>{ca.thoiGianBatDau}</td>
              <td>{ca.thoiGianKetThuc}</td>
              <td className="space-x-2">
                <button onClick={() => handleUpdate(ca.maCa)} className="text-green-600 hover:underline">Sửa</button>
                <button onClick={() => handleDelete(ca.maCa)} className="text-red-600 hover:underline">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuanLyCaTrucPage;
