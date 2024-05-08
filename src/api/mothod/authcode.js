import axios from "../axiosApi";

const baseURL = "/authcode"

export default {
    addAuthcode: (data) => {
        return axios({
            method: "POST",
            url: `${baseURL}/addAuthcode`,
            data: data
        })
    },

    getAuthcode: (data) => {
        return axios({
            method: "POST",
            url: `${baseURL}/getAuthcode`,
            data: data
        })
    }
}