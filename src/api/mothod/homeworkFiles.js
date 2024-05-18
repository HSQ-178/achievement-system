import axios from "../axiosApi";

export const create = (data) => axios.post("/homeworkFiles/create", data);
