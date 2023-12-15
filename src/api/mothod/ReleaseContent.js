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
    }
}