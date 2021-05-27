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
              <el-link type="primary" @click="gotoDepartment(detailForm.department)">{{detailForm.department}}</el-link>
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
              prop="time"
              label="评价时间"
              width="180">
            </el-table-column>
            <el-table-column
              sortable
              prop="userId"
              label="用户姓名"
              width="180">
            </el-table-column>
            <el-table-column
              sortable
              prop="comment"
              label="评价"
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
export default {
  data() {
    return {
      hospitalUrl: "",
      departmentUrl: "",
      picUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      // 这里是数据信息
      // 需要
      // 1. doctorName：医生的姓名 (从上一个跳转入口进入，跳转入口将会提供医生的姓名)
      // 2. detailForm：通过数据库接口获取的，该医生的详细信息，包括：
      //  2.1 doctorName
      //  2.2 title 职称
      //  2.3 dept 所属科室
      //  2.4 hospital 所属医院
      //  2.5 medicine 擅长科目
      //  2.6 introduction 个人简介
      //  2.7 project 开展项目
      //  2.8 registID 挂号信息ID
      //  2.9 registerSum
      //  2.10 score 医生评分
      //  2.11 evalue 患者评价
      // 3. evalue：患者的评价信息
      doctorName: "冯磊",   // 从上一个跳转界面获得的医生姓名
      detailForm: {     // 从数据库API获得的医生信息
        name: "冯磊",
        title: "主任医师",
        hospital: "浙江大学医学院附属妇产科医院",
        department: "特需营养咨询专家",
        medicine: "代谢性疾病 糖尿病 肥胖 营养 体重管理",
        introduction: "代谢性疾病的健康评估、营养干预和健康管理，尤其在糖尿病和肥胖人群的营养干预和体重管理方面造旨深厚。",
        score: 3.5,
      },
      evalue: [
        {
          userId: "用户1",
          time: "2020-11-01",
          comment: "医生很敬业",
        },
        {
          userId: "用户2",
          time: "2020-05-01",
          comment: "回复慢",
        }
      ],

    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    gotoDepartment(dp_name) {
      console.log("goto department", dp_name);
      this.$router.push({
          name: 'DepartmentHomepage',
          params: {
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
      this.doctorName = this.$route.params.doctorName;

      // TODO
      this.detailForm.name = this.doctorName;
      // 1.根据doctorName调用数据库接口获取detailForm
      // 2.根据doctorName调用数据库接口获取evalue
    }
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