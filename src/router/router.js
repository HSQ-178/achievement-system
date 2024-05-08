import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/index/index.vue";
import HomePage from "../views/homePage/HomePage.vue";
import StudentManagement from "../views/teachAchievement/student/StudentManagement.vue";
import CourseManagement from "../views/teachAchievement/course/CourseManagement.vue";
import CollSignIn from "../views/attendanceManagement/CollSignIn.vue";
import PostSignIn from "../views/attendanceManagement/PostSignIn.vue"
import Authcode from '../views/attendanceManagement/Authcode.vue'
import QrCode from '../views/attendanceManagement/qrCode.vue'
import Register from "../views/registerAndLogin/Register.vue";
import Login from "../views/registerAndLogin/Login.vue";
import ToQrcodeView from "../views/attendanceManagement/components/ToQrcodeView.vue";

import { useUserStore } from "../store/userStore.js"
import { ElMessage } from "element-plus";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Index,
      children: [
        { path: "/homePage", component: HomePage },
        { path: "/studentManagement", component: StudentManagement },
        { path: "/courseManagement", component: CourseManagement },
        { path: "/collSignIn", component: CollSignIn },
        { path: "/postSignIn", component: PostSignIn},
        { path: "/authcode", component: Authcode },
        { path: "/qrCode", component: QrCode}
      ],
      meta: {
        needToken: true, //给路由加一个变量，用于判断是否需要登录
      },
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/toQrcodeView",
      component: ToQrcodeView
    }
  ],
});

// router钩子函数
router.beforeEach((to, from) => {
    const userStore = useUserStore();

    if (to.meta?.needToken && userStore.users.token == ""){
        //如果有message，可以以下
        ElMessage.warning("请先登录")

        setTimeout(() => {
            router.push("login")
        },1000)
    }
})

export default router;
