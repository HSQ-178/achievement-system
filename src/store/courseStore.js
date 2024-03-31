import { defineStore } from "pinia";

export const useCourseStore = defineStore("course", {
  //持久化
  persist: true,

  state: () => ({
    courses: {
      id: "",
      grade: "",
      college: "",
      major: "",
      course: "",
      class: "",
      startTime: "",
      endTime: ""
    },
  }),

  actions: {
    setStudent(courses) {
      this.courses = courses;
    },

    updated(courses) {
      for (let key in courses) {
        this.courses[key] = courses[key];
      }
    },

    clear() {
      this.courses = {
        id: "",
        grade: "",
        college: "",
        major: "",
        course: "",
        startTime: "",
      };
    },
  },
});
