<template>
  <div>
    <!-- 查询栏 -->
    <div class="pl-60 h-70 border-2 bg-white hover:shadow-md">
      <el-form class="grid grid-cols-2 p-5">
        <el-form-item label-width="80" label="年级：">
          <el-input
            v-model="courseStore.courses.grade"
            disabled
            class="w-40%"
            placeholder="请输入年级"
          />
        </el-form-item>
        <el-form-item label-width="80" label="学院：">
          <el-input
            v-model="courseStore.courses.college"
            disabled
            class="w-40%"
            placeholder="请输入学院"
          />
        </el-form-item>
        <el-form-item label-width="80" label="专业：">
          <el-input
            v-model="courseStore.courses.major"
            disabled
            class="w-40%"
            placeholder="请输入专业"
          />
        </el-form-item>
        <el-form-item label-width="80" label="课程：">
          <el-input
            v-model="courseStore.courses.course"
            disabled
            class="w-40%"
            placeholder="请输入课程"
          />
        </el-form-item>
        <el-form-item label="二维码时长：">
          <div class="h-10 flex">
            <el-input-number
              v-model="formData.qrcodeDuration"
              :min="1"
              :max="10"
            />
            <p class="ml-2 mt-1 text-4 text-gray-6">分钟</p>
          </div>
        </el-form-item>
        <el-form-item label="二维码刷新频率：">
          <div class="h-10 flex">
            <el-input-number
              v-model="formData.qrcodeFrequency"
              :min="5"
              :max="60"
            />
            <p class="ml-2 mt-1 text-4 text-gray-6">秒/次</p>
          </div>
        </el-form-item>
      </el-form>

      <div class="absolute left-230 top-70">
        <el-button
          @click="releaseClick"
          :disabled="qrcodeStore.qrcodeDuration > 0"
          class="mr-10 text-white bg-indigo shadow-sm hover:bg-indigo-5 hover:text-white"
        >
          发布签到
          <div id="countDownTime" v-if="qrcodeStore.qrcodeDuration > 0">
            ({{ timeInSeconds }})
          </div>
        </el-button>
        <el-button
          @click="ToQrcodeView"
          class="color-white bg-red hover:bg-red-5 hover:color-white"
        >
          查看二维码
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCourseStore } from "../../store/courseStore";
import { useqrcodeStore } from "../../store/qrcodeStore";
import { useUserStore } from "../../store/userStore";
import { findAllCourse } from "./utils/findCourseAll";
import { formateDateTime } from "../../utils/formateDate";
import qrcodeApi from "../../api/mothod/qrcodeApi";
import { ref, onMounted, computed } from "vue";
import router from "../../router/router";

const courseStore = useCourseStore();
const qrcodeStore = useqrcodeStore();
const userStore = useUserStore();

const formData = ref({
  qrcodeDuration: 1, //二维码有效时间
  qrcodeFrequency: 5, //二维码刷新频率
});
const qrcodeId = ref("");

const timeInSeconds = computed(() => {
  return qrcodeStore.qrcodeDuration > 0
    ? qrcodeStore.qrcodeDuration
    : formData.value.qrcodeDuration * 60;
}); //将时长换算成秒

//发布
const releaseClick = async () => {
  const { data } = await qrcodeApi.setQrcode({
    id: userStore.users.teacher.teacherCard,
    content: JSON.stringify({
      teacherCard: userStore.users.teacher.teacherCard,
      grade: courseStore.courses.grade,
      college: courseStore.courses.college,
      major: courseStore.courses.major,
      courseId: courseStore.courses.id,
    }),
    qrcodeDuration: formData.value.qrcodeDuration, //二维码有效时长
    qrcodeFrequency: formData.value.qrcodeFrequency, //二维码刷新频率
  });
  console.log(data);
  if (data.code === 200) {
    ElMessage.success("发布成功!");

    const expirationTime = formateDateTime(new Date(data.data));
    qrcodeStore.setQrcode(
      qrcodeId.value,
      timeInSeconds.value,
      formData.value.qrcodeFrequency,
      expirationTime
    );

    console.log(expirationTime);
    qrcodeStore.qrcodeCountDownAction();
  } else {
    ElMessage.error(data.msg);
  }
};

//查看二维码
const ToQrcodeView = () => {
  router.push("/toQrcodeView");
};

onMounted(async () => {
  findAllCourse();
});
</script>
