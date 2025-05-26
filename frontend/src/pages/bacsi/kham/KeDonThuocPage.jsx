import React, { useEffect, useState } from "react";
import {
  createDonThuoc,
  addThuocToDon,
  getChiTietDonThuoc,
} from "../../../services/donthuoc/donthuocService";
import { getAllThuoc } from "../../../services/donthuoc/thuocService";
import { getBacSiByTK } from "../../../services/bacsi/bacsiService";

const KeDonThuocPage = () => {
  const [thuocs, setThuocs] = useState([]);
  const [maDT, setMaDT] = useState(null);
  const [dsChiTiet, setDsChiTiet] = useState([]);
  const [formDon, setFormDon] = useState({
    maHSBA: "",
    maBS: "",
  });

  const [formChiTiet, setFormChiTiet] = useState({
    maThuoc: "",
    soLuong: "",
    lieuDung: "",
  });

  useEffect(() => {
    fetchThuoc();
    fetchMaBS();
  }, []);

  const fetchThuoc = async () => {
    try {
      const res = await getAllThuoc();
      setThuocs(res.data.data || []);
    } catch (error) {
      console.error("❌ Lỗi API /thuoc:", error);
      alert("❌ Lỗi tải danh sách thuốc");
    }
  };

  const fetchMaBS = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.maNhom === "BACSI" && user.maTK) {
      try {
        const res = await getBacSiByTK(user.maTK);
        const maBS = res.data.data?.maBS;
        if (maBS) {
          setFormDon((prev) => ({ ...prev, maBS }));
        }
      } catch {
        alert("❌ Không lấy được mã bác sĩ từ tài khoản");
      }
    }
  };

  const handleChangeDon = (e) => {
    setFormDon({ ...formDon, [e.target.name]: e.target.value });
  };

  const handleChangeChiTiet = (e) => {
    setFormChiTiet({ ...formChiTiet, [e.target.name]: e.target.value });
  };

  const handleCreateDon = async () => {
    const { maHSBA, maBS } = formDon;
    if (!maHSBA || !maBS) return alert("Vui lòng nhập đầy đủ mã hồ sơ và bác sĩ");
    try {
      const res = await createDonThuoc({ maHSBA, maBS });
      const maDT_new = res.data.data.maDT;
      setMaDT(maDT_new);
      alert("✅ Đã tạo đơn thuốc");
      fetchChiTiet(maDT_new);
    } catch {
      alert("❌ Lỗi tạo đơn thuốc");
    }
  };

  const handleAddThuoc = async () => {
    const { maThuoc, soLuong, lieuDung } = formChiTiet;
    if (!maDT || !maThuoc || !soLuong || !lieuDung)
      return alert("Thiếu dữ liệu kê thuốc");
    try {
      await addThuocToDon({ maDT, maThuoc, soLuong, lieuDung });
      setFormChiTiet({ maThuoc: "", soLuong: "", lieuDung: "" });
      fetchChiTiet(maDT);
    } catch {
      alert("❌ Lỗi thêm thuốc vào đơn");
    }
  };

  const fetchChiTiet = async (ma) => {
    try {
      const res = await getChiTietDonThuoc(ma);
      setDsChiTiet(res.data.data || []);
    } catch {
      alert("❌ Lỗi tải chi tiết đơn thuốc");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-blue-700">💊 Kê đơn thuốc</h1>

      {/* Tạo đơn thuốc */}
      <div className="bg-white p-4 rounded shadow-md grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          name="maHSBA"
          value={formDon.maHSBA}
          onChange={handleChangeDon}
          placeholder="Mã hồ sơ bệnh án"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          name="maBS"
          value={formDon.maBS}
          onChange={handleChangeDon}
          readOnly
          placeholder="Mã bác sĩ"
          className="border border-gray-300 p-2 rounded bg-gray-100"
        />
        <button
          onClick={handleCreateDon}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
        >
          ➕ Tạo đơn thuốc
        </button>
        {maDT && (
          <div className="text-green-700 font-semibold flex items-center">
            Mã đơn: {maDT}
          </div>
        )}
      </div>

      {/* Thêm thuốc vào đơn */}
      {maDT && (
        <div className="bg-white p-4 rounded shadow-md grid grid-cols-1 md:grid-cols-6 gap-4">
          <select
            name="maThuoc"
            value={formChiTiet.maThuoc}
            onChange={handleChangeChiTiet}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="">-- Chọn thuốc --</option>
            {thuocs.map((t) => (
              <option key={t.maThuoc} value={t.maThuoc}>
                {t.tenThuoc}
              </option>
            ))}
          </select>
          <input
            name="soLuong"
            value={formChiTiet.soLuong}
            onChange={handleChangeChiTiet}
            placeholder="Số lượng"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            name="lieuDung"
            value={formChiTiet.lieuDung}
            onChange={handleChangeChiTiet}
            placeholder="Liều dùng"
            className="border border-gray-300 p-2 rounded"
          />
          <div className="md:col-span-2">
            <button
              onClick={handleAddThuoc}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
            >
              ➕ Thêm vào đơn
            </button>
          </div>
        </div>
      )}

      {/* Chi tiết đơn thuốc */}
      {dsChiTiet.length > 0 && (
        <div className="bg-white rounded shadow-md overflow-x-auto">
          <table className="min-w-full text-sm table-auto">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Mã thuốc</th>
                <th className="px-4 py-2">Số lượng</th>
                <th className="px-4 py-2">Liều dùng</th>
              </tr>
            </thead>
            <tbody>
              {dsChiTiet.map((ct) => (
                <tr key={ct.maCTDT} className="border-t">
                  <td className="px-4 py-2">{ct.maThuoc}</td>
                  <td className="px-4 py-2">{ct.soLuong}</td>
                  <td className="px-4 py-2">{ct.lieuDung}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default KeDonThuocPage;
