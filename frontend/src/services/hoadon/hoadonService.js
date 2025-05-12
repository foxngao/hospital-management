import axios from "../../api/axiosClient";

// ---------------- HOÁ ĐƠN ----------------
export const getAllHoaDon = () => axios.get("/hoadon");
export const createHoaDon = (data) => axios.post("/hoadon", data);

// ---------------- CHI TIẾT ----------------
export const addChiTietHD = (data) => axios.post("/hoadon/chitiet", data);

// ---------------- THANH TOÁN ----------------
export const createThanhToan = (data) => axios.post("/hoadon/thanhtoan", data);

// ---------------- GIỎ HÀNG ----------------
export const getGioHang = (maBN) => axios.get(`/hoadon/giohang/${maBN}`);
export const addToGioHang = (data) => axios.post("/hoadon/giohang", data);
