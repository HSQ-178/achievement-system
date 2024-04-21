import axios from '../axiosApi'

const baseURL = "/record"

export default {
    //获取未签到学生
    getNotSignInStudentList: (data) => {
        return axios({
            method: "POST",
            url: `${baseURL}/getNotSignInList`,
            data: data
        })
    },

    //获取签到或缺勤学生
    getSignInAndAbsenceList: (data) => {
        return axios({
            method: "POST",
            url: `${baseURL}/getSignInAndAbsenceList`,
            data: data
        })
    },

    //添加签到或缺勤记录
    addRecords: (data) => {
        return axios({
            method: "POST",
            url: `${baseURL}/addRecords`,
            data: data
        })
    },

    //删除记录，签到 => 未签到，缺勤 => 未签到
    deleteRecords: (data) => {
        return axios({
            method: "POST",
            url: `${baseURL}/deleteRecords`,
            data: data
        })
    },

    //更新记录，签到 => 缺勤，缺勤 => 签到
    updateRecords: (data) => {
        return axios({
            method: "POST",
            url: `${baseURL}/updateRecords`,
            data: data
        })
    }
}