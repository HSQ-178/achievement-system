<template>
  <div class="ml-10">
    <!-- 签到信息栏 -->
    <div class=" bg-white">
      <div class="p-7">
        <el-button
          name="notSignIn"
          @click="notSignInChange"
          class="border-orange-7 text-orange-7 bg-orange-2"
          type="warning"
          plain
          >未签到</el-button
        >
        <el-button
          name="signIn"
          @click="signInChange"
          class="border-green-7 text-green-7 bg-green-2"
          type="success"
          plain
          >签到</el-button
        >
        <el-button
          name="absence"
          @click="absenceChange"
          class="border-red-7 text-red-7 bg-red-2"
          type="danger"
          plain
          >缺勤</el-button
        >
      </div>
      <div class="w-320 mt-1">
        <el-table :data="pageList.pageData" stripe class="border-1 hover:shadow-md">
          <el-table-column prop="grade" sortable label="年级" align="center" />
          <el-table-column prop="college" label="学院" align="center" />
          <el-table-column prop="major" label="专业" align="center" />
          <el-table-column prop="classes" sortable label="班级" align="center" />
          <el-table-column prop="studentId" sortable label="学号" align="center" />
          <el-table-column prop="studentName" label="姓名" align="center" />
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <!-- 未签到 -->
              <div v-if="name === 'notSignIn'">
                <el-button
                  @click="notSinInToSignIn(scope.row)"
                  class="border-green-7 text-green-7 bg-green-2"
                  type="success"
                  :icon="Check"
                  circle
                ></el-button>
                <el-button
                  @click="notSignInToAbsence(scope.row)"
                  class="border-red-7 text-red-7 bg-red-2"
                  type="danger"
                  :icon="Close"
                  circle
                ></el-button>
              </div>

              <!-- 签到 -->
              <div v-else-if="name === 'signIn'">
                <el-button
                  @click="signInToNotSignIn(scope.row)"
                  class="border-orange-7 text-orange-7 bg-orange-2"
                  type="warning"
                  :icon="Warning"
                  circle
                ></el-button>
                <el-button
                  @click="signInToAbsence(scope.row)"
                  class="border-red-7 text-red-7 bg-red-2"
                  type="danger"
                  :icon="Close"
                  circle
                ></el-button>
              </div>

              <!-- 缺勤 -->
              <div v-else-if="name === 'absence'">
                <el-button
                  @click="absenceToSignIn(scope.row)"
                  class="border-green-7 text-green-7 bg-green-2"
                  type="success"
                  :icon="Check"
                  circle
                ></el-button>
                <el-button
                  @click="absenceToNotSignIn(scope.row)"
                  class="border-orange-7 text-orange-7 bg-orange-2"
                  type="warning"
                  :icon="Warning"
                  circle
                ></el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 分页 -->
    <div class="mt-5 absolute right-1/7">
      <el-pagination
        :page-sizes="[10, 20, 30, 40]"
        v-model:currentPage="pageList.currentPage"
        v-model:page-size="pageList.pageSize"
        layout="prev, pager, next"
        :total="pageList.pageTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import attendanceManagementApi from "../../api/mothod/AttendanceManagement";
import { Check, Close, Warning } from "@element-plus/icons-vue";
import { useUserStore } from "../../store/userStore";
import formateTime from "../../utils/formateTime";
import formateDate from "../../utils/formateDate";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

const userStore = useUserStore();

const tableList = ref([]); //表格切换数据
const name = ref(""); //按钮切换显示不同的按钮

//存储当前的课程信息
const courseList = ref({
  grade: "",
  college: "",
  major: "",
  course: "",
  startTime: "",
});

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
            courseList.value.grade = item.grade;
            courseList.value.college = item.college;
            courseList.value.major = item.major;
            courseList.value.course = item.course;
            courseList.value.startTime = item.startTime;
            console.log(`现在${item.course}课`);
          }else {
            courseList.value.grade = ""
            courseList.value.college = ""
            courseList.value.major = ""
            courseList.value.course = ""
            courseList.value.startTime = ""

            ElMessage.info("现在没有课")
          }
        }
      }
    });
  }
};

//未签到
const notSignInChange = async () => {
  const { data } = await attendanceManagementApi.findNotSignInBYConditions({
    teacherId: userStore.users.teacherId,
    grade: courseList.value.grade,
    college: courseList.value.college,
    major: courseList.value.major,
    course: courseList.value.course,
    createTime: formateDate(new Date()),
  });
  // console.log(data.data);

  if (data.code === 200) {
    tableList.value = data.data;
    pageList.value.tableData = data.data;
    pageList.value.pageTotal = data.data.length;

    pageList.value.pageData = queryByPage();
  }
  name.value = "notSignIn";
};

//签到
const signInChange = async() => {
  const { data } = await attendanceManagementApi.findSignInOrAbsenceByConditions({
    teacherId: userStore.users.teacherId,
    grade: courseList.value.grade,
    college: courseList.value.college,
    major: courseList.value.major,
    course: courseList.value.course,
    createTime: formateDate(new Date()),
    state: 1,
  });
  console.log(data.data);

  if (data.code === 200) {
    tableList.value = data.data;
    pageList.value.tableData = data.data;
    pageList.value.pageTotal = data.data.length;

    pageList.value.pageData = queryByPage();
  }
  name.value = "signIn";
}

//缺勤
const absenceChange = async () => {
  const { data } = await attendanceManagementApi.findSignInOrAbsenceByConditions({
    teacherId: userStore.users.teacherId,
    grade: courseList.value.grade,
    college: courseList.value.college,
    major: courseList.value.major,
    course: courseList.value.course,
    createTime: formateDate(new Date()),
    state: 0,
  });
  // console.log(data.data);

  if (data.code === 200) {
    tableList.value = data.data;
    pageList.value.tableData = data.data;
    pageList.value.pageTotal = data.data.length;

    pageList.value.pageData = queryByPage();
  }
  name.value = "absence";
};

//未签到 => 签到
const notSinInToSignIn = async (row) => {
  //当前日期与上课时间进行拼接
  const date = new Date(
    formateDate(new Date()) + " " + formateTime(new Date(courseList.value.startTime))
  ).toISOString();
  // console.log(date);

  const { data } = await attendanceManagementApi.notSinInToSignInSave({
    teacherId: userStore.users.teacherId,
    grade: row.grade,
    college: row.college,
    major: row.major,
    course: courseList.value.course,
    classes: row.classes,
    studentId: row.studentId,
    studentName: row.studentName,
    createTime: date,
    state: 1,
  });

  if (data.code === 200) {
    const index = pageList.value.pageData.indexOf(row);
    if (index > -1) {
      pageList.value.pageData.splice(index, 1);
    }
    ElMessage.info("签到成功！");
  }
};

//未签到 => 缺勤
const notSignInToAbsence = async (row) => {
  //当前日期与上课时间进行拼接
  const date = new Date(
    formateDate(new Date()) + " " + formateTime(new Date(courseList.value.startTime))
  ).toISOString();
  // console.log(date);

  const { data } = await attendanceManagementApi.notSinInToSignInSave({
    teacherId: userStore.users.teacherId,
    grade: row.grade,
    college: row.college,
    major: row.major,
    course: courseList.value.course,
    classes: row.classes,
    studentId: row.studentId,
    studentName: row.studentName,
    createTime: date,
    state: 0,
  });

  if (data.code === 200) {
    const index = pageList.value.pageData.indexOf(row);
    if (index > -1) {
      pageList.value.pageData.splice(index, 1);
    }
    ElMessage.info("该同学缺勤！");
  }
};

//签到 => 未签到
const signInToNotSignIn = async (row) => {
  const { data } = await attendanceManagementApi.deleteSignInToNotSignInByConditions({
    grade: row.grade,
    college: row.college,
    major: row.major,
    course: courseList.value.course,
    classes: row.classes,
    studentId: row.studentId,
    studentName: row.studentName,
    createTime: formateDate(new Date()),
    state: row.state,
  });

    const index = pageList.value.pageData.indexOf(row);
    if (index > -1) {
      pageList.value.pageData.splice(index, 1);
      ElMessage.info("该同学未签到")
    }
};

//签到 => 缺勤
const signInToAbsence = async (row) => {
  const { data } = await attendanceManagementApi.updateStateByConditions({
    state: 0,
    grade: row.grade,
    id: row.id,
    createTime: formateDate(new Date()),
  });

    const index = pageList.value.pageData.indexOf(row);

    if (index > -1) {
      pageList.value.pageData = pageList.value.pageData.filter((item) => item !== row);
      ElMessage.info("该同学缺勤！");
    }
};

//缺勤 => 签到
const absenceToSignIn = async (row) => {
  const { data } = await attendanceManagementApi.updateStateByConditions({
    state: 1,
    id: row.id,
    createTime: formateDate(new Date()),
  });

    const index = pageList.value.pageData.indexOf(row);

    if (index > -1) {
      pageList.value.pageData = pageList.value.pageData.filter((item) => item !== row);
      ElMessage.info("该同学缺勤！");
    }
};

//缺勤 => 未签到
const absenceToNotSignIn = async (row) => {
  const { data } = await attendanceManagementApi.deleteSignInToNotSignInByConditions({
    grade: row.grade,
    college: row.college,
    major: row.major,
    course: courseList.value.course,
    classes: row.classes,
    studentId: row.studentId,
    studentName: row.studentName,
    createTime: formateDate(new Date()),
    state: row.state,
  });

    const index = pageList.value.pageData.indexOf(row);

    if (index > -1) {
      pageList.value.pageData = pageList.value.pageData.filter((item) => item !== row);
      ElMessage.info("该同学未签到！");
    }
};

//分页数据
const pageList = ref({
  tableData: [], // 总的数据
  pageData: [], //每页总数据
  currentPage: 1, // 当前页 默认是第一页
  pageSize: 14, // 每页大小 默认每页14条数据
  pageTotal: 0, // 总数据量 默认为 0
});

function queryByPage() {
  //起始位置：（当前页-1）×每页大小
  let start = (pageList.value.currentPage - 1) * pageList.value.pageSize;
  //结束位置：当前页×每页大小
  let end = pageList.value.currentPage * pageList.value.pageSize;

  //返回切割数组后的数据
  return pageList.value.tableData.slice(start, end);
}

// 改变每页大小的方法
const handleSizeChange = (val) => {
  pageList.value.pageSize = val;

  pageList.value.pageData = queryByPage();
};

// 改变当前页的方法
const handleCurrentChange = (val) => {
  pageList.value.currentPage = val;

  pageList.value.pageData = queryByPage();
};

//侦听
watch(
  () => courseList.value,
  (newCourseList) => {
    notSignInChange(newCourseList),
      signInChange(newCourseList),
      absenceChange(newCourseList);
  }
);

onMounted(() => {
  findAll();
});
</script>
