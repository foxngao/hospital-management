import React, { useEffect, useState } from "react";
import { getAllHoSo, ghiNhanTinhTrang } from "../../../services/nhansu/YTa/hosobenhan/hsbaService";

const GhiNhanTinhTrangPage = () => {
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ lichSuBenh: "", ghiChu: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getAllHoSo();
    setList(res.data.data || []);
  };

  const handleEdit = (hsba) => {
    setEditId(hsba.maHSBA);
    setForm({ lichSuBenh: hsba.lichSuBenh || "", ghiChu: hsba.ghiChu || "" });
  };

  const handleSave = async () => {
    await ghiNhanTinhTrang(editId, form);
    fetchData();
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ lichSuBenh: "", ghiChu: "" });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">📋 Ghi nhận tình trạng bệnh nhân (Y TÁ)</h2>

      <table className="min-w-full text-sm border bg-white shadow rounded">
        <thead>
          <tr>
            <th>Mã HSBA</th>
            <th>Mã BN</th>
            <th>Đợt khám</th>
            <th>Lịch sử bệnh</th>
            <th>Ghi chú</th>
            <th>Ngày lập</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.maHSBA} className="border-t">
              <td>{item.maHSBA}</td>
              <td>{item.maBN}</td>
              <td>{item.dotKhamBenh}</td>
              <td>
                {editId === item.maHSBA ? (
                  <textarea
                    name="lichSuBenh"
                    value={form.lichSuBenh}
                    onChange={handleChange}
                    className="w-40 border p-1"
                  />
                ) : (
                  item.lichSuBenh
                )}
              </td>
              <td>
                {editId === item.maHSBA ? (
                  <textarea
                    name="ghiChu"
                    value={form.ghiChu}
                    onChange={handleChange}
                    className="w-40 border p-1"
                  />
                ) : (
                  item.ghiChu
                )}
              </td>
              <td>{item.ngayLap}</td>
              <td className="space-x-2">
                {editId === item.maHSBA ? (
                  <>
                    <button onClick={handleSave} className="text-green-600 hover:underline">Lưu</button>
                    <button onClick={handleCancel} className="text-gray-500 hover:underline">Huỷ</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">Sửa</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GhiNhanTinhTrangPage;
