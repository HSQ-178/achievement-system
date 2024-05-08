<template>
  <div>
    <!-- 查询栏 -->
    <div class="pl-60 h-70 border-2 bg-white hover:shadow-md">
      <el-form class="grid grid-cols-2 p-5 mt-10">
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
      </el-form>

      <div class="absolute left-250 top-70">
        <el-button
          @click="releaseClick"
          class="mr-10 text-white bg-indigo shadow-sm hover:bg-indigo-5 hover:text-white"
        >
          发布签到
        </el-button>
      </div>
    </div>
  </div>

  <!-- 弹窗 -->
  <div>
    <n-modal
      :mask-closable="false"
      v-model:show="showModalRef"
      preset="dialog"
      title="签到码"
      positive-text="结束签到"
      @positive-click="finishSignIn"
    >
      {{ arr }}
    </n-modal>
  </div>
</template>

<script setup>
import authcodeApi from "../../api/mothod/authcode";
import { useCourseStore } from "../../store/courseStore";
import { useUserStore } from "../../store/userStore";
import { findAllCourse } from './utils/findCourseAll'
import { ref, onMounted } from "vue";
import { createDiscreteApi } from "naive-ui";

const { message } = createDiscreteApi(["message"]);
const courseStore = useCourseStore();
const userStore = useUserStore();
const arr = ref([]);
const random_number = ref(null);
const count = ref(0);
const showModalRef = ref(false);

//发布签到码
const releaseClick = async () => {
  random_number.value = parseInt(Math.random() * 100000);

  for (let i = 0; i < 5; i++) {
    let res = random_number.value % 10;
    random_number.value = parseInt(random_number.value / 10);
    arr.value.push(res);
    count.value++;
  }

  const authcode = ref(arr.value.join(''))
  console.log(parseInt(authcode.value));

  const { data } = await authcodeApi.addAuthcode({
    teacherCard: userStore.users.teacher.teacherCard,
    grade: courseStore.courses.grade,
    college: courseStore.courses.college,
    major: courseStore.courses.major,
    class: courseStore.courses.class,
    courseId: courseStore.courses.id,
    authcode: parseInt(authcode.value),
  });
  console.log(data);

  if (data.code === 200) {
    message.success("发布成功");
    handleShowModal();
    console.log(arr.value);
  }
};

//判断是否有签到码，有则弹出弹窗
const handleShowModal = () => {
  if (arr.value != null) {
    showModalRef.value = true;
  }
};

//结束签到
function finishSignIn() {
  message.error("结束签到");
  random_number.value = null;
  count.value = 0;
  arr.value = [];
}

onMounted(() => {
  findAllCourse();
});

</script>
