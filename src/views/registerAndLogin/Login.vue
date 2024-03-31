<template>
  <div
    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 p-5 bg-white rounded-5 shadow-sm hover:shadow-md"
  >
    <div>
      <p class="mt-10 text-3xl text-center">请登录</p>
      <div class="grid place-items-center p-5">
        <img class="w-30 h-30 rounded-full" src="../../assets/微信头像.jpg" alt="" />
        <el-form class="w-60 mt-10" :rules="rules">
          <el-form-item label="教师编号：">
            <el-input v-model="loginList.teacherCard" placeholder="请输入教师编号" />
          </el-form-item>
          <el-form-item label-width="80" label="密 码：">
            <el-input
              type="password"
              v-model="loginList.password"
              class="ml-1"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              @click="loginClick"
              class="w-30 h-10 ml-18 mt-3 text-xl text-white bg-purple-4"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import teachersApi from "../../api/mothod/teachers";
import md5 from "js-md5";
import router from "../../router/router";
import { useUserStore } from "../../store/userStore";
import { ref } from "vue";
import { ElMessage } from "element-plus";

const userStore = useUserStore();

const loginList = ref({
  teacherCard: "",
  password: "",
});

//正则表达
const rules = {
  teacherCard: [
    {
      required: true,
      message: "请输入正确的教师编号",
      trigger: "blur",
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

//登录
const loginClick = async () => {
  if (loginList.value.teacherCard != "" && loginList.value.password != "") {
    const { data } = await teachersApi.login({
      teacherCard: loginList.value.teacherCard,
      password: md5(loginList.value.password),
    });
    if (data.code === 200) {
      userStore.setTeacher(data.data);
      ElMessage.success("登录成功");

      setTimeout(() => router.push("/"), 1000);
    }else{
        ElMessage.error(data.msg);
    }
  }
};
</script>
