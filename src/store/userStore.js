import { defineStore } from "pinia";

export const useUserStore = defineStore('use', {
    //持久化
    persist: true,

    state: () => ({
        users: {
            teacherId: "",
            teacherName: "",
            phone: "",
            password: "",
            token: ""
        }
    }),

    actions: {
        setTeacher(users) {
            this.users = users
        },

        updated(users) {
            for(let key in users) {
                this.users[key] = users[key]
            }
        },

        clear() {
            this.users = {
                teacherId: "",
                teacherName: "",
                phone: "",
                password: ""
            }
        }
    }
})