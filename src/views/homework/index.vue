<script setup>
import { onMounted, ref } from "vue";
import { list } from "../../api/mothod/homeworkTask";
import { useUserStore } from "../../store/userStore";
import formDialog from "./components/form.vue";

const userStore = useUserStore();

const formDialogRef = ref(null);

const tableData = ref([]);
const createDialogVaisbale = ref(false);

const fetchData = async () => {
  const { data } = await list({
    teacherCard: userStore.users.teacher.teacherCard,
  });

  console.log(data.data.records[0]);
  if (data.code === 200) {
    tableData.value = data.data.records;
  }
};

const handleStartCheck = (startTime, endTime) => {
  return (
    new Date().getTime() > new Date(startTime).getTime() &&
    new Date().getTime() < new Date(endTime).getTime()
  );
};

const handleDialogVisible = (data, type) => {
  formDialogRef.value.handleDialogVisible(data, type);
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="handleDialogVisible">新增</el-button>
      </el-form-item>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="作业标题" width="180" />
        <el-table-column prop="teacher.name" label="教师名" width="180" />
        <el-table-column prop="course.course" label="课程" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <div
              v-if="
                row.status === 1 &&
                !handleStartCheck(row.startedAt, row.endedAt)
              "
            >
              未开始
            </div>
            <div
              v-if="
                row.status === 1 && handleStartCheck(row.startedAt, row.endedAt)
              "
            >
              已开始
            </div>
            <div v-if="row.status === 2">禁止</div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="日期范围">
          <template #default="{ row }">
            <div>
              {{ new Date(row.startedAt).toLocaleString() }} -
              {{ new Date(row.endedAt).toLocaleString() }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="发布时间">
          <template #default="{ row }">
            <div>
              {{ new Date(row.createdAt).toLocaleString() }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="handleDialogVisible(row, 'detail')"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <formDialog ref="formDialogRef" />
  </div>
</template>

<style scoped></style>
