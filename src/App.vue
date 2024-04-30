<script setup>
import { onMounted } from "vue";
import { useAddressStore } from "./store/addressStore";
import { useqrcodeStore } from "./store/qrcodeStore";

const addressStore = useAddressStore();
const qrcodeStore = useqrcodeStore();
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
