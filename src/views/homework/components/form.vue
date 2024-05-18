<script setup>
import { Plus } from "@element-plus/icons-vue";
import { ref } from "vue";
import { create } from "../../../api/mothod/homeworkTask";
import { create as createFiles } from "../../../api/mothod/homeworkFiles";
import courseApi from "../../../api/mothod/course";
import { useUserStore } from "../../../store/userStore";
import { genFileId } from "element-plus";

const userStore = useUserStore();

const isEdit = ref(true);

const formData = ref({
  title: "",
  courseId: null,
  dateRange: [],
  subscribe: "",
  startedAt: "",
  endedAt: "",
  id: null,
});

const courseOptions = ref([]);

const rules = {
  title: [{ required: true, message: "请输入作业标题", trigger: "blur" }],
  courseId: [{ required: true, message: "请选择课程", trigger: "change" }],
  dateRange: [{ required: true, message: "请选择时间范围", trigger: "change" }],
  subscribe: [{ required: true, message: "请输入作业要求", trigger: "blur" }],
};
const createDialogVaisbale = ref(false);

const handleDialogVisible = (data, type) => {
  if (type === "detail") {
    formData.value = data;
    formData.value.dateRange = [data.startedAt, data.endedAt];
    isEdit.value = false;
  }
  createDialogVaisbale.value = true;

  fetchCourseOptions();
};

const fetchCourseOptions = async () => {
  const { data } = await courseApi.getAllCourse({
    teacherCard: userStore.users.teacher.teacherCard,
  });

  if (data.code === 200) {
    courseOptions.value = data.data.courseResp.map((item) => ({
      label: `${item.college}/${item.grade}级/${item.major}/${item.class}/${item.course}`,
      value: item.id,
    }));
  }
};

const handleCreate = async () => {
  if (formData.value.dateRange.length === 2) {
    formData.value.startedAt = formData.value.dateRange[0];
    formData.value.endedAt = formData.value.dateRange[1];
  }

  formData.value.teacherCard = userStore.users.teacher.teacherCard;

  const { data } = await create(formData.value);

  if (data.code === 200) {
    formData.value.id = data.data;

    uploadRef.value.submit();
  }
};

const uploadRef = ref(null);

const handleUploadExceed = (files) => {
  uploadRef.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  uploadRef.value.handleStart(file);
};

const handleUploadSuccess = async (response, file, fileList) => {
  const { data } = await createFiles({
    bindId: formData.value.id,
    type: 1, // 1: 作业任务附件 2: 作业提交附件
    UserId: userStore.users.teacher.teacherCard,
    filename: response.data,
  });

  if (data.code === 200) {
    createDialogVaisbale.value = false;
  }
};

defineExpose({
  handleDialogVisible,
});
</script>

<template>
  <div>
    <el-dialog v-model="createDialogVaisbale" title="新增作业任务" width="80%">
      <el-form label-position="top" :model="formData">
        <el-row>
          <el-col :span="8">
            <el-form-item label="作业标题" prop="title">
              <el-input
                v-model="formData.title"
                placeholder="请输入作业标题"
                :disabled="!isEdit"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="课程" prop="courseId">
              <el-select v-model="formData.courseId" :disabled="!isEdit">
                <el-option
                  v-for="(item, index) in courseOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="时间范围" prop="dateRange">
              <el-date-picker
                v-model="formData.dateRange"
                type="datetimerange"
                start-placeholder="Start date"
                end-placeholder="End date"
                format="YYYY-MM-DD HH:mm:ss"
                date-format="YYYY/MM/DD ddd"
                time-format="A hh:mm:ss"
                :disabled="!isEdit"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="作业要求" prop="subscribe">
              <el-input
                v-model="formData.subscribe"
                type="textarea"
                placeholder="请输入作业要求"
                :rows="3"
                :disabled="!isEdit"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="附件">
              <el-upload
                ref="uploadRef"
                class="upload-demo"
                action="http://localhost:8082/api/file/upload"
                drag
                :auto-upload="false"
                :limit="1"
                :disabled="!isEdit"
                @success="handleUploadSuccess"
                @exceed="handleUploadExceed"
              >
                <template #trigger>
                  <el-button type="primary" :icon="Plus" />
                </template>

                <template #tip>
                  <div class="el-upload__tip">请上传 图片/pdf文档</div>
                </template>
              </el-upload></el-form-item
            >
          </el-col>
        </el-row>

        <el-form-item>
          <el-button
            v-if="isEdit"
            class="flex ml-auto"
            type="primary"
            @click="handleCreate"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped></style>
