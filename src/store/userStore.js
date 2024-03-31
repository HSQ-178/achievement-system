import { defineStore } from "pinia";

export const useUserStore = defineStore("use", {
  //持久化
  persist: true,

  state: () => ({
    users: {
      teacher: {
        college: "",
        major: "",
        teacherCard: "",
        name: "",
        phone: "",
        password: "",
      },
      token: "",
    },
  }),

  actions: {
    setTeacher(users) {
      this.users = users;
    },

    updated(users) {
      for (let key in users) {
        this.users[key] = users[key];
      }
    },

    clear() {
      this.teacher = {
        college: "",
        major: "",
        teacherCard: "",
        name: "",
        phone: "",
        password: "",
      };
    },
  },
});
