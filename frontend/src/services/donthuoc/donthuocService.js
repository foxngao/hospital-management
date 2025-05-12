import axios from "../../api/axiosClient";

export const getDonThuocByPK = (maPK) => axios.get(`/donthuoc?maPK=${maPK}`);
export const createDonThuoc = (data) => axios.post("/donthuoc", data);
export const deleteChiTietDonThuoc = (id) => axios.delete(`/donthuoc/${id}`);