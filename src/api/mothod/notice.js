import { data } from 'jquery'
import axios from '../axiosApi'

const baseURL = "/redis"

export default {
    setRedis: (data) => {
        return axios({
            method: "POST",
            url: `${baseURL}/setRedis`,
            data: data
        })
    },

    getNotSignInStudentList: (data) => {
        return axios({
            method: "POST",
            url: "record/getNotSignInList",
            data: data
        })
    },

    getSignInAndAbsenceList: (data) => {
        return axios({
            method: "POST",
            url: "record/getSignInAndAbsenceList",
            data: data
        })
    }
}