import axios from "../axiosApi";

const baseURL = "/course"

export default {
    //获取该老师所有课程
    getAllCourse: (data) => {
        return axios({
            method: "POST",
            url: `${baseURL}/getAllCourse`,
            data: data
        })
    }
}