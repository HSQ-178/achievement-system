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
    }
}