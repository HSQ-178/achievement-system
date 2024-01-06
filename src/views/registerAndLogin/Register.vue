<template>
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 p-4 bg-white rounded-5 shadow-sm hover:shadow-md">
        <div>
            <p class="mt-10 text-3xl text-center">注册</p>
            <div class="grid place-items-center p-5">
                <el-form class="w-60 ml-15 mt-5"  :rules="rules">
                    <el-form-item label-width="79" label="手机号：">
                        <el-input v-model="registerList.phone" placeholder="请输入正确的手机号" />
                    </el-form-item>
                    <el-form-item label="教师编号：">
                        <el-input v-model="registerList.teacherId" placeholder="请输入教师编号" />
                    </el-form-item>
                    <el-form-item label-width="79" label="用户名：">
                        <el-input v-model="registerList.teacherName" placeholder="请输入用户名(本人姓名)" />
                    </el-form-item>
                    <el-form-item label-width="79" label="密 码：">
                        <el-input type="password" v-model="registerList.password" placeholder="请输入密码" />
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="registerClick" class="w-30 h-10 ml-10 mt-3 text-xl text-white bg-purple-4">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import TeachersApi from '../../api/mothod/teachers'
import { ElMessage } from 'element-plus';
import router from '../../router/router'
import md5 from 'js-md5'

const registerList = ref({
    teacherId: '',
    teacherName: '',
    phone: '',
    password: ''
})

//正则表达
const rules = {
        phone: [
            {
                required: true,
                pattern: /^1[3456789]\d{9}$/,
                message: '请输入正确的手机号',
                trigger: "blur",
            },
        ],
        teacherId: [
            {
                required: true,
                message: '请输入正确的教师编号',
                trigger: "blur",
            }
        ],
        teacherName: [
            {
                required: true,
                message: '请输入正确的姓名',
                trigger: "blur",
            }
        ],
        password: [
            { required: true, message: "请输入密码", trigger: "blur" }
        ]
}

//注册
const registerClick = async() => {
    if(registerList.value.teacherId != '' 
        && registerList.value.teacherName !='' 
        && registerList.value.phone != ''
        && registerList.value.password != '') {
        const { data } = await TeachersApi.register({
            teacherId: registerList.value.teacherId,
            teacherName: registerList.value.teacherName,
            phone: registerList.value.phone,
            password: md5(registerList.value.password) //密码使用md5()加密
        })

        console.log(data.data);
        if(data.code === 200) {
            ElMessage('注册成功')

            setTimeout(() => router.push('/login'), 1000)
            return;
        }
        ElMessage('该教师已存在')
    }
    ElMessage("请填写完整信息")
    
}


</script>