<template>
  <div id="add_report">
    <el-container class="detail">
      <header class="header">
        <el-form :inline="true" :model="Report" class="demo-form-inline">
          <el-form-item label="患者ID">
            <el-input v-model="Report.usr_id" placeholder="请输入" ></el-input>
          </el-form-item>
          <el-form-item label="患者姓名">
            <el-input v-model="Report.usr_name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="就诊科室">
            <el-input v-model="Report.department" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="预约状态">
            <el-select v-model="Report.reg_state" placeholder="请选择">
              <el-option label="已预约" value="已预约"></el-option>
              <el-option label="未预约" value="未预约"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </header>
      <el-main class="main">
        <div>
          <span> 诊断结果：</span>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="Report.disease"
            class="revise_con"
            resize="none"
          >
          </el-input>
        </div>
        <div>
          <span> 详情：</span>
          <el-input
            type="textarea"
            :rows="15"
            placeholder="请输入内容"
            v-model="Report.disease_descr"
            class="revise_con"
            resize="none"
          >
          </el-input>
        </div>
      </el-main>
      <el-footer class="footer">
        <div class="foodiv">
          <el-button type="primary" @click="clickSave" >保存</el-button>
          <el-button type="warning" @click="clickCancel">取消</el-button>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Report : {
        usr_id : '',
        usr_name : '',
        doctor_id : '',
        doctor_name : '',
        department : '',
        disease : '',
        disease_descr : '',
        rep_time : '',
        reg_state : '',
      }
    };
  },

  methods: {
    clear_reload(){
      this.Report.usr_id='';
      this.Report.usr_name='';
      this.Report.doctor_id='';
      this.Report.doctor_name='';
      this.Report.department='';
      this.Report.disease='';
      this.Report.disease_descr='';
      this.Report.rep_time='';
      this.Report.reg_state='';
      this.$router.push('/person/report/add')
    },
    clickSave(){
      console.log("save!")
      //get doc id name and time
      this.Report.doctor_id=this.$store.state.userid
      this.Report.doctor_name=this.$store.state.username
      this.Report.rep_time=new Date().toLocaleString()
      var tmp = this.Report.reg_state;
      if(this.Report.reg_state=="已预约") this.Report.reg_state="true"
      else this.Report.reg_state="false"
      console.log(this.Report)
      this.$axios.post('/do/report/addreport', this.Report)
      .then((response) => {
        console.log(response)
        // status=response.status;
        // console.log(status)
        if(response) {
          console.log('success')
          this.$message({
            message: "保存成功",
            type: "success",
          })
          this.Report.reg_state=tmp
          this.clear_reload()
        }else{
          console.log('failed')
          this.$message({
            message: "保存失败",
            type: "error",
          })
          this.Report.reg_state=tmp
        }
      });
      this.Report.reg_state=tmp
    },
    clickCancel(){
      console.log("cancel!")
      this.clear_reload()
    }
  },
};
</script>
<style lang="scss" scoped>
#add_report {
  position: relative;
  top: 20px;
  .detail {
    height: 100%;
  }
  .header {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    height: 30px;
    margin-left: 67px;
    // .el-input__inner {
    //   height: 25px;
    //   width: 100px;
    // }
    // p {
    //   color: #797979;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    //   span {
    //     color: #333;
    //   }
    // }
  }
  .main {
    color: #333;
    display: flex;
    flex-direction: column;
    > div {
      flex: 1;
      display: flex;
      margin-bottom: 13px;
      span {
        display: inline-block;
        width: 100px;
        text-align: right;
      }
      p {
        flex: 1;
      }
      .revise_con {
        flex: 1;
      }
      .bigtext {
        height: 100px;
      }
    }
  }
  .footer {
    height: 40px !important;
    display: flex;
    .foodiv{
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
<style lang="scss">
#add_report {
  .el-message-box {
    width: auto !important;
  }
  //   注意 修改element-ui弹窗的样式不能在添加了scoped的style中修改，解决方法：另写一个style添加样式
  .header .el-input__inner{
    height: 30px;
  }
  .header .el-form-item__content {
    width: 105px;
  }
  .main .dis {
    height: 30px;
    .el-input {
      width: 160px;
      flex: 0 0 160px;
      margin-right: 15px;
    }
    .el-input__inner {
      height: 32px;
    }
  }
}
</style>
