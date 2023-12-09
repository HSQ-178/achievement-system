import axios from '../axiosApi'

const baseURL = "/teacher"

export default {
    /**
     * 将注册的所有信息存入数据库
     * @param {Object} data  注册的所有信息
     * @returns 
     */
    register: (teachers) => {
        return axios({
            method: "POST",
            url: `${baseURL}/register`,
            data: teachers
        })
    },

    //登录
    login: (teachers) => {
        return axios({
            method: "POST",
            url: `${baseURL}/login`,
            data: teachers
        })
    }
}