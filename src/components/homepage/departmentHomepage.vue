<template>
  <div id="doctorInfo">
    <el-container>
      <el-header class="header">
        <h1>科室主页</h1>
      </el-header>

      <el-divider></el-divider>

      <el-main>
      <el-col>
        <el-row :span="3">
          <h3 style="text-align: left;"> 科室信息 </h3>
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
              <span style="font-size: 14px;"> 所属医院： </span>
              <el-link type="primary" @click="gotoHospital(detailForm.hospital)">{{detailForm.hospital}}</el-link>
            </el-row>

            <!-- <el-row :span="1">
              <span style="font-size: 14px;"> 简介： </span>
              <span> {{detailForm.introduction}} </span>
            </el-row> -->

          </el-col>
        </el-row>

        <el-divider></el-divider>

        <el-row :span="7">
          <h3 style="text-align: left;"> 科室医生 </h3>
          <el-table :data="indoctors" border style="width: 100%">
            <el-table-column
              sortable
              prop="name"
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
              label="擅长领域"
              width="200">
            </el-table-column>
            <el-table-column
              sortable
              prop="project"
              label="开展项目"
              width="200">
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="gotoDoctor(scope.row.name)" type="text" size="small">查看更多</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>

        <el-row :span="7">
          <h3 style="text-align: left;"> 科室评价 </h3>
          <el-table :data="evalue" border style="width: 100%">
           <el-table-column
              sortable
              prop="id"
              label="评价编号"
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
              prop="evaluation"
              label="评价内容"
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
              prop="datetime"
              label="公告时间"
              width="180">
            </el-table-column>
            <el-table-column
              sortable
              prop="message"
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
export default {
  data() {
    return {
      ifExist: true,
      picUrl: "",
      departmentName: "",   // 从上一个跳转界面获得的科室名
      detailForm: {     // 从数据库API获得的科室信息
        name: "",
        hospital: "",
        introduction: "",
        score: 0,
      },
      indoctors: [
        {
          doctorName: "",
          title: "",
          medicine: "",
        },
        {
          doctorName: "",
          title: "",
          medicine: "",
        }
      ],
      evalue: "",
      billboard: "",

    };
  },
  mounted() {
    // 接口：
    // getDeptInfo
    // getDeptDoctor
    this.departmentName = this.$route.params.departmentName;
    this.hospitalName = this.$route.params.hospitalName;
    this.getDetail();
    if(this.ifExist) {
      this.getInDoctors();
      this.getEvalue();
      this.getBillboard();
    }

  },
  methods: {
    gotoDoctor(dt_name) {
      console.log("goto doctor", dt_name);
      this.$router.push({
          name: 'DoctorHomepage',
          params: {
            doctorName: dt_name,
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
      axios({
        method: 'post',
        url: 'http://121.196.221.194:8088/getDeptInfo',
        data: { 
          deptName : this.departmentName,
          hospName : this.hospitalName,
        }
      })
      .then((res) => {
        // console.log("下面是从axios中获取的data:")
        // console.log(res.data)
        if(res.data.length==0) {
          var error_info = "抱歉，该科室(" + this.departmentName + ")不存在!"
          alert(error_info)
          this.ifExist = false
        } else {
          this.detailForm.name = res.data[0].name
          this.detailForm.score = res.data[0].scoreAvg / 2.0
          // this.detailForm.score = res.data[0].score * 5.0 / 100
          this.detailForm.hospital = res.data[0].hosp_name
          // console.log(this.detailForm)
        }
      })
    },
    getInDoctors() {
      axios({
        method: 'post',
        url: 'http://121.196.221.194:8088/getDeptDoctor',
        data: { 
          deptName : this.departmentName,
          hospName : this.hospitalName,
        }
      })
      .then((res) => {
        this.indoctors = res.data
        console.log("下属医生:")
        console.log(this.indoctors)
      })
    },
    getEvalue() {
      axios({
        method: 'post',
        url: 'http://121.196.221.194:8088/getDeptEva',
        data: { 
          deptName : this.departmentName,
          hospName : this.hospitalName,
        }
      })
      .then((res) => {
        this.evalue = res.data
        // console.log("评价:")
        // console.log(this.evalue)
      })
    },
    getBillboard() {
      axios({
        method: 'post',
        url: 'http://121.196.221.194:8088/getDeptAnno',
        data: { 
          deptName : this.departmentName,
          hospName : this.hospitalName,
        }
      })
      .then((res) => {
        this.billboard = res.data
        // console.log("公告:")
        // console.log(this.billboard)
      })
    },
  }
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
