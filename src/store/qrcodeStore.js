
import { defineStore } from "pinia";

export const useqrcodeStore = defineStore("qrcode", {
  persist: true,

  state: () => ({
    qrcodeId: "",
    qrcodeDuration: 0, //二维码有效时长
    frequency: 0, //二维码刷新频率
    expiration: 0 //二维码过期时间
  }),

  actions: {
    setQrcode(qrcodeId, qrcodeDuration, frequency) {
      this.qrcodeId = qrcodeId
      this.qrcodeDuration = qrcodeDuration;
      this.frequency = frequency
    },

    // updated(qrcodeData) {
    //   for (let key in qrcodeData) {
    //     this.qrcodeData[key] = qrcodeData[key];
    //   }
    // },

    clear() {
      this.qrcodeId = "",
      this.qrcodeDuration = 0,
      this.frequency = 0
    },

    //计时器
    qrcodeCountDownAction() {
      const timer = setInterval(() => {
        this.qrcodeDuration--;

        if (this.qrcodeDuration <= 0) {
          console.log("清空");
          this.clear();
          clearInterval(timer);
        }
      }, 1000);
    },
  },
});
