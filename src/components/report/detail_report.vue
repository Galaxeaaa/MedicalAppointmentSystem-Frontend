<template>
  <div id="detail_report">
    <el-header class="header">
      <p>
        姓名：
        <span>{{ this.reportData.usr_name }}</span>
      </p>
      <p>
        主治医师：
        <span>{{ this.reportData.doctor_name }}</span>
      </p>
      <p>
        就诊科室：
        <span>{{ this.reportData.department }}</span>
      </p>
      <p>
        诊断结果：
        <span>{{ this.reportData.disease }}</span>
      </p>
      <p>
        检查时间：
        <span>{{ this.reportData.rep_time }}</span>
      </p>
    </el-header>
    <el-divider></el-divider>
    <el-main class="header">
      <p>
        病情诊断详细描述：
        <span>
          {{ this.reportData.disease_descr }}
        </span>
      </p>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reportData: [],
      revise: false,
      copyReportMessage: "",
      id: this.$route.query.id,
    };
  },

  created() {
    this.getReportMessage();
  },

  methods: {
    getReportMessage() {
      this.$axios
        .get(
          "/do/report/getreports?usr=" +
            this.$store.state.userid +
            "&role=" +
            this.$store.state.role
        )
        .then((res) => {
          this.reportData = res.data.filter((item) => item.id == this.id)[0];
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
#detail_report {
  position: relative;
  top: 20px;
  .detail {
    height: 100%;
  }
  .header {
    display: flex;
    justify-content: space-between;
    p {
      color: #797979;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: #333;
      }
    }
  }
  .main {
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
        color: #797979;
        display: flex;
        justify-content: left;
        align-items: left;
      }
      .revise_con {
        flex: 1;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    p {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
<style lang="scss">
.el-message-box {
  width: auto !important;
}
//   注意 修改element-ui弹窗的样式不能在添加了scoped的style中修改，解决方法：另写一个style添加样式
</style>
