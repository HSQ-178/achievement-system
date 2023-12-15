<template>
  <div class="ml-10">
    <!-- 查询栏 -->
    <div class="pl-60 w-320 h-45 border-2 bg-white hover:shadow-md">
      <el-form class="grid grid-cols-2 p-5">
        <el-form-item label="年级：">
          <el-input
            v-model="courseStore.courses.grade"
            class="w-40%"
            placeholder="请输入年级"
          />
        </el-form-item>
        <el-form-item label="学院：">
          <el-input
            v-model="courseStore.courses.college"
            class="w-40%"
            placeholder="请输入学院"
          />
        </el-form-item>
        <el-form-item label="专业：">
          <el-input
            v-model="courseStore.courses.major"
            class="w-40%"
            placeholder="请输入专业"
          />
        </el-form-item>
        <el-form-item label="课程：">
          <el-input
            v-model="courseStore.courses.course"
            class="w-40%"
            placeholder="请输入课程"
          />
        </el-form-item>
      </el-form>
      <div class="absolute left-240 top-50">
        <el-button
          @click="releaseClick"
          class="text-white bg-indigo shadow-sm hover:bg-indigo-5 hover:text-white"
        >
          发布签到
        </el-button>
      </div>
    </div>

    <!-- 签到情况栏 -->
    <div class="mt-5 border-2 bg-white shadow-sm hover:shadow-md">
      <div class="w-150 h-100 ml-85" id="echarts"></div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../../store/userStore";
import { useCourseStore } from "../../store/courseStore";
import attendanceManagementApi from "../../api/mothod/AttendanceManagement";
import releaseContentApi from "../../api/mothod/ReleaseContent";
import formateDate from "../../utils/formateDate";
import formateTime from "../../utils/formateTime";
import * as echarts from "echarts";
import { ref, onMounted, computed, watchEffect } from "vue";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const courseStore = useCourseStore();

//获取所有课程，用当前时间，星期数与所有课程的时间，星期数作比较
const findAll = async () => {
  const { data } = await attendanceManagementApi.findAll(userStore.users.teacherId);

  if (data.code === 200) {
    data.data.forEach((item, index) => {
      //将时间格式化为"hh:mm:ss"
      const startTime = formateTime(new Date(item.startTime));
      const endTime = formateTime(new Date(item.endTime));
      const courseWeek = new Date(item.startTime).getDay(); //获取星期数
      const courseYear = new Date(item.startTime).getFullYear(); //获取年份

      //获取当前时间, 将当前时间格式化为"hh:mm:ss"
      const dateTime = formateTime(new Date());
      const dateWeek = new Date().getDay(); //获取当前星期数
      const dateYear = new Date().getFullYear(); //获取当前年份

      //判断
      if (courseYear === dateYear) {
        if (courseWeek === dateWeek) {
          if (startTime <= dateTime && dateTime <= endTime) {
            courseStore.courses.grade = item.grade;
            courseStore.courses.college = item.college;
            courseStore.courses.major = item.major;
            courseStore.courses.course = item.course;
            courseStore.courses.startTime = item.startTime;
            console.log(`现在${item.course}课`);
          }
        }
      }
    });
  }
};

//发布签到
const releaseClick = async () => {
  const { data } = await releaseContentApi.saveReleaseContent({
    grade: courseStore.courses.grade,
    college: courseStore.courses.college,
    major: courseStore.courses.major,
    course: courseStore.courses.course,
    content: "开始位置签到",
    teacherId: userStore.users.teacherId,
  });
  // console.log(data.data);
  if (data.code === 200) {
    ElMessage.info("发布成功!");
  } else {
    ElMessage.info("发布失败！");
  }
};

//考勤各情况总数
const attendanceCount = ref({
  notSignInCount: 0,
  signInCount: 0,
  absenceCount: 0,
});

//获取考勤各情况信息
const attendanceConditions = async () => {
  //未签到情况
  const notSignIn = await attendanceManagementApi.findNotSignInBYConditions({
    teacherId: userStore.users.teacherId,
    grade: courseStore.courses.grade,
    college: courseStore.courses.college,
    major: courseStore.courses.major,
    course: courseStore.courses.course,
    createTime: formateDate(new Date()),
  });
  if (notSignIn.data.code === 200) {
    attendanceCount.value.notSignInCount = notSignIn.data.data.length;
  }
  //签到情况
  const signIn = await attendanceManagementApi.findSignInOrAbsenceByConditions({
    teacherId: userStore.users.teacherId,
    grade: courseStore.courses.grade,
    college: courseStore.courses.college,
    major: courseStore.courses.major,
    course: courseStore.courses.course,
    createTime: formateDate(new Date()),
    state: 1,
  });
  if (signIn.data.code === 200) {
    attendanceCount.value.signInCount = signIn.data.data.length;
  }

  //缺勤情况
  const absence = await attendanceManagementApi.findSignInOrAbsenceByConditions({
    teacherId: userStore.users.teacherId,
    grade: courseStore.courses.grade,
    college: courseStore.courses.college,
    major: courseStore.courses.major,
    course: courseStore.courses.course,
    createTime: formateDate(new Date()),
    state: 0,
  });
  if (absence.data.code === 200) {
    attendanceCount.value.absenceCount = absence.data.data.length;
  }
};

//计算属性饼状图数据
const data = computed(() => ({
  title: "考勤情况",
  names: ["未签到", "签到", "缺勤"],
  values: [
    { name: "未签到", value: attendanceCount.value.notSignInCount },
    { name: "签到", value: attendanceCount.value.signInCount },
    { name: "缺勤", value: attendanceCount.value.absenceCount },
  ],
}));

//侦听
watchEffect(() => {
  attendanceConditions();
});

//饼状图
const drawPie = () => {
  // 用Promise方法让dom加载后再去获取dom,否则dom还没加载的时候，echarts.init() 就已经开始执行就会报错
  let newPromise = new Promise((resolve) => {
    resolve();
  });

  newPromise.then(() => {
    //如果存在DOM，就会报存在警告，删除DOM
    echarts.dispose(document.getElementById("echarts"));
    
    //创建一张饼图表
    let charts = echarts.init(document.getElementById("echarts"));
    charts.setOption({
      title: {
        text: "考勤情况",
        left: "center",
        top: 20,
      },
      color: ["#fdba74", "#86efac", "#fca5a5"],
      // 鼠标划过时饼状图上显示的数据
      tooltip: {
        trigger: "item",
        formatter: "{a} <br /> {b} :{c} ({d}%)",
      },
      //图例
      legend: {
        top: 50,
        left: 5,
        data: data.value.names,
        orient: "vertical", //名字显示的位置，默认横向
      },
      series: [
        {
          name: data.value.title,
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          selectedMode: "single",
          data: data.value.values,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgda(0, 0, 0, 0.5)",
            },
          },
        },
      ],
      label: {
        show: true,
        formatter: "{b}: {d}%",
        fontSize: "18px",
      },
    });
    window.addEventListener("resize", function () {
      charts.resize();
    });
  });
};

watchEffect(() => {
  drawPie(data.value.values);
});

onMounted(() => {
  findAll();
  drawPie();
  attendanceConditions();
});
</script>
