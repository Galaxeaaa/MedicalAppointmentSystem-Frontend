<template>
  <div id="doctorInfo">
    <el-container>
      <el-header class="header">
        <h1>医院主页</h1>
      </el-header>

      <el-divider></el-divider>

      <el-main>
        <el-col>
          <el-row :span="3">
            <h3 style="text-align: left">医院信息</h3>
            <el-col :span="6">
              <div>
                <el-avatar
                  shape="square"
                  :size="130"
                  :fit="fit"
                  :src="picUrl"
                ></el-avatar>
              </div>
              <el-rate
                v-model="detailForm.score"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
            </el-col>

            <el-col :span="17" style="text-align: left">
              <el-row :span="1">
                <div>
                  <h4 style="display: inline; font-size: 18px">
                    {{ this.hospitalName }}
                  </h4>
                  <span> {{ detailForm.rank }} </span>
                </div>
              </el-row>

              <el-row :span="1">
                <span style="font-size: 14px"> 地址： </span>
                <span> {{ detailForm.address }} </span>
              </el-row>

              <!-- <el-row :span="1">
              <span style="font-size: 14px;"> 联系方式： </span>
              <span> {{detailForm.contact}} </span>
            </el-row> -->

              <el-row :span="1">
                <span style="font-size: 14px"> 简介： </span>
                <span> {{ detailForm.introduction }} </span>
              </el-row>

              <el-row :span="1">
                <span style="font-size: 14px"> 营业时间： </span>
                <span> {{ detailForm.timeperiod }} </span>
              </el-row>

              <el-row :span="1">
                <span style="font-size: 14px"> 医保是否覆盖： </span>
                <span> {{ detailForm.insur == true ? "是" : "否" }} </span>
              </el-row>
            </el-col>
          </el-row>

          <el-divider></el-divider>

          <el-row :span="7">
            <h3 style="text-align: left">下属科室</h3>
            <el-table :data="indepartments" border style="width: 100%">
              <el-table-column sortable prop="name" label="科室名" width="180">
              </el-table-column>
              <el-table-column sortable prop="score" label="评分" width="180">
              </el-table-column>
              <!-- <el-table-column
              sortable
              prop="introduction"
              label="科室简介"
              width="400">
            </el-table-column> -->
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="gotoDepartment(scope.row.name)"
                    type="text"
                    size="small"
                    >查看更多</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-row>

          <!-- <el-row :span="7">
          <h3 style="text-align: left;"> 金牌医生 </h3>
          <el-table :data="indoctors" border style="width: 100%">
            <el-table-column
              sortable
              prop="doctorName"
              label="医生姓名"
              width="180">
            </el-table-column>
            <el-table-column
              sortable
              prop="title"
              label="医生职称"
              width="180">
            </el-table-column>
            <el-table-column
              sortable
              prop="medicine"
              label="擅长项目"
              width="400">
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="gotoDoctor(scope.row.doctorName)" type="text" size="small">查看更多</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row> -->

          <el-row :span="7">
            <h3 style="text-align: left">医院评价</h3>
            <el-table :data="evalue" border style="width: 100%">
              <el-table-column sortable prop="id" label="评价id" width="180">
              </el-table-column>
              <!-- <el-table-column
              sortable
              prop="userId"
              label="用户姓名"
              width="180">
            </el-table-column> -->
              <el-table-column
                sortable
                prop="evaluation"
                label="评价内容"
                width="500"
              >
              </el-table-column>
            </el-table>
          </el-row>

          <el-row :span="7">
            <h3 style="text-align: left">公告栏</h3>
            <el-table :data="billboard" border style="width: 100%">
              <el-table-column sortable prop="id" label="公告编号" width="180">
              </el-table-column>
              <el-table-column
                sortable
                prop="datetime"
                label="公告时间"
                width="180"
              >
              </el-table-column>
              <el-table-column
                sortable
                prop="message"
                label="公告内容"
                width="500"
              >
              </el-table-column>
            </el-table>
          </el-row>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      ifExist: true,
      picUrl: "",
      hospitalName: "", // 从上一个跳转界面获得的医生姓名
      detailForm: {
        // 从数据库API获得的医生信息
        name: "",
        rank: "",
        address: "",
        // contact: "0571-87061501",
        introduction: "",
        score: 0,
        timeperiod: "",
        // notice: "本医院医保覆盖。生化验血前请保持空腹。",
        insur: true,
      },

      indepartments: [],

      billboard: "",
      evalue: "",
    };
  },
  mounted() {
    this.hospitalName = this.$route.params.hospitalName;
    this.getDetail();
    if (this.ifExist) {
      this.getInDept();
      this.getEvalue();
      this.getBillboard();
    }
  },
  methods: {
    gotoDepartment(dp_name) {
      // console.log("goto department", dp_name);
      this.$router.push({
        name: "DepartmentHomepage",
        params: {
          hospitalName: this.hospitalName,
          departmentName: dp_name,
        },
      });
    },
    gotoDoctor(dt_name) {
      console.log("goto doctor", dt_name);
      this.$router.push({
        name: "DoctorHomepage",
        params: {
          doctorName: dt_name,
        },
      });
    },
    getDetail() {
      // this.detailForm.name = this.hospitalName;
      axios({
        method: "post",
        url: "http://121.196.221.194:8088/getHospInfo",
        data: {
          hospName: this.hospitalName,
        },
      }).then((res) => {
        console.log("医院结果：");
        console.log(res.data);
        if (res.data.length == 0) {
          var error_info = "抱歉，该医院(" + this.hospitalName + ")不存在!";
          alert(error_info);
          this.ifExist = false;
        } else {
          this.detailForm.name = res.data[0].name;
          this.detailForm.rank = res.data[0].rank;
          this.detailForm.address = res.data[0].address;
          this.detailForm.introduction = res.data[0].introduct;
          this.detailForm.score = (res.data[0].score * 5.0) / 100;
          this.detailForm.timeperiod = res.data[0].time;
          this.detailForm.insur = res.data[0].mediacl_insur;
          this.picUrl = res.data[0].graph;
        }
      });
    },
    getInDept() {
      axios({
        method: "post",
        url: "http://121.196.221.194:8088/getHospDept",
        data: {
          hospName: this.hospitalName,
        },
      }).then((res) => {
        this.indepartments = res.data;
        console.log("下属科室:");
        console.log(this.indepartments);
      });
    },
    getEvalue() {
      axios({
        method: "post",
        url: "http://121.196.221.194:8088/getHospEva",
        data: {
          hospName: this.hospitalName,
        },
      }).then((res) => {
        this.evalue = res.data;
        // console.log("评价:")
        // console.log(this.evalue)
      });
    },
    getBillboard() {
      axios({
        method: "post",
        url: "http://121.196.221.194:8088/getHospAnno",
        data: {
          hospName: this.hospitalName,
        },
      }).then((res) => {
        this.billboard = res.data;
        // console.log("公告:")
        // console.log(this.billboard)
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#doctorInfo {
  .header {
    // h1 {
    //   font-weight: normal;
    // }
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    padding-top: 0;
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