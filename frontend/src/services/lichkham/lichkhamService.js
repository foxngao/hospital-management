import axios from "../../api/axiosClient";

export const getAllLich = () => axios.get("/lichkham");
export const createLich = (data) => axios.post("/lichkham", data);
export const updateLich = (id, data) => axios.put(`/lichkham/${id}`, data); // ✅ Dòng này là bắt buộc
export const deleteLich = (id) => axios.delete(`/lichkham/${id}`);
