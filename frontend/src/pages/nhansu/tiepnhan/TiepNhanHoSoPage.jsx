import React, { useEffect, useState } from "react";
import { getAllHoSo, createHoSo, deleteHoSo } from "../../../services/nhansu/tiepnhan/hsbaService";
import axios from "../../../api/axiosClient";

const TiepNhanHoSoPage = () => {
  const [list, setList] = useState([]);
  const [benhNhanList, setBenhNhanList] = useState([]);
  const [form, setForm] = useState({
    maBN: "",
    dotKhamBenh: "",
    lichSuBenh: "",
    ghiChu: "",
  });

  useEffect(() => {
    fetchData();
    fetchBenhNhan();
  }, []);

  const fetchData = async () => {
    const res = await getAllHoSo();
    setList(res.data.data || []);
  };

  const fetchBenhNhan = async () => {
    const res = await axios.get("/benhnhan");
    setBenhNhanList(res.data.data || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const selectedDate = form.dotKhamBenh?.split("T")[0]; // YYYY-MM-DD

      // Giờ hiện tại theo múi giờ Việt Nam (UTC+7)
      const now = new Date();
      const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
      const hh = vietnamTime.getHours().toString().padStart(2, "0");
      const mm = vietnamTime.getMinutes().toString().padStart(2, "0");

      // Kết hợp lại thành giá trị datetime-local hợp lệ
      const finalDateTime = `${selectedDate}T${hh}:${mm}`;
      const payload = {
        ...form,
        dotKhamBenh: new Date(finalDateTime).toISOString(),
      };

      await createHoSo(payload);
      fetchData();
      setForm({ maBN: "", dotKhamBenh: "", lichSuBenh: "", ghiChu: "" });
    } catch (error) {
      console.error("❌ Lỗi tạo hồ sơ:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá?")) {
      await deleteHoSo(id);
      fetchData();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">📁 Tiếp nhận hồ sơ bệnh án</h2>

      {/* Form tiếp nhận */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded shadow">
        <select name="maBN" value={form.maBN} onChange={handleChange} className="input">
          <option value="">-- Chọn bệnh nhân --</option>
          {benhNhanList.map((bn) => (
            <option key={bn.maBN} value={bn.maBN}>{bn.hoTen}</option>
          ))}
        </select>
        <input
          type="date"
          name="dotKhamBenh"
          value={form.dotKhamBenh}
          onChange={handleChange}
          className="input"
        />
        <textarea
          name="lichSuBenh"
          value={form.lichSuBenh}
          onChange={handleChange}
          placeholder="Lịch sử bệnh"
          className="input"
        />
        <textarea
          name="ghiChu"
          value={form.ghiChu}
          onChange={handleChange}
          placeholder="Ghi chú"
          className="input"
        />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">
          ➕ Tạo hồ sơ
        </button>
      </div>

      {/* Table hồ sơ */}
      <table className="min-w-full text-sm bg-white shadow rounded">
        <thead>
          <tr>
            <th>Mã HSBA</th>
            <th>Bệnh nhân</th>
            <th>Đợt khám</th>
            <th>Lịch sử bệnh</th>
            <th>Ghi chú</th>
            <th>Ngày lập</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((hs) => (
            <tr key={hs.maHSBA} className="border-t">
              <td>{hs.maHSBA}</td>
              <td>{hs.BenhNhan?.hoTen}</td>
              <td>{hs.dotKhamBenh}</td>
              <td>{hs.lichSuBenh}</td>
              <td>{hs.ghiChu}</td>
              <td>{hs.ngayLap}</td>
              <td>
                <button onClick={() => handleDelete(hs.maHSBA)} className="text-red-600 hover:underline">
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TiepNhanHoSoPage;
