import { defineStore } from "pinia";

export const useAddressStore = defineStore("address", {
  //持久化
  persist: true,

  state: () => ({
    timeInSeconds: 0, //倒计时
  }),

  actions: {
    setTimeInSeconds(timeInSeconds) {
      this.timeInSeconds = timeInSeconds;
    },

    clear() {
      this.timeInSeconds = 0;
    },

    //计时器
    countDownAction() {
      const timer = setInterval(() => {
        this.timeInSeconds--;

        if (this.timeInSeconds <= 0) {
          console.log("清空");
          this.clear();
          clearInterval(timer);
        }
      }, 1000);
    },
  },
});
