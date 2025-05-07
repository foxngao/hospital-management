import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function DoctorLabTest() {
  const [tests, setTests] = useState([]);
  const [form, setForm] = useState({
    maBN: "",
    maLoaiXN: "",
    ketQua: "",
    trangThai: "cho_ket_qua",
    ngayYeuCau: new Date().toISOString().split("T")[0]
  });
  const token = localStorage.getItem("token");

  const fetchTests = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/lab-test`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTests(res.data);
    } catch (err) {
      toast.error("Không thể tải danh sách phiếu xét nghiệm");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/lab-test`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Tạo phiếu thành công");
      setForm({ ...form, maBN: "", maLoaiXN: "", ketQua: "" });
      fetchTests();
    } catch (err) {
      toast.error("Lỗi khi tạo phiếu");
    }
  };

  const handleUpdate = async (id, ketQua) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/lab-test/${id}`, { ketQua }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Cập nhật kết quả");
      fetchTests();
    } catch {
      toast.error("Lỗi khi cập nhật");
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Tạo phiếu xét nghiệm</h2>
      <form onSubmit={handleCreate} className="space-y-4 mb-6">
        <input type="text" placeholder="Mã bệnh nhân" className="border p-2 w-full"
          value={form.maBN} onChange={(e) => setForm({ ...form, maBN: e.target.value })} required />
        <input type="text" placeholder="Mã loại xét nghiệm" className="border p-2 w-full"
          value={form.maLoaiXN} onChange={(e) => setForm({ ...form, maLoaiXN: e.target.value })} required />
        <input type="date" className="border p-2 w-full"
          value={form.ngayYeuCau} onChange={(e) => setForm({ ...form, ngayYeuCau: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Tạo phiếu</button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Danh sách phiếu</h3>
      <ul className="space-y-2">
        {tests.map((test) => (
          <li key={test.maPXN} className="border p-3 rounded bg-white">
            🧪 Phiếu: {test.maPXN} | BN: {test.maBN} | XN: {test.maLoaiXN} <br />
            📅 Ngày: {test.ngayYeuCau?.split("T")[0]} <br />
            📃 KQ: {test.ketQua || "Chưa có"} <br />
            {test.trangThai === "cho_ket_qua" && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.elements[`ketQua_${test.maPXN}`];
                handleUpdate(test.maPXN, input.value);
              }}>
                <input name={`ketQua_${test.maPXN}`} placeholder="Kết quả" className="border p-2 w-full mt-2" />
                <button className="bg-green-600 text-white px-4 py-1 rounded mt-1">Cập nhật</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorLabTest;
