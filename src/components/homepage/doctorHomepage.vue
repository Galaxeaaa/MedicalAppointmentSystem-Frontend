<template>
  <div id="DoctorHomepage">
    <el-container>
      <el-header class="header">
        <h1>医生个人主页</h1>
      </el-header>

      <el-divider></el-divider>

      <el-main>
      <el-col>
        <el-row :span="3">
          <h3 style="text-align: left;"> 个人信息 </h3>
          <el-col :span="6">
            <div>
              <el-avatar shape="square" :size="130" :fit="fit" :src="picUrl"></el-avatar>
            </div>
            <el-rate
              v-model="detailForm.score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </el-col>

          <el-col :span="17" style="text-align: left;">
            <el-row :span="1">
              <div>
                <h4 style="display: inline; font-size: 18px;">{{detailForm.name}}</h4>
                <span> {{detailForm.title}} </span>
              </div>
            </el-row>

            <el-row :span="1">
              <el-link type="primary" @click="gotoHospital(detailForm.hospital)">{{detailForm.hospital}}</el-link>
              <span> - </span>
              <el-link type="primary" @click="gotoDepartment(detailForm.hospital, detailForm.department)">{{detailForm.department}}</el-link>
            </el-row>


            <el-row :span="1">
              <span style="font-size: 14px;"> 联系电话： </span>
              <span> {{detailForm.tel}} </span>
            </el-row>
            <el-row :span="1">
              <span style="font-size: 14px;"> 总预约量： </span>
              <span> {{detailForm.registerSum}} </span>
            </el-row>
            <el-row :span="1">
              <span style="font-size: 14px;"> 开展项目： </span>
              <span> {{detailForm.project}} </span>
            </el-row>

            <el-row :span="1">
              <span style="font-size: 14px;"> 擅长： </span>
              <span> {{detailForm.medicine}} </span>
            </el-row>

            <el-row :span="1">
              <span style="font-size: 14px;"> 简介： </span>
              <span> {{detailForm.introduction}} </span>
            </el-row>

          </el-col>
        </el-row>

        <el-divider></el-divider>

        <el-row :span="7">
          <h3 style="text-align: left;"> 病人评价 </h3>
          <el-table :data="evalue" border style="width: 100%">
           <el-table-column
              sortable
              prop="id"
              label="评价编号"
              width="180">
            </el-table-column>
            <el-table-column
              sortable
              prop="datetime"
              label="评价时间"
              width="180">
            </el-table-column>
            <!-- <el-table-column
              sortable
              prop="userId"
              label="用户姓名"
              width="180">
            </el-table-column> -->
            <el-table-column
              sortable
              prop="message"
              label="评价"
              width="500">
            </el-table-column>
          </el-table>
        </el-row>

        <el-row :span="7">
          <h3 style="text-align: left;"> 公告栏 </h3>
          <el-table :data="billboard" border style="width: 100%">
            <el-table-column
              sortable
              prop="id"
              label="公告编号"
              width="180">
            </el-table-column>
            <el-table-column
              sortable
              prop="evaluation"
              label="公告内容"
              width="500">
            </el-table-column>
          </el-table>
        </el-row>

      </el-col>
      </el-main>

    </el-container>
  </div>
</template>

<script>
const axios = require('axios');
const default_url = "https://tva1.sinaimg.cn/large/008i3skNly1gr9pw3idhgj303w03wa9v.jpg";
export default {
  data() {
    return {
      ifExist: true,
      picUrl: "",
      doctorName: "",
      detailForm: {
        name: "",
        title: "",
        hospital: "",
        department: "",
        medicine: "",
        introduction: "",
        score: 0,

        // new
        tel: "",
        registerSum: 0, // 总预约量
        project: "",
        vx: null,
        email: "",

      },
      // 后端
      billboard: "",
      evalue: "",

    };
  },
  mounted() {
    // doctorName是用户想要看的医生姓名
    // 从route获取params之后，需要通过axios获取
    this.doctorName = this.$route.params.doctorName
    this.getDetail();
    if(this.ifExist) {
      this.getEvalue();
      this.getBillboard();
    }
  },
  methods: {
    gotoDepartment(hp_name, dp_name) {
      console.log("goto department", dp_name);
      this.$router.push({
          name: 'DepartmentHomepage',
          params: {
            hospitalName: hp_name,
            departmentName: dp_name,
          }
        })
    },
    gotoHospital(hp_name) {
      console.log("goto hospital", hp_name);
      this.$router.push({
          name: 'HospitalHomepage',
          params: {
            hospitalName: hp_name,
          }
        })
    },
    getDetail() {
      // 获取医生基本信息
      axios({
        method: 'post',
        url: 'http://121.196.221.194:8088/getDoctorInfo',
        data: { doctorName : this.doctorName}
      })
      .then((res) => {
        // console.log("axios-getDoctorInfo:")
        // console.log(res.data)
        if(res.data.length==0) {
          var error_info = "抱歉，该医生(" + this.doctorName + ")不存在!"
          this.ifExist = false;
          alert(error_info)
        } else {
          this.detailForm.name = res.data[0].name
          this.detailForm.title = res.data[0].title
          this.detailForm.hospital = res.data[0].hosp_name
          this.detailForm.department = res.data[0].depart_name
          // this.detailForm.score = res.data[0].score * 5.0 / 100
          this.detailForm.score = res.data[0].scoreAvg / 2.0
          this.detailForm.tel = res.data[0].tel
          this.detailForm.medicine = res.data[0].medicine
          this.detailForm.introduction = res.data[0].introduction
          this.detailForm.project = res.data[0].project
          this.detailForm.registerSum = res.data[0].registerSum
          this.detailForm.vx = res.data[0].vx
          this.detailForm.email = res.data[0].email
          this.picUrl = (res.data[0].graph == null) ? default_url : res.data[0].graph
          
          // console.log("下面是detailForm")
          // console.log(this.detailForm)
        }
      })
    },
    getEvalue() {
      // 获取医生评价
      axios({
        method: 'post',
        url: 'http://121.196.221.194:8088/getDoctorEva',
        data: { doctorName : this.doctorName}
      })
      .then((res) => {
        console.log("billboard:")
        this.billboard = res.data
        console.log(this.billboard)
      })
    },
    getBillboard() {
      // 获取医生公告栏、
      axios({
        method: 'post',
        url: 'http://121.196.221.194:8088/getDoctorAnno',
        data: { doctorName : this.doctorName}
      })
      .then((res) => {
        console.log("evalue:")
        this.evalue = res.data
        console.log(this.evalue)
      })
    },
  }
};
</script>

<style lang="scss" scoped>
  #DoctorHomepage {
    .header {
      // h1 {
      //   font-weight: normal;
      // }
      display: flex;
      justify-content: space-between;
    }
    .el-main {
      padding-top: 0;
      // text-align: left;
    }
    .el-col-8 {
      display: flex;
      flex-direction: column;
      // height: 70%;
    }
    .el-row {
      padding-top: 10px;
      padding-left: 5px;
      h3 {
        padding-bottom: 15px;  
      }
    }
    .el-rate {
      padding-top: 20px;
      padding-bottom: 20px;
    }
    .divider {
      height: 420px;
      padding-top: 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      // .el-divider {
      //   height: 50%;
      // }
    }
    .footer {
      display: flex;
      height: 40px;
      justify-content: center;
      p {
        width: 100px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        color: #fff;
      }
      p:nth-child(2) {
        background: #ccc;
        margin-left: 20px;
      }
    }
  }
</style>
<!--
<style lang="scss">
  #doctorInfo {
    .el-form-item__content {
      margin-left: 0px !important;
    }
    .el-form-item__label {
      width: 100% !important;
      text-align: left !important;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
  }
</style>
-->