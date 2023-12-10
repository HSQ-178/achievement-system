<template>
    <div>
        <div class="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-100 p-4 text-xl bg-purple-1 rounded-md shadow-md">
            <p>登录</p>
            <el-form class="w-60 ml-15 mt-5"  :rules="rules">
                <el-form-item label="教师编号：">
                    <el-input v-model="loginList.teacherId" placeholder="请输入教师编号" />
                </el-form-item>
                <el-form-item label="密 码：">
                    <el-input type="password" v-model="loginList.password" class="ml-3" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="loginClick" class="w-20 ml-20 mt-3 text-white bg-purple-4">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import teachersApi from '../../api/mothod/teachers';
import md5 from 'js-md5'
import router from '../../router/router';
import { useUserStore } from '../../store/userStore';
import { ref } from 'vue'
import { ElMessage } from 'element-plus';

const loginList = ref({
    teacherId: '',
    password: ''
})

//正则表达
const rules = {
        teacherId: [
            {
                required: true,
                message: '请输入正确的教师编号',
                trigger: "blur",
            }
        ],
        password: [
            { required: true, message: "请输入密码", trigger: "blur" }
        ]
}

const userStore = useUserStore();

//登录
const loginClick = async() => {
    if(loginList.value.teacherId != '' && loginList.value.password != '') {
        const { data } = await teachersApi.login({
            teacherId: loginList.value.teacherId,
            password: md5(loginList.value.password)
        })

        console.log(data.data);
        if(data.code === 200) {
            userStore.setTeacher(data.data)
            ElMessage("登录成功")

            setTimeout(() => router.push('/'), 1000);
            return;
        }
        ElMessage("登陆失败")
    }
}

</script>