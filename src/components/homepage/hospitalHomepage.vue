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

            <el-row :span="1">
              <span style="font-size: 14px;"> 营业时间： </span>
              <span> {{detailForm.timeperiod}} </span>
            </el-row>

            <el-row :span="1">
              <span style="font-size: 14px;"> 注意事项： </span>
              <span> {{detailForm.notice}} </span>
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
        </el-row>

        <el-row :span="7">
          <h3 style="text-align: left;"> 医院评价 </h3>
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


        <el-row :span="7">
          <h3 style="text-align: left;"> 公告栏 </h3>
          <el-table :data="billboard" border style="width: 100%">
            <el-table-column
              sortable
              prop="time"
              label="公告时间"
              width="180">
            </el-table-column>
            <el-table-column
              sortable
              prop="content"
              label="公告内容"
              width="700">
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
      picUrl: this.$route.params.hospitalName=="浙江大学医学院附属妇产科医院" ? "https://tva1.sinaimg.cn/large/008i3skNly1gr9py9ntpnj605003mmx202.jpg" :
                    (this.$route.params.hospitalName=="北京第一医院 " ? "https://tva1.sinaimg.cn/large/008i3skNly1gr9pycgkf1j305003rglh.jpg" : 
                      (this.$route.params.hospitalName=="浙大附属二院" ?  "https://tva1.sinaimg.cn/large/008i3skNly1gr9py5xpdij305005n3yj.jpg" : 
                        "https://tva1.sinaimg.cn/large/008i3skNly1gr9py5xpdij305005n3yj.jpg"
                      )
                    ),
      hospitalName: "浙江大学医学院附属妇产科医院",   // 从上一个跳转界面获得的医生姓名
      detailForm: {     // 从数据库API获得的医生信息
        name: "浙江大学医学院附属妇产科医院",
        rank: "三级甲等",
        address: "浙江省杭州市学士路1号",
        contact: "0571-87061501",
        introduction: "浙江大学医学院附属妇产科医院（浙江省妇女保健院、浙江省妇女医院），是浙江省妇产科医疗、教学、科研及计划生育、妇女保健工作的指导中心。",
        score: 3.5,
        timeperiod: "7:30 ~ 23:30(平时)\n9:00~22:00(假期)",
        notice: "本医院医保覆盖。生化验血前请保持空腹。",
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

      indoctors: [
        {
          doctorName: "冯磊",
          title: "主任医师",
          medicine: "代谢性疾病的健康评估、营养干预和健康管理",
        },
      ],

      billboard: [
        {
          time: "2000-11-01",
          content: "该医院————浙江大学医学院附属妇产科医院（浙江省妇女保健院、浙江省妇女医院），是浙江省妇产科医疗、教学、科研及计划生育、妇女保健工作的指导中心",
        },
        {
          time: "2015-10-01",
          content: "本医院国庆节休假三天",
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
    gotoDoctor(dt_name) {
      console.log("goto doctor", dt_name);
      this.$router.push({
          name: 'DoctorHomepage',
          params: {
            doctorName: dt_name,
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