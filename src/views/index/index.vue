<template>
    <div w-full>
        <div class="w-full h-12 mb-5 text-xl bg-white">
            <div class="absolute left-10% top-2 italic tracking-widest text-gray-5">
                <div>清榕小课堂</div>
            </div>
            <div class="logged-out absolute right-10 leading-15" v-if="loggedInDisplay">
              <a href="/register" class="mr-4">注册</a>
              <a href="/login">登录</a>
            </div>
            
            <div class="logged-in" v-if="loggedOutDisplay">
                    <el-button color="red" class="absolute right-10 mt-2 leading-12 border-white text-white bg-red">
                        安全退出
                    </el-button>
            </div>
        </div>
        <div class="flex">
            <div>
                <LeftTabbar></LeftTabbar>
            </div>
            <div>
                <router-view></router-view>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import LeftTabbar from '../../components/LeftTabbar.vue';
import { useUserStore } from '../../store/userStore';

const userStore = useUserStore()

const loggedInDisplay = computed(() => {
    return userStore.users.teacherId == '' || userStore.users.teacherName == ''
})
const loggedOutDisplay = computed(() => {
    return userStore.users.teacherId != '' && userStore.users.teacherName != ''
})

// const loggedInRef = ref(null)
// onMounted(() => {
//     loggedInRef.value.classList += " xxx"
// })
</script>

<style scoped>

</style>