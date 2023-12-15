import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/index/index.vue'
import HomePage from '../views/homePage/HomePage.vue'
import StudentManagement from '../views/teachAchievement/student/StudentManagement.vue'
import CourseManagement from '../views/teachAchievement/course/CourseManagement.vue'
import CollSignIn from '../views/attendanceManagement/CollSignIn.vue'
import AddressSignIn from '../views/attendanceManagement/AddressSignIn.vue'
import Register from '../views/registerAndLogin/Register.vue'
import Login from '../views/registerAndLogin/Login.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Index,
            children: [
                { path: '/homePage', component: HomePage },
                { path: '/studentManagement', component: StudentManagement },
                { path: '/courseManagement', component: CourseManagement },
                { path: '/collSignIn', component: CollSignIn },
                { path: '/addressSignIn', component: AddressSignIn }
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        }
    ]
})

export default router