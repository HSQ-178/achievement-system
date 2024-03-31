<template>
  <div>
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
      <div>
        <el-table :data="pageList.tableData" stripe class="border-1 hover:shadow-md">
          <el-table-column prop="grade" sortable label="年级" align="center" />
          <el-table-column prop="college" label="学院" align="center" />
          <el-table-column prop="major" label="专业" align="center" />
          <el-table-column prop="class" sortable label="班级" align="center" />
          <el-table-column prop="studentCard" sortable label="学号" align="center" />
          <el-table-column prop="name" label="姓名" align="center" />
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
        @size-change="changePageSize"
        @current-change="changeCurrentPage"
      />
    </div>
  </div>
</template>

<script setup>
import attendanceManagementApi from "../../api/mothod/AttendanceManagement";
import recordApi from "../../api/mothod/record";
import { Check, Close, Warning } from "@element-plus/icons-vue";
import { useUserStore } from "../../store/userStore";
import { useCourseStore } from "../../store/courseStore";
import formateTime from "../../utils/formateTime";
import {formateDate} from "../../utils/formateDate";
import { pageList, handleSizeChange, handleCurrentChange } from '../../utils/pagination'
import { findAllCourse } from './utils/findCourseAll'
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const courseStore = useCourseStore()

const name = ref(""); //按钮切换显示不同的按钮

//未签到
const notSignInChange = async () => {
  const { data } = await recordApi.getNotSignInStudentList({
    teacherCard: userStore.users.teacher.teacherCard,
    grade: courseStore.courses.grade,
    college: courseStore.courses.college,
    major: courseStore.courses.major,
    courseId: courseStore.courses.id,
    class: courseStore.courses.class,
    createTime: formateDate(new Date()),
    pagination: {
      page: pageList.value.currentPage,
      pageSize: pageList.value.pageSize
    },
    status: 1
  });
  console.log(data.data);
  if (data.code === 200) {
    pageList.value.tableData = data.data.studentList;
    pageList.value.pageTotal = data.data.totalCount;
  }
  name.value = "notSignIn";
};

//签到
const signInChange = async() => {
  const { data } = await recordApi.getSignInAndAbsenceList({
    teacherCard: userStore.users.teacherCard,
    grade: courseStore.courses.grade,
    college: courseStore.courses.college,
    major: courseStore.courses.major,
    courseId: courseStore.courses.id,
    class: courseStore.courses.class,
    createTime: formateDate(new Date()),
    pagination: {
      page: pageList.value.currentPage,
      pageSize: pageList.value.pageSize
    },
    status: 1
  });
  console.log(data.data);

  if (data.code === 200) {
    pageList.value.tableData = data.data.recordResp;
    pageList.value.pageTotal = data.data.totalCount;

  }
  name.value = "signIn";
}

//缺勤
const absenceChange = async () => {
  const { data } = await recordApi.getSignInAndAbsenceList({
    teacherCard: userStore.users.teacherCard,
    grade: courseStore.courses.grade,
    college: courseStore.courses.college,
    major: courseStore.courses.major,
    courseId: courseStore.courses.id,
    class: courseStore.courses.class,
    createTime: formateDate(new Date()),
    status: 0,
    pagination: {
      page: pageList.value.currentPage,
      pageSize: pageList.value.pageSize
    },
  });
  // console.log(data.data);

  if (data.code === 200) {
    pageList.value.tableData = data.data.recordResp;
    pageList.value.pageTotal = data.data.totalCount;

  }
  name.value = "absence";
};

//未签到 => 签到
const notSinInToSignIn = async (row) => {
  //当前日期与上课时间进行拼接
  const date = new Date(
    formateDate(new Date()) + " " + formateTime(new Date(tableData.value.startTime))
  ).toISOString();
  

  const { data } = await attendanceManagementApi.notSinInToSignInSave({
    teacherId: userStore.users.teacherId,
    grade: row.grade,
    college: row.college,
    major: row.major,
    course: tableData.value.course,
    classes: row.classes,
    studentId: row.studentId,
    studentName: row.studentName,
    createTime: date,
    state: 1,
  });

  if (data.code === 200) {
    const index = pageList.value.tableData.indexOf(row);
    if (index > -1) {
      pageList.value.tableData.splice(index, 1);
    }
    ElMessage.info("签到成功！");
  }
};

//未签到 => 缺勤
const notSignInToAbsence = async (row) => {
  //当前日期与上课时间进行拼接
  const date = new Date(
    formateDate(new Date()) + " " + formateTime(new Date(tableData.value.startTime))
  ).toISOString();
  // console.log(date);

  const { data } = await attendanceManagementApi.notSinInToSignInSave({
    teacherId: userStore.users.teacherId,
    grade: row.grade,
    college: row.college,
    major: row.major,
    course: tableData.value.course,
    classes: row.classes,
    studentId: row.studentId,
    studentName: row.studentName,
    createTime: date,
    state: 0,
  });

  if (data.code === 200) {
    const index = pageList.value.tableData.indexOf(row);
    if (index > -1) {
      pageList.value.tableData.splice(index, 1);
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
    course: tableData.value.course,
    classes: row.classes,
    studentId: row.studentId,
    studentName: row.studentName,
    createTime: formateDate(new Date()),
    state: row.state,
  });

    const index = pageList.value.tableData.indexOf(row);
    if (index > -1) {
      pageList.value.tableData.splice(index, 1);
      ElMessage.info("该同学未签到")
    }
};

//签到 => 缺勤
const signInToAbsence = async (row) => {
  console.log(row);
  const { data } = await attendanceManagementApi.updateStateByConditions({
    state: 0,
    grade: row.grade,
    id: row.id,
    createTime: formateDate(new Date()),
  });

    const index = pageList.value.tableData.indexOf(row);

    if (index > -1) {
      pageList.value.tableData = pageList.value.tableData.filter((item) => item !== row);
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

    const index = pageList.value.tableData.indexOf(row);

    if (index > -1) {
      pageList.value.tableData = pageList.value.tableData.filter((item) => item !== row);
      ElMessage.info("该同学缺勤！");
    }
};

//缺勤 => 未签到
const absenceToNotSignIn = async (row) => {
  const { data } = await attendanceManagementApi.deleteSignInToNotSignInByConditions({
    grade: row.grade,
    college: row.college,
    major: row.major,
    course: tableData.value.course,
    classes: row.classes,
    studentId: row.studentId,
    studentName: row.studentName,
    createTime: formateDate(new Date()),
    state: row.state,
  });

    const index = pageList.value.tableData.indexOf(row);

    if (index > -1) {
      pageList.value.tableData = pageList.value.tableData.filter((item) => item !== row);
      ElMessage.info("该同学未签到！");
    }
};

const changePageSize = (val) => {
  handleSizeChange(val);
  notSignInChange()
};

const changeCurrentPage = (val) => {
  handleCurrentChange(val);
  notSignInChange()
};

onMounted(() => {
  //获取所有课程
  findAllCourse();
});
</script>
