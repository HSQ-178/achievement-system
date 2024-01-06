<template>
  <div>
    <!-- 查询栏 -->
    <div class="pl-20 h-40 bg-white border-2">
      <el-form class="grid grid-cols-3 mt-4">
        <el-form-item label="年级：">
          <el-select v-model="searchList.grade" placeholder="请选择年级" clearable>
            <el-option label="22" value="22" />
            <el-option label="23" value="23" />
          </el-select>
        </el-form-item>
        <el-form-item label="学院：">
          <el-select v-model="searchList.college" placeholder="请选择学院" clearable>
            <el-option label="计算机学院" value="计算机学院" />
            <el-option label="公共管理学院" value="公共管理学院" />
            <el-option label="电子信息学院" value="电子信息学院" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业：">
          <el-select v-model="searchList.major" placeholder="请选择专业" clearable>
            <el-option label="软件技术专业" value="软件技术专业" />
            <el-option label="计算机网络技术专业" value="计算机网络技术专业" />
            <el-option label="电子商务专业" value="电子商务专业" />
          </el-select>
        </el-form-item>
        <el-form-item label="班级：">
          <el-select v-model="searchList.classes" placeholder="请选择班级" clearable>
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
            <el-option label="4" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="学号：">
          <el-input
            class="w-52%"
            v-model="searchList.studentId"
            placeholder="请输入学号"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input
            class="w-52%"
            v-model="searchList.studentName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        
      </el-form>
      <div class="absolute right-1/2">
        <el-button
          @click="searchHandle"
          class="text-white bg-indigo hover:bg-indigo-5 hover:text-white"
        >
          搜索
        </el-button>
    </div>
    </div>

    <!-- 表单栏 -->
    <div class="mt-5">
      <el-table stripe :data="pageList.tableData" class="border-2 shadow-sm hover:shadow-md">
        <el-table-column prop="grade" sortable label="年级" align="center"/>
        <el-table-column prop="college" label="学院" align="center"/>
        <el-table-column prop="major" label="专业" align="center" />
        <el-table-column prop="classes" sortable label="班级" align="center"/>
        <el-table-column prop="studentId" sortable label="学号" align="center"/>
        <el-table-column prop="studentName" label="姓名" align="center"/>
        <el-table-column prop="studentPhone" label="手机号" align="center"/>
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-button class="text-white bg-blue hover:bg-blue-5 hover:text-white" size="small">查看</el-button>
            </template>
        </el-table-column>
    </el-table>
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
import StudentsManagementApi from "../../../api/mothod/StudentsManagement";
import { useUserStore } from "../../../store/userStore";
import { useRecordStore } from "../../../store/recordStore";
import { pageList, handleSizeChange, handleCurrentChange } from '../../../utils/pagination'
import { ref, onMounted } from "vue";

//搜索栏数据
const searchList = ref({
  grade: "",
  college: "",
  major: "",
  classes: "",
  studentId: "",
  studentName: "",
});

//表格数据
const studentList = ref([]);

const userStore = useUserStore();
const recordStore = useRecordStore();

//将数据渲染到表格中
const tableListShow = async () => {
  const { data } = await StudentsManagementApi.findStudentsByTeacherIdAndTeacherName({
    teacherId: userStore.users.teacherId,
    teacherName: userStore.users.teacherName,
    currentPage: pageList.value.currentPage,
    pageSize: pageList.value.pageSize
  });
  console.log(data.data.data);
  if (data.code === 200) {
    recordStore.setStudent(data.data.data);
    studentList.value = data.data.data;
    pageList.value.tableData = data.data.data;
    pageList.value.pageTotal = data.data.totalCount;
  }
};

const changePageSize = (val) => {
  handleSizeChange(val);
  tableListShow()
};

const changeCurrentPage = (val) => {
  handleCurrentChange(val);
  tableListShow()
};

//搜索
const searchHandle = async () => {
  const { data } = await StudentsAchievementApi.findStudentByConditions({
    teacherId: userStore.users.teacherId,
    grade: searchList.value.grade,
    college: searchList.value.college,
    major: searchList.value.major,
    classes: searchList.value.classes,
    studentId: searchList.value.studentId,
    studentName: searchList.value.studentName,
  });

  if (data.code === 200) {
    // console.log(data.data);
    pageList.value.pageData = data.data;
    pageList.value.pageTotal = data.data.length;
  }
};


onMounted(() => {
  tableListShow();
});
</script>

<style scoped>
/deep/.el-table__body-wrapper .el-table__body tr.el-table__row--striped td {
	background-color: #f6f7fb;
  }
</style>
