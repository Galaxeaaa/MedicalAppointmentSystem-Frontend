<template>
  <div id="welcome">
    <div class="img">
      <div
        class="mask"
        v-if="showLogin || showLogon || showDoctorLogin"
        @click="clear"
      ></div>
      <div class="login_dialog" v-if="showLogin || showDoctorLogin">
        <el-form ref="loginForm" :model="loginForm">
          <el-form-item label="用户名">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入您的用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="clickLogin" class="el-button--primary is-round"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="logon_dialog" v-if="showLogon">
        <el-form ref="logonForm" :model="logonForm" :rules="logonRules">
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="logonForm.username"
              placeholder="用户名由英文、数字、下划线组成"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="logonForm.password"
              placeholder="密码应尽可能使用大小写字母和数字的组合"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              type="password"
              v-model="logonForm.confirmPassword"
              placeholder="请确保两次输入的密码一致"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox label="我已阅读并同意协议内容" v-model="agree">
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button @click="clickLogon" class="el-button--success is-round">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="welcome_content">
        <h1>欢迎！请确认您的身份</h1>
        <div class="welcome_btn_back">
          <el-button type="primary" @click="showLogin = true"
            >患者登录</el-button
          >
          <el-button type="success" @click="showLogon = true"
            >患者注册</el-button
          >
          <el-button type="primary" @click="showDoctorLogin = true"
            >医生登录</el-button
          >
          <el-button type="success" @click="$router.push('/login_success')"
            >测试入口</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validateComfirmPwd = (rule, value, callback) => {
      if (value !== this.logonForm.password) {
        callback(new Error("确认密码与密码不一致"));
      } else {
        callback();
      }
    };
    return {
      showLogin: false,
      showLogon: false,
      showDoctorLogin: false,
      agree: false,
      loginForm: {
        username: "",
        password: "",
      },
      logonForm: {
        username: "",
        password: "",
        confirmPassword: "",
      },
      logonRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: validateComfirmPwd, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    userLogin() {
      this.showLogin = true;
      this.$store.commit("setIsDoctor", false);
    },
    clickLogin() {
      this._clickLogin(this);
    },
    _clickLogin(obj) {
      axios({
        method: "get",
        url:
          "/login?name=" +
          this.loginForm.username +
          "&password=" +
          this.loginForm.password,
      }).then(function (response) {
        if (response == true) {
          obj.$store.commit("setUserId", obj.loginForm.username);
          obj.$store.commit("setIsDoctor", obj.showDoctorLogin);
          obj.$router.push("/login_success");
        } else {
          alert("登陆失败，账户名或密码有误！");
        }
      });
    },
    clickLogon() {
      this._clickLogon(this);
    },
    _clickLogon(obj) {
      if (!this.agree) {
        alert("请先阅读并同意协议内容！")
        return
      }
      if (this.logonForm.password !== this.logonForm.confirmPassword) {
        alert("请确保两次输入的密码一致！");
        return;
      }
      axios({
        method: "get",
        url: "/register/checkname?name=" + this.logonForm.username,
      }).then(function (response) {
        if (response == true) {
          alert("用户名已被占用！");
          return;
        }
      });
      axios({
        method: "get",
        url:
          "/register?name=" +
          this.logonForm.username +
          "&password=" +
          this.logonForm.password,
      }).then(function (response) {
        if (response == true) {
          alert("注册成功！");
          obj.$router.push("/login");
        }
      });
    },
    clear() {
      this.showLogin = false;
      this.showLogon = false;
      this.showDoctorLogin = false;
      this.loginForm.username = "";
      this.loginForm.password = "";
      this.logonForm.username = "";
      this.logonForm.password = "";
      this.logonForm.confirmPassword = "";
    },
  },
};
</script>

<style lang="scss" scoped>
#welcome {
  .mask {
    background-color: #000;
    opacity: 0.5;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .login_dialog {
    background-color: #ffffffbb;
    padding-top: 50px;
    padding-left: 100px;
    padding-right: 100px;
    position: fixed;
    top: calc(50% - 180px);
    left: calc(50% - 250px);
    width: 300px;
    height: 310px;
    z-index: 2;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .logon_dialog {
    background-color: #ffffffbb;
    padding-top: 50px;
    padding-left: 100px;
    padding-right: 100px;
    position: fixed;
    top: calc(50% - 250px);
    left: calc(50% - 250px);
    width: 300px;
    height: 500px;
    z-index: 2;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .img {
    width: 100%;
    height: 100%;
    position: fixed;
    background: url("~@/assets/img/2.jpg") center center no-repeat;
    background-size: 100% 100%;
  }
  .welcome_content {
    margin-top: 300px;
    h1 {
      font-size: 64px;
    }
  }
  .welcome_btn_back {
    margin-top: 66px;
    margin-left: 40%;
    margin-right: 40%;
    padding-top: 25px;
    padding-bottom: 25px;
    background-color: #ffffff66;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>
