import { defineStore } from "pinia";

export const useAddressStore = defineStore("address", {
  //持久化
  persist: true,

  state: () => ({
    formateTime: {
      minutes: 0, //设置时长
      timeInSeconds: 0, //倒计时
    },
  }),

  actions: {
    setFormateTime(formateTime) {
      this.formateTime = formateTime;
    },

    updated(formateTime) {
      for (let i in formateTime) {
        this.formateTime[i] = formateTime[i];
      }
    },

    clear() {
      this.formateTime = {
        minutes: 0,
        timeInSeconds: 0,
      };
    },
  },
});
