<template>
    <div class="register_container">
        <div class="register_box">
            <div>注册</div>
            <!-- 注册表单区域 -->
            <el-form class="register_form" :model="registerForm" :rules="registerFormRules" ref="registerFormRef">
                <!-- 用户名 -->
                <el-form-item prop="userName">
                    <el-input v-model="registerForm.userName" prefix-icon="iconfont icon-user"
                        placeholder="请输入用户名"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="registerForm.password" prefix-icon="iconfont icon-lock" placeholder="请输入密码"
                        type="password"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input v-model="registerForm.confirmPassword" placeholder="请确认密码" type="password"></el-input>
                </el-form-item>
                <!-- 按扭区域 -->
                <el-form-item class="btns">
                    <el-button size="medium" :round="true" type="primary" @click="register">注册</el-button>
                    <el-button size="medium" :round="true" type="primary" @click="gotoLogin">返回登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "Register",
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
                // password 是表单上绑定的字段
            } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            registerForm: {
                userName: '',
                password: '',
                confirmPassword: '',
                sex: '',
            },
            registerFormRules: {
                userName: [
                    { required: true, message: "请输入用户名称", trigger: "blur" },
                    { min: 2, max: 20, message: "长度在2到20个字符之间", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 6, max: 16, message: "长度在6到16个字符之间", trigger: "blur" }
                ],
                confirmPassword: [
                    { required: true, validator: validatePass, message: "两次密码输入不一致", trigger: "blur" },
                ]
            }
        }
    },
    methods: {
        register() {
            this.$refs.registerFormRef.validate(async valid => {
                if (!valid) return
                this.registerForm.sex = this.gender === '1'
                axios.defaults.headers.post['Content-Type'] = 'application/json'
                const { data: res } = await axios.post('sysUser', JSON.stringify(this.registerForm));
                if (res.code != 200) return this.$message.error(res.msg);

                this.$message.success("注册完成！");
                this.$router.push('/login')
                this.$refs.registerFormRef.resetFields()
            })
        },
        gotoLogin() {
            this.$router.push('/login')
        },
    }
}
</script>
  
<style scoped>
.register_container {
    background-image: url("../assets/login-background.jpg");
    background-size: cover;
    height: 100%;
}

.register_box {
    width: 450px;
    height: 500px;
    /* background-color: #fff; */
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.register_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns {
    display: flex;
    justify-content: center;
}
</style>