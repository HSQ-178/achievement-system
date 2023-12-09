import axios from '../axiosApi'

const baseURL = "/attendance"

export default {
    /**
     * 获取课程表所有信息
     * @returns 返回课程信息数组
     */
    findAll: (teacherId) => {
        return axios({
            method: "GET",
            url: `${baseURL}/findAll?teacherId=${teacherId}`
        })
    },

    /**
     * 查询未签到的学生信息
     * @param {Object} notSignInConditions 
     * @returns 返回未签到学生信息数组
     */
    findNotSignInBYConditions: (data) => {
        return axios({
            method: "GET",
            url: `${baseURL}/findNotSignInBYConditions?teacherId=${data.teacherId}&grade=${data.grade}&college=${data.college}&major=${data.major}&course=${data.course}&createTime=${data.createTime}`
        })
    },

    /**
     * 查询签到或缺勤的学生信息
     * @param {Object} notSignInConditions 
     * @returns 返回签到或缺勤学生信息数组
     */
    findSignInOrAbsenceByConditions: (data) => {
        return axios({
            method: "GET",
            url: `${baseURL}/findSignInOrAbsenceByConditions?teacherId=${data.teacherId}&grade=${data.grade}&college=${data.college}&major=${data.major}&course=${data.course}&createTime=${data.createTime}&state=${data.state}`
        })
    },

    /**
     * 添加已签到的学生
     * @param {Object} rowData 
     * @returns 
     */
    notSinInToSignInSave: (rowData) => {
        return axios({
            method: "POST",
            url: `${baseURL}/notSinInToSignInSave`,
            data: rowData
        })
    },

    /**
     * 从考勤记录表中删除已签到的同学，将该同学记为未签到
     * @param {Object} deleteConditions 
     * @returns 
     */
    deleteSignInToNotSignInByConditions: (deleteConditions) => {
        return axios({
            method: "GET",
            url: `${baseURL}/deleteSignInToNotSignInByConditions?grade=${deleteConditions.grade}&college=${deleteConditions.college}&major=${deleteConditions.major}&course=${deleteConditions.course}&classes=${deleteConditions.classes}&studentId=${deleteConditions.studentId}&studentName=${deleteConditions.studentName}&createTime=${deleteConditions.createTime}&state=${deleteConditions.state}`
        })
    },

    updateStateByConditions: (updateState) => {
        return axios({
            method: "GET",
            url: `${baseURL}/updateStateByConditions?state=${updateState.state}&grade=${updateState.grade}&college=${updateState.college}&major=${updateState.major}&course=${updateState.course}&classes=${updateState.classes}&studentId=${updateState.studentId}&studentName=${updateState.studentName}&createTime=${updateState.createTime}`
        })
    }
}