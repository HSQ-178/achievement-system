<template>
    <div class="ml-10">
        <!-- 查询栏 -->
    <div class="pl-60 w-320 h-40 bg-white border-2">
        <el-form class="grid grid-cols-2 mt-4">
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
        </el-form>
        <div class="absolute left-245">
            <el-button
              @click="searchHandle"
              class="text-white bg-indigo hover:bg-indigo-5 hover:text-white"
            >
              搜索
            </el-button>
        </div>
      </div>

      <!-- 课程表栏 -->
      <div class="mt-5">
        <CourseTable :table-list="tableHeaderList"></CourseTable>
      </div>
    </div>
</template>

<script setup>
import CourseTable from '../../../components/CourseTable.vue';

//搜索栏数据
const searchList = ref({
  grade: "",
  college: "",
  major: "",
  classes: "",
  studentId: "",
  studentName: "",
});

//搜索
const searchHandle = () => {

}

//表格表头数据
const tableHeaderList = [
    { index: 0, title: " "},
    { index: 1, title: "星期一" },
    { index: 2, title: "星期二" },
    { index: 3, title: "星期三" },
    { index: 4, title: "星期四" },
    { index: 5, title: "星期五" },
    { index: 6, title: "星期六" },
    { index: 7, title: "星期日" }
]

const tableColumnList = [
    {}
]

</script>