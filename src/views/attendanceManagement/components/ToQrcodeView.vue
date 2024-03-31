<template>
  <div class="absolute left-1/3 top-10" id="qrcode-container">
    <div class="text-2xl mb-10 ml-65">
      请扫描二维码签到
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

const baseURL = "http://localhost:8088/qrcode";
    // 向服务器发起GET请求获取二维码图像
const imageURL = ref(`${baseURL}/toQrcode?qrcodeId=${qrcodeStore.qrcodeId}&teacherId=${userStore.users.teacherId}`);

onMounted(() => {
  qrcodeStore.qrcodeCountDownAction()
  const qrcodeEndTime = qrcodeStore.qrcodeDuration
  if (qrcodeEndTime == 0) {
    ElMessage.Info("签到时间已结束!")
    router.back()
  }
  console.log(qrcodeEndTime);
});
</script>
