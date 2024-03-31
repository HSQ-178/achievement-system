<script setup>
import { onMounted } from 'vue'
import { useAddressStore } from './store/addressStore';
import { useqrcodeStore } from './store/qrcodeStore';

const addressStore = useAddressStore()
const qrcodeStore = useqrcodeStore()

onMounted(() => {
  addressStore.timeInSeconds > 0 && addressStore.countDownAction()
  qrcodeStore.qrcodeDuration > 0 && qrcodeStore.qrcodeCountDownAction()
})
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>
