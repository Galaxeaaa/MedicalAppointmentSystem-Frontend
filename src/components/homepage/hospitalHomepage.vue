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
          <h3 style="text-align: left;"> 医院信息 </h3>
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
                <span> {{detailForm.rank}} </span>
              </div>
            </el-row>

            <el-row :span="1">
              <span style="font-size: 14px;"> 地址： </span>
              <span> {{detailForm.address}} </span>
            </el-row>

            <el-row :span="1">
              <span style="font-size: 14px;"> 联系方式： </span>
              <span> {{detailForm.contact}} </span>
            </el-row>

            <el-row :span="1">
              <span style="font-size: 14px;"> 简介： </span>
              <span> {{detailForm.introduction}} </span>
            </el-row>

          </el-col>
        </el-row>

        <el-divider></el-divider>

        <el-row :span="7">
          <h3 style="text-align: left;"> 下属科室 </h3>
          <el-table :data="indepartments" border style="width: 100%">
            <el-table-column
              sortable
              prop="departmentName"
              label="科室名"
              width="180">
            </el-table-column>
            <el-table-column
              sortable
              prop="score"
              label="评分"
              width="180">
            </el-table-column>
            <el-table-column
              sortable
              prop="introduction"
              label="科室简介"
              width="400">
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="gotoDepartment(scope.row.departmentName)" type="text" size="small">查看更多</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>

        <el-row :span="7">
          <h3> 医院评价 </h3>
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
      // 1. hospitalName：医院的姓名 (从上一个跳转入口进入，跳转入口将会提供医院的姓名)
      // 2. detaileForm：通过数据库接口获取的，该医院的详细信息，包括：
      //  2.1 hospitalName
      //  2.2 rank 等级
      //  2.3 address 医院地址
      //  2.4 contact 联系方式
      //  2.5 score 评分
      //  2.6 introduction 医院简介
      // 3. evalue：患者的评价信息
      // 4. indepartments：包含的科室信息
      hospitalName: "浙江大学医学院附属妇产科医院",   // 从上一个跳转界面获得的医生姓名
      detailForm: {     // 从数据库API获得的医生信息
        name: "浙江大学医学院附属妇产科医院",
        rank: "三级甲等",
        address: "浙江省杭州市学士路1号",
        contact: "0571-87061501",
        introduction: "浙江大学医学院附属妇产科医院（浙江省妇女保健院、浙江省妇女医院），是浙江省妇产科医疗、教学、科研及计划生育、妇女保健工作的指导中心。",
        score: 3.5,
      },
      indepartments: [
        {
          departmentName: "产科专家",
          introduction: "生理产科的定期检查和监护；妊娠期高血压疾病，前置胎盘，妊娠期肝病，妊娠期糖尿病，多胎妊娠及其并发症，胎儿生长受限和先兆早产等常见病理产科的诊治。",
          score: 5.0,
        },
        {
          departmentName: "特需营养咨询专家",
          introduction: "主要针对妊娠期糖尿病（GDM）、妊娠期肥胖以及妊娠期体重增加过快孕妇等进行一对一营养指导",
          score: 3.0,
        },
      ],
      evalue: [
        {
          userId: "用户1",
          time: "2020-11-01",
          comment: "良心医院",
        },
        {
          userId: "用户2",
          time: "2020-05-01",
          comment: "该院服务差",
        }
      ],

    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    // TODO：修改具体的跳转地址到 科室地址
    gotoDepartment(dp_name) {
      console.log("goto department", dp_name);
      this.$router.push({
          name: 'DepartmentHomepage',
          params: {
            departmentName: dp_name,
          }
        })
    },
    getDetail() {
      this.hospitalName = this.$route.params.hospitalName;
      // TODO
      this.detailForm.name = this.hospitalName;
      // 1.根据hospitalName调用数据库接口获取detailForm
      // 2.根据hospitalName调用数据库接口获取evalue
    }
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