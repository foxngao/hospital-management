import axios from "../../api/axiosClient";

export const getHoSoByBenhNhan = (maBN) => axios.get(`/hsba/benhnhan/${maBN}`);
