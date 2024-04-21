import axios from "../axiosApi";

const baseURL = "/qrcode"

export default {
    //保存二维码信息
    setQrcode: (data) => {
        return axios({
            method: "POST",
            url: `${baseURL}/setQrcode`,
            data: data
        })
    },

    //显示二维码
    getQrcode: (qrcodeData) => {
        return axios({
            method: "GET",
            url: `${baseURL}/getQrcode`,
            data: qrcodeData
        })
    }
}