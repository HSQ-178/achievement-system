import axios from "../axiosApi";

const baseURL = '/release'

export default {
    /**
     * 将发布签到内容存入到数据库中
     * @param {Object} contentData 
     * @returns 
     */
    saveReleaseContent: (contentData) => {
        return axios({
            method: "POST",
            url: `${baseURL}/saveReleaseContent`,
            data: contentData
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
            url: `${baseURL}/findNotSignInBYConditions`,
            params: {
                teacherId: data.teacherId,
                grade: data.grade,
                college: data.college,
                major: data.major,
                course: data.course,
                createTime: data.createTime
            }
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
            url: `${baseURL}/findSignInOrAbsenceByConditions`,
            params: {
                teacherId: data.teacherId,
                grade: data.grade,
                college: data.college,
                major: data.major,
                course: data.course,
                createTime: data.createTime,
                state: data.state
            }
        })
    },
}