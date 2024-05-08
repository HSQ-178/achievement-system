<template>
  <div class="absolute left-1/3 top-10" id="qrcode-container">
    <div class="text-2xl mb-10 ml-65">
      请扫描二维码签到
    </div>
    <div class="text-gray-5 mb-10 ml-72">
      每隔 {{ qrcodeStore.frequency }} 秒刷新一次
    </div>
    <img class="w-180" :src="imageURL" id="qrcode-image" />
  </div>
</template>

<script setup>
import router from "../../../router/router";
import { useqrcodeStore } from "../../../store/qrcodeStore";
import { useUserStore } from "../../../store/userStore";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const qrcodeStore = useqrcodeStore()

const baseURL = "http://localhost:8082/api/qrcode";
    // 向服务器发起GET请求获取二维码图像
const imageURL = ref(`${baseURL}/getQrcode?teacherCard=${userStore.users.teacher.teacherCard}`);

onMounted(() => {
  const timer = setInterval(() => {
    if (
      new Date().getTime() < new Date(qrcodeStore.expiration).getTime()
    ) {
      imageURL.value = `${baseURL}/getQrcode?teacherCard=${userStore.users.teacher.teacherCard}`;
    } else {
      clearInterval(timer);
      ElMessage.error("二维码已过期");
      router.back();
    }
  }, 1000)
});
</script>
