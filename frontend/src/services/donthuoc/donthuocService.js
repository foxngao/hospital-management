// src/services/donthuoc/donthuocService.js
import axios from "../../api/axiosClient";

// Tạo đơn thuốc mới (chỉ cần maHSBA, maBS)
export const createDonThuoc = (data) => axios.post("/donthuoc", data);

// Thêm thuốc vào đơn
export const addThuocToDon = (data) => axios.post("/donthuoc/chitiet", data);

// Lấy chi tiết đơn thuốc theo mã đơn
export const getChiTietDonThuoc = (maDT) => axios.get(`/donthuoc/chitiet/${maDT}`);

export const getAllThuoc = () => axios.get("/thuoc");

