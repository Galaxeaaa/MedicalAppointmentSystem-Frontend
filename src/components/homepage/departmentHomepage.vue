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

            <el-row :span="1">
              <span style="font-size: 14px;"> 简介： </span>
              <span> {{detailForm.introduction}} </span>
            </el-row>

          </el-col>
        </el-row>

        <el-divider></el-divider>

        <el-row :span="7">
          <h3 style="text-align: left;"> 科室医生 </h3>
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
        </el-row>

        <el-row :span="7">
          <h3> 科室评价 </h3>
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
      // 1. departmentName：科室名 (从上一个跳转入口进入，跳转入口将会提供科室名)
      // 2. detaileForm：通过数据库接口获取的，该医生的详细信息，包括：
      //  2.1 doctorName
      //  2.4 hospital 所属医院
      //  2.6 introduction 科室简介
      //  2.10 score 科室评分
      // 3. indoctors：科室包含的医生
      departmentName: "特需营养咨询专家",   // 从上一个跳转界面获得的科室名
      detailForm: {     // 从数据库API获得的科室信息
        name: "特需营养咨询专家",
        hospital: "浙江大学医学院附属妇产科医院",
        introduction: "主要针对妊娠期糖尿病（GDM）、妊娠期肥胖以及妊娠期体重增加过快孕妇等进行一对一营养指导",
        score: 3.5,
      },
      indoctors: [
        {
          doctorName: "冯磊",
          title: "主任医师",
          medicine: "代谢性疾病的健康评估、营养干预和健康管理",
        },
        {
          doctorName: "赵柏惠",
          title: "副主任医师",
          medicine: "前置胎盘，宫颈机能不全，子宫肌瘤，盆腔脏器脱垂，等妇产科疾病",
        }
      ],
      evalue: [
        {
          userId: "用户1",
          time: "2020-11-01",
          comment: "科室很不错",
        },
        {
          userId: "用户2",
          time: "2020-05-01",
          comment: "效率低的科室",
        }
      ],

    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    // TODO：修改具体的跳转地址到 医院地址 科室地址
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
      this.departmentName = this.$route.params.departmentName;
      // TODO
      this.detailForm.name = this.departmentName;
      // 1.根据departmentName调用数据库接口获取detailForm
      // 2.根据departmentName调用数据库接口获取indoctors
      // 3.根据departmentName调用数据库接口获取evalue
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
