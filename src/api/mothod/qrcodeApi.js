import axios from "../axiosApi";

const baseURL = "/qrcode"

export default {
    //保存二维码信息
    qrcodeSave: (data) => {
        return axios({
            method: "POST",
            url: `${baseURL}/qrcodeSave`,
            data: data
        })
    },

    //显示二维码
    toQrcode: (qrcodeData) => {
        return axios({
            method: "GET",
            url: `${baseURL}/toQrcode`,
            data: {
                teacherId: qrcodeData.teacherId,
                major: qrcodeData.major,
                course: qrcodeData.course,
                qrcodeCreateTime: qrcodeData.qrcodeCreateTime
            }
        })
    }
}