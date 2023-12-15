import { defineStore } from "pinia";

export const useCourseStore = defineStore('course', {
    //持久化
    persist: true,

    state: () => ({
        courses: {
            grade: "",
            college: "",
            major: "",
            course: "",
            startTime: ""
        }
    }),

    actions: {
        setStudent(courses) {
            this.courses = courses
        },

        updated(courses) {
            for(let key in courses) {
                this.courses[key] = courses[key]
            }
        },

        clear() {
            this.courses = {
                grade: "",
                college: "",
                major: "",
                course: "",
                startTime: ""
            }
        }
    }
})