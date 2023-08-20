<template>
  <div class="base">
    <!-- 注册登录界面 -->
    <div class="loginAndRegist">
      <!--登录表单-->
      <div class="loginArea">
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!-- 标语 -->
          <div v-show="isShow" class="title">
            LOGIN
          </div>
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!-- 密码框和用户名框 -->
          <el-form v-show="isShow" class="pwdArea" :model="loginUser" :rules="loginUserRules" ref="loginUserRef">
            <div style="flex: 1;justify-content: center;display: flex;align-items: center">
              <el-input class="username" v-model="loginUser.userName" style="width: 200px" placeholder="用户名"></el-input>
            </div>
            <div style="flex: 1;justify-content: center;display: flex;align-items: center">
              <el-input v-model="loginUser.password" placeholder="密码" style="width: 200px" show-password></el-input>
            </div>
          </el-form>
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <div v-show="isShow" class="btnArea">
            <el-button type="success" round style="background-color: #257B5E;letter-spacing: 5px"
              @click="useVerify">登录</el-button>
          </div>
        </transition>
      </div>
      <!-- 注册表单 -->
      <div class="registArea">
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!--  注册表头-->
          <div v-show="!isShow" class="rigestTitle">
            用户注册
          </div>
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!--            注册表单-->
          <el-form  v-show="!isShow" class="register_form" :model="registerForm" :rules="registerFormRules"
            ref="registerFormRef">
            <div style="flex: 1;display: flex;justify-content: center;align-items: center">
              用&nbsp;&nbsp;&nbsp;户&nbsp;&nbsp;&nbsp;名:
              <el-input placeholder="请输入用户名" v-model="registerForm.userName" style="width: 165px;margin-left: 10px"
                clearable>
              </el-input>
            </div>
            <div style="flex: 1;display: flex;justify-content: center;align-items: center">
              密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:
              <el-input placeholder="请输入密码" style="width: 165px;margin-left: 10px" v-model="registerForm.password"
                show-password></el-input>
            </div>
            <div style="flex: 1;display: flex;justify-content: center;align-items: center;">
              确&nbsp;认&nbsp;密&nbsp;码:
              <el-input placeholder="请再次输入密码" style="width: 165px;margin-left: 10px"
                v-model="registerForm.confirmPassword" show-password></el-input>
            </div>
          </el-form >
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!--            注册按钮-->
          <div v-show="!isShow" class="registBtn">
            <el-button type="success" round style="background-color: #257B5E;letter-spacing: 5px"
              @click="register">注册</el-button>
          </div>
        </transition>
      </div>
      <!-- 信息展示界面 -->
      <div id="aaa" class="showInfo" :style="{
        borderTopRightRadius: styleObj.bordertoprightradius,
        borderBottomRightRadius: styleObj.borderbottomrightradius,
        borderTopLeftRadius: styleObj.bordertopleftradius,
        borderBottomLeftRadius: styleObj.borderbottomleftradius,
        right: styleObj.rightDis
      }" ref="showInfoView">

        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!-- 没有用户输入用户名或者找不到用户名的时候 -->
          <div v-show="isShow"
            style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%;height: 100%">
            <!-- 欢迎语 -->
            <div style="flex: 2;display: flex;align-items: center;font-size: 22px;color: #FFFFFF;font-weight: bold">
              欢迎登入电影售票系统
            </div>
            <!-- 欢迎图片 -->
            <div style="flex: 2">
              <el-button type="success" style="background-color:#257B5E;border: 1px solid #ffffff;" round
                @click="changeToRegiest">还没有账户？点击注册</el-button>
            </div>
          </div>
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!-- 用户注册的时候展示信息 -->
          <div v-show="!isShow"
            style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%;height: 100%">
            <!-- 欢迎语 -->
            <div style="flex: 2;display: flex;align-items: center;font-size: 22px;color: #FFFFFF;font-weight: bold">
              欢迎注册
            </div>
            <!-- 欢迎图片 -->
            <div style="flex: 2">
              <el-button type="success" style="background-color:#257B5E;border: 1px solid #ffffff;" round
                @click="changeToLogin">已有账户？点击登录</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div>
      <!-- 拼图验证码 -->
      <Verify @success="success" :mode="'pop'" :captchaType="'blockPuzzle'" :imgSize="{ width: '330px', height: '155px' }"
        ref="verify"></Verify>
    </div>

  </div>
</template>

<script>
import Verify from "./../components/verifition/Verify";
import 'animate.css';
// eslint-disable-next-line no-unused-vars
import { Axios as request } from "axios";
export default {
  components: {
    Verify
  },
  name: 'Login',
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
      //登录表单数据对象
      loginUser: {
        userName: "",
        password: ""
      },
      //登录表单验证规则
      loginUserRules: {
        //验证用户名
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在2到20个字符之间", trigger: "blur" }
        ],
        //验证密码
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在6到16个字符之间", trigger: "blur" }
        ]
      },
      ////看看用不用转成用户对象
      registerForm: {
        userName: '',
        password: '',
        confirmPassword: '',
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
      },
      styleObj: {
        bordertoprightradius: '15px',
        borderbottomrightradius: '15px',
        bordertopleftradius: '0px',
        borderbottomleftradius: '0px',
        rightDis: '0px'
      },
      isShow: true
    }
  },
  methods: {
    success(params) {
      this.login()
    },
    useVerify() {
      this.$refs.verify.show()
    },
    changeToRegiest() {
      this.styleObj.bordertoprightradius = '0px'
      this.styleObj.borderbottomrightradius = '0px'
      this.styleObj.bordertopleftradius = '15px'
      this.styleObj.borderbottomleftradius = '15px'
      this.styleObj.rightDis = '50%'
      this.isShow = !this.isShow
    },
    changeToLogin() {
      this.styleObj.bordertoprightradius = '15px'
      this.styleObj.borderbottomrightradius = '15px'
      this.styleObj.bordertopleftradius = '0px'
      this.styleObj.borderbottomleftradius = '0px'
      this.styleObj.rightDis = '0px'
      this.isShow = !this.isShow
    },
    //用户登录
    login() {
      console.info(this.loginUser)
      this.$refs.loginUserRef.validate(async valid => {
        if (!valid) return;
        axios.defaults.headers.post['Content-Type'] = 'application/json'
        console.info(this.loginUser)
        const { data: res } = await axios.post('sysUser/login', JSON.stringify(this.loginUser));
        if (res.code != 200) return this.$message.error(res.msg);

        this.$message.success({ message: "登录成功！", duration: 1000 });
        //console.log(res.data);
        //保存token
        window.sessionStorage.setItem("token", res.data.token);
        res.data.sysUser.sysRole = null
        window.sessionStorage.setItem("loginUser", JSON.stringify(res.data.sysUser));
        //导航跳转到首页
        this.$router.push('/welcome');
      })
    },
    //用户注册
    register() {

      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
        axios.defaults.headers.post['Content-Type'] = 'application/json'
        const { data: res } = await axios.post('sysUser', JSON.stringify(this.registerForm));
        if (res.code != 200) return this.$message.error(res.msg);

        this.$message.success("注册完成！");
        this.changeToLogin()
        this.$refs.registerFormRef.resetFields()
      })

    },
  }
}
</script>

<style>
.base {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/background.png");
  background-size: 100%;
}

.loginAndRegist {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.loginArea {
  background-color: rgba(255, 255, 255, 0.8);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  height: 400px;
  width: 350px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.registArea {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  height: 400px;
  width: 350px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.showInfo {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  position: absolute;
  height: 400px;
  width: 350px;
  z-index: 2;
  top: 0;
  right: 0;
  background-image: url("../assets/welcome.png");
  background-size: cover;
  background-size: 90%;
}

.showInfo:hover {
  background-size: 100%;
  background-position: -50px -50px;
}

.title {
  width: 70%;
  flex: 1;
  border-bottom: 1px solid #257B5E;
  display: flex;
  align-items: center;
  color: #257B5E;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  justify-content: center;
}

#aaa {
  transition: 0.3s linear;
}

.pwdArea {
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;


}

.pwdArea input {
  outline: none;
  height: 50px;
  border-radius: 25px;
  padding-left: 10px;
  font-size: 12px;
  border: 1px solid gray;
}

.pwdArea input:focus {
  border: 2px solid #257B5E;
}

.btnArea {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.rigestTitle {
  width: 70%;
  flex: 1;
  color: #257B5E;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #257B5E;
}

.register_form {
  flex: 2;
  display: flex;
  flex-direction: column;
  color: #257B5E;
  font-size: 16px;
}

.register_form input {
  outline: none;
  height: 40px;
  border-radius: 20px;
  padding-left: 10px;
  font-size: 12px;
  border: 1px solid gray;
}

.register_form input:focus {
  border: 2px solid #257B5E;
}

#elselect:focus {
  border: 2px solid #257B5E;
}

.registBtn {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .el-input {
  height: 50px;
} */

</style>