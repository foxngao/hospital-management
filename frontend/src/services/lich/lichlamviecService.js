import axios from "../../api/axiosClient";

export const getLichByBS = (maNS) => axios.get(`/lichlamviec/bacsi/${maNS}`);
export const createLich = (data) => axios.post("/lichlamviec", data);
export const updateLich = (id, data) => axios.put(`/lichlamviec/${id}`, data);
export const deleteLich = (id) => axios.delete(`/lichlamviec/${id}`);
