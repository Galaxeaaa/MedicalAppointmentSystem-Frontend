<template>
  <div id='where_to'>
    <div class='img'>
      <div class='choose_where_to'>
        <h1>请选择要打开的页面</h1>
        <div class='where_to_btn_back'>
          <el-button type="primary" @click='clickpersonal'>个人中心</el-button>
          <el-button type="primary" @click='clicksearch'>搜索</el-button>
          <el-button type="primary" @click='clickforum'>论坛</el-button>
          <br></br>
          <el-button-group>
            <el-button type="primary" @click='clickdoctor'>医生主页</el-button>
            <el-button type="primary" @click='clickdepartment'>科室主页</el-button>
            <el-button type="primary" @click='clickhospital'>医院主页</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickpersonal () {
      console.log('Personal!')
      this.$router.push('/person')
    },
    clicksearch () {
      console.log('Search!')
    },
    clickforum () {
      console.log('Forum!')
    },

    clickdoctor () {
      this.$router.push({
          name: 'DoctorHomepage',
          params: {
            doctorName: "test_doctor_name",
          }
        })
    },
    clickdepartment () {
      this.$router.push({
          name: 'DepartmentHomepage',
          params: {
            departmentName: "test_dept_name",
          }
        })
    },
    clickhospital () {
      this.$router.push({
          name: 'HospitalHomepage',
          params: {
            hospitalName: "test_hospital_name",
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#where_to {
  .img{
    width: 100%;
    height: 100%;
    position: fixed;
    background: url('~@/assets/img/2.jpg') center center no-repeat;
    background-size: 100% 100%;
  }
  .choose_where_to{
    margin-top: 150px;
    h1 {
        font-size: 32px;
    }
  }
  .where_to_btn_back{
    margin-top: 66px;
    margin-left: 25%;
    margin-right: 25%;
    padding-top: 25px;
    padding-bottom: 25px;
    background-color: #ffffff66;
    border-top-right-radius:10px;
    border-top-left-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
  }
}
</style>
