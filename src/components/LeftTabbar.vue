<template>
  <div>
    <div>
      <el-menu
        :default-active="activeIndex"
        class="w-70 h-245 shadow-md"
        mode="vertical"
      >
        <div class="flex p-4 border border-b">
          <div>
            <img class="w-15 h-15 rounded-full" src="../assets/微信头像.jpg" />
          </div>
          <div class="ml-4 mt-2">
            <div class="text-4.3">{{ userStore.users.teacher.name }}</div>
            <div class="text-3.5 text-gray-4">
              {{ userStore.users.teacher.teacherCard }}
            </div>
          </div>
        </div>
        <el-menu-item index="1" @click="homePageHandle('1')">
          <el-icon><House /></el-icon>
          首页
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Reading /></el-icon>
            教学管理
          </template>
          <el-menu-item
            @click="teachHandle(item.index)"
            v-for="(item, index) in teachList"
            :key="index"
            :index="item.index"
          >
            {{ item.title }}
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><MapLocation /></el-icon>
            考勤管理
          </template>
          <el-menu-item
            @click="attendanceHandle(item.index)"
            :index="item.index"
            v-for="(item, index) in attendanceList"
            :key="index"
          >
            {{ item.title }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4" @click="$router.push('/homework')">
          <el-icon><Memo /></el-icon>
          作业管理
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/userStore";
import router from "../router/router";
import { ref, onMounted } from "vue";
import { House, Reading, MapLocation, Memo } from "@element-plus/icons-vue";

const activeIndex = ref("1");

const userStore = useUserStore();

//教学管理信息
const teachList = ref([
  { index: "2-1", title: "学生管理", path: "/studentManagement" },
  { index: "2-2", title: "课程管理", path: "/courseManagement" },
]);

//考勤管理信息
const attendanceList = ref([
  { index: "3-1", title: "点名签到", path: "/collSignIn" },
  { index: "3-2", title: "发布签到", path: "/postSignIn" },
  { index: "3-3", title: "签到码签到", path: "/authcode" },
  { index: "3-4", title: "二维码签到", path: "/qrCode" },
]);

//点击首页，右侧则出现相应页面
const homePageHandle = (activeIndex) => {
  switch (true) {
    case activeIndex === "1":
      router.push("/homePage");
  }
};

//点击教学管理，右侧则出现相应页面
const teachHandle = (index) => {
  teachList.value.forEach((item) => {
    if (index === item.index) {
      router.push(item.path);
    }
  });
};

//点击考勤管理，右侧则出现相应页面
const attendanceHandle = (index) => {
  attendanceList.value.forEach((item) => {
    if (index === item.index) {
      router.push(item.path);
    }
  });
};

onMounted(() => {
  homePageHandle();
});
</script>
