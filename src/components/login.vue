<template>
  <div id="welcome">
    <div class="img">
      <div
        class="mask"
        v-if="showLogin || showLogon || showForgetpwd"
        @click="clear"
      ></div>
      <div class="forgetpwd" v-if="showForgetpwd">
        <el-form ref="forgetPwdForm" :model="forgetPwdForm">
          <el-form-item label="用户名">
            <el-input
              v-model="forgetPwdForm.username"
              placeholder="请输入您注册时的用户名"
            ></el-input>
          </el-form-item>
          <el-button @click="sendConfirmCodePwd">发送验证码</el-button>
          <el-form-item label="验证码">
            <el-input
              v-model="forgetPwdForm.confirmCode"
              placeholder="请输入收到的验证码"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input
              v-model="forgetPwdForm.newPwd"
              placeholder="请输入新密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              v-model="forgetPwdForm.confirmNewPwd"
              placeholder="请重复刚刚输入的新密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="clickChangePwd" class="el-button--primary is-round"
              >确认修改</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="login_dialog" v-if="showLogin">
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
          <el-button type="text" @click="forgetPassword">
            忘记密码
          </el-button>
          <el-form-item>
            <el-checkbox label="我已阅读并同意协议内容" v-model="agree">
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button @click="clickLogin" class="el-button--primary is-round"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="logon_dialog" v-if="showLogon">
      <div style="margin-bottom: 50px">
        <el-form ref="logonForm" :model="logonForm" :rules="logonRules">
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="logonForm.username"
              placeholder="用户名由英文、数字、下划线组成"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input
              v-model="logonForm.phoneNumber"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-button @click="sendConfirmCode">发送验证码</el-button>
          <el-form-item label="验证码" prop="confirmCode">
            <el-input
              v-model="logonForm.confirmCode"
              placeholder="请输入收到的验证码"
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
          <el-form-item label="职位" prop="title" v-show="isDoctor">
            <el-input
              v-model="logonForm.title"
              placeholder="请输入您的职位"
            ></el-input>
          </el-form-item>
          <el-form-item label="科室" prop="department" v-show="isDoctor">
            <el-input
              v-model="logonForm.department"
              placeholder="请输入您的科室"
            ></el-input>
          </el-form-item>
          <el-form-item label="医院" prop="hospital" v-show="isDoctor">
            <el-input
              v-model="logonForm.hospital"
              placeholder="请输入您的医院"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox label="我已阅读并同意协议内容" v-model="agree">
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button @click="clickLogon" class="el-button--success is-round"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      </div>
      <div class="welcome_content">
        <h1>欢迎！请确认您的身份</h1>
        <div class="welcome_btn_back" v-show="!isDoctor">
          <el-button
            type="primary"
            class="mybtn"
            @click="showLogin = true"
            style="margin-right: 70px"
            v-show="!isDoctor"
            >患者登录</el-button
          >
          <el-button
            type="success"
            class="mybtn"
            @click="showLogon = true"
            v-show="!isDoctor"
            >患者注册</el-button
          >
        </div>
        <div class="welcome_btn_back" v-show="isDoctor">
          <el-button
            type="primary"
            class="mybtn"
            @click="showLogin = true"
            style="margin-right: 70px"
            v-show="isDoctor"
            >医生登录</el-button
          >
          <el-button
            type="success"
            class="mybtn"
            @click="showLogon = true"
            v-show="isDoctor"
            >医生注册</el-button
          >
          <!-- <el-button type="success" @click="$router.push('/login_success')"
            >测试入口</el-button
          > -->
        </div>
        <div>
          <el-button
            ref="modebtn"
            type="info" round
            class="mybtn"
            @click="changeMode"
            >切换到医生</el-button
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
    var checkPwdStrength = (rule, value, callback) => {
      if (!((/\d/.test(value)) && ((/[a-z]/.test(value) || (/[A-Z]/.test(value)))))) {
        callback(new Error("密码强度过低！请使用数字和字母的组合！"));
      } else {
        callback();
      }
    };
    var checkPhoneNumber = (rule, value, callback) => {
      if(/\d{11}/.test(value)){
        callback()
      }else{
        callback(new Error("请输入合法的中国大陆11位手机号！"))
      }
    }
    return {
      isDoctor: false,
      showForgetpwd: false,
      showLogin: false,
      showLogon: false,
      agree: false,
      codesent:false,
      realcode: "",
      loginForm: {
        username: "",
        password: "",
      },
      logonForm: {
        username: "",
        phoneNumber: "",
        confirmCode: "",
        password: "",
        confirmPassword: "",
        title: "",
        department: "",
        hospital: "",
      },
      forgetPwdForm: {
        username: "",
        confirmCode: "",
        newPwd: "",
        confirmNewPwd: "",
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
        phoneNumber: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "11位中国大陆手机号",
            trigger: "blur",
          },
          { validator: checkPhoneNumber, trigger: "blur" },
        ],
        confirmCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
          { validator: checkPwdStrength, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: validateComfirmPwd, trigger: "blur" },
        ],
        title: [
          { required: true, message: "请输入职位", trigger: "blur" },
        ],
        department: [
          { required: true, message: "请输入科室", trigger: "blur" },
        ],
        hospital: [
          { required: true, message: "请输入医院", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    changeMode() {
      this.isDoctor = !this.isDoctor;
      if (this.isDoctor) {
        this.$refs.modebtn.$el.innerText = "切换到患者";
      } else {
        this.$refs.modebtn.$el.innerText = "切换到医生";
      }
    },
    userLogin() {
      this.showLogin = true;
      this.$store.commit("setIsDoctor", false);
    },
    checkcode(entercode){
      // if(this.realcode != entercode){
      //   alert("验证码不正确！")
      //   return false
      // }
      // this.codesent=false
      // this.loginForm.confirmCode=""
      return true
    },
    checkpswd(val){
      if (!((/\d/.test(val)) && ((/[a-z]/.test(val) || (/[A-Z]/.test(val)))))) {
        alert("密码强度过低！请使用数字和字母的组合！")
        return false
      }
      if(val.length<6){
        alert("密码长度不能低于6个字符！")
        return false
      }
      if(val.length>16){
        alert("密码长度不能多于16个字符！")
        return false
      }
      return true
    },
    forgetPassword() {
      this.showForgetpwd = true;
      this.showLogin = false;
    },
    sendConfirmCodePwd(){
      if(this.forgetPwdForm.username == ""){
        alert("请先输入用户名！")
        return
      }
      var teltel=new String("")
      this.$axios
          .get("/do/getinfo/"+(this.isDoctor?"doctor":"usr")+"?id=" + this.forgetPwdForm.username)
          .then((res) => {
            // console.log(res.data)
            if(res.data.length != 1){
              teltel=""
              // console.log("000")
              alert("用户不存在！")
            }else{
              teltel=res.data[0].tel
              // console.log(res.data[0].tel)
              if(!(/\d{11}/.test(teltel))){
                alert("用户不存在！")
                return
              }
              this.realcode="xxx"
              alert("已发送验证码至"+teltel.substring(0, 3)+"****"+teltel.substring(7));
              this.codesent=true
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    sendConfirmCode() {
      if(!(/\d{11}/.test(this.logonForm.phoneNumber))){
        alert("请先输入合法手机号！")
        return
      }
      this.realcode="xxx"
      alert("已发送验证码至"+this.logonForm.phoneNumber.substring(0, 3)+"****"+this.logonForm.phoneNumber.substring(7));
      this.codesent=true
    },
    clickChangePwd() {
      this._clickChangePwd(this);
    },
    _clickChangePwd(obj) {
      if(obj.codesent==false){
        alert("请先点击发送验证码验证手机！")
        return
      }
      if(!this.checkcode(obj.forgetPwdForm.confirmCode)) return
      if (obj.forgetPwdForm.newPwd !== obj.forgetPwdForm.confirmNewPwd){
        alert("请确保两次输入的密码一致！");
        return;
      }
      console.log("skjdvjsndjc")
      if(!this.checkpswd(obj.forgetPwdForm.newPwd)) return
      this.$axios
        .get(
          "/do/chpswd?isdoc="+(obj.isDoctor?"true":"false")+"&id="+this.forgetPwdForm.username+"&newpswd="+this.forgetPwdForm.newPwd
        )
        .then((response) => {
          // console.log(response)
          if (response) {
            console.log("success");
            this.$message({
              message: "密码修改成功",
              type: "success",
            });
            // this.$router.push('/person/personal/info')
            this.clear();
            this.$router.push("/login");
          } else {
            console.log("failed");
            this.$message({
              message: "密码修改失败",
              type: "error",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    clickLogin() {
      this._clickLogin(this);
    },
    _clickLogin(obj) {
      if (!obj.agree) {
        alert("请先阅读并同意协议内容！");
        return;
      }
      axios({
        method: "get",
        url:
          (obj.isDoctor ? "/login_doc" : "/login_usr") +
          "?id=" +
          obj.loginForm.username +
          "&password=" +
          obj.loginForm.password,
      }).then(function (response) {
        if (response.data == true) {
          obj.$store.commit("setUserId", obj.loginForm.username);
          obj.$store.commit("setIsDoctor", obj.isDoctor);
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
      if(obj.logonForm.username == ""){
        alert("用户名不能为空！")
        return
      }
      // console.log(obj.logonForm.phoneNumber)
      if(!(/\d{11}/.test(obj.logonForm.phoneNumber))){
        alert("请输入合法的中国大陆11位手机号！")
        return
      }
      if(obj.codesent==false){
        alert("请先点击发送验证码验证手机！")
        return
      }
      if(!this.checkcode(this.logonForm.confirmCode)) return
      if (obj.logonForm.password !== obj.logonForm.confirmPassword) {
        alert("请确保两次输入的密码一致！");
        return;
      }
      if(!this.checkpswd(this.logonForm.password)) return
      if (!obj.agree) {
        alert("请先阅读并同意协议内容！");
        return;
      }
      axios({
        method: "get",
        url:
          "/register_" +
          (obj.isDoctor ? "doc" : "usr") +
          "/checkname?name=" +
          obj.logonForm.username,
      }).then(function (response) {
        if (response.data == true) {
          alert("用户名已被占用！");
          return;
        }
      });
      axios({
        method: "get",
        url:
          "/register_" +
          (obj.isDoctor ? "doc" : "usr") +
          "?name=" +
          obj.logonForm.username +
          "&password=" +
          obj.logonForm.password +
          "&tel=" +
          obj.logonForm.phoneNumber + 
          "&title=" + 
          obj.logonForm.title + 
          "&department" + 
          obj.logonForm.department + 
          "&hospital" + 
          obj.logonForm.hospital,

      }).then(function (response) {
        if (response.data == true) {
          alert("注册成功！");
          obj.clear();
          obj.$router.push("/login");
        }
      });
    },
    clear() {
      this.showLogin = false;
      this.showLogon = false;
      this.showForgetpwd = false;
      this.codesent=false;
      this.realcode=""
      this.agree=false
      this.loginForm.username = "";
      this.loginForm.password = "";
      this.logonForm.username = "";
      this.logonForm.password = "";
      this.logonForm.confirmPassword = "";
      this.logonForm.phoneNumber=""
      this.forgetPwdForm.username=""
      this.forgetPwdForm.confirmCode=""
      this.forgetPwdForm.newPwd=""
      this.forgetPwdForm.confirmNewPwd=""
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
  .forgetpwd {
    background-color: #ffffffbb;
    padding-top: 50px;
    padding-left: 100px;
    padding-right: 100px;
    position: fixed;
    top: calc(50% - 270px);
    left: calc(50% - 250px);
    width: 300px;
    height: 500px;
    z-index: 2;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
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
    height: 390px;
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
    top: calc(50% - 410px);
    left: calc(50% - 250px);
    width: 300px;

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
    margin-left: 35%;
    margin-right: 35%;
    padding-top: 25px;
    padding-bottom: 25px;
    background-color: #ffffff66;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .mybtn {
    width: 120px;
    height: 50px;
  }
  .el-form-item{
    margin-bottom: 0px;
}
}
</style>
