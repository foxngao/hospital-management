import React, { useEffect, useState } from "react";
import HoaDonList from "../../../components/hoadon/HoaDonList";
import TaoHoaDonForm from "../../../components/hoadon/TaoHoaDonForm";
import ThanhToanForm from "../../../components/hoadon/ThanhToanForm";
import GioHangBenhNhan from "../../../components/hoadon/GioHangBenhNhan";
import ModalThemDichVu from "../../../components/hoadon/ModalThemDichVu";
import { getAllHoaDon } from "../../../services/hoadon/hoadonService";

const QuanLyHoaDonPage = () => {
  const [hoaDons, setHoaDons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHD, setSelectedHD] = useState("");

  const loadHoaDons = async () => {
    const res = await getAllHoaDon();
    setHoaDons(res.data.data || []);
  };

  useEffect(() => {
    loadHoaDons();
  }, []);

  const openModal = (maHD) => {
    setSelectedHD(maHD);
    setModalOpen(true);
  };

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold text-blue-800">🧾 Quản lý hóa đơn</h2>

      <HoaDonList data={hoaDons} onChiTietClick={openModal} />

      <TaoHoaDonForm onSuccess={loadHoaDons} />

      <ThanhToanForm onSuccess={loadHoaDons} />

      <GioHangBenhNhan />

      {modalOpen && (
        <ModalThemDichVu maHD={selectedHD} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default QuanLyHoaDonPage;
