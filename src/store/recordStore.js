import { defineStore } from "pinia";

export const useRecordStore = defineStore('record', {
    //持久化
    persist: true,

    state: () => ({
        students: []
    }),

    actions: {
        setStudent(students) {
            this.students = students
        },

        updated(students) {
            for(let key in students) {
                this.students[key] = students[key]
            }
        },

        clear() {
            this.students = []
        }
    }
})