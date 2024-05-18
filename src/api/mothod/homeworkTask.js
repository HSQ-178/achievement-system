import axios from "../axiosApi";

export const create = (data) => axios.post("/homeworkTask/create", data);
export const list = (data) => axios.post("/homeworkTask/list", data);
