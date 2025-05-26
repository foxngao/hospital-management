import React, { useEffect, useState } from "react";
import FilterBar from "../../../components/lichkham/FilterBar";
import LichTable from "../../../components/lichkham/LichTable";
import {
  getAllLichHen,
  updateLichHen,
  deleteLichHen,
} from "../../../services/lichkham_BS/lichkhamService";
import axios from "../../../api/axiosClient";

const LichHenKhamPage = () => {
  const [lichList, setLichList] = useState([]);
  const [bacSiList, setBacSiList] = useState([]);
  const [filter, setFilter] = useState({ tuNgay: "", denNgay: "", maBS: "" });
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    loadData();
    axios.get("/bacsi").then((res) => setBacSiList(res.data.data));
  }, []);

  const loadData = async () => {
    const res = await getAllLichHen();
    setLichList(res.data.data);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredList = lichList.filter((item) => {
    const ngay = new Date(item.ngayKham);
    const tu = filter.tuNgay ? new Date(filter.tuNgay) : null;
    const den = filter.denNgay ? new Date(filter.denNgay) : null;
    const matchNgay = (!tu || ngay >= tu) && (!den || ngay <= den);
    const matchBS = !filter.maBS || item.maBS === filter.maBS;
    return matchNgay && matchBS;
  });

  const startEdit = (lich) => setEditForm({ ...lich });
  const handleEditChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const saveEdit = async () => {
    await updateLichHen(editForm.maLich, {
      phong: editForm.phong,
      ghiChu: editForm.ghiChu,
      ngayKham: editForm.ngayKham,
      gioKham: editForm.gioKham,
    });
    alert("✅ Cập nhật thành công");
    setEditForm({});
    loadData();
  };

  const cancelEdit = () => setEditForm({});
  const handleDelete = async (id) => {
    if (window.confirm("❌ Xác nhận xoá lịch hẹn?")) {
      await deleteLichHen(id);
      loadData();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          📅 Lịch hẹn khám bệnh
        </h2>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <FilterBar
          filter={filter}
          bacSiList={bacSiList}
          onChange={handleFilterChange}
        />
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <LichTable
          data={filteredList}
          editForm={editForm}
          onEditStart={startEdit}
          onEditChange={handleEditChange}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default LichHenKhamPage;
