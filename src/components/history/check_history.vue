<template>
  <div id="checkHistory">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <!-- <el-form-item>
        <el-input
          v-model="formInline.userName"
          placeholder="请输入患者姓名"
        ></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-date-picker
          v-model="formInline.date"
          type="date"
          :value="null ? '' : formInline.date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="formInline.item"
          placeholder="请输入检查项目"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" circle></el-button>
      </el-form-item>
    </el-form>

    <el-table :data="historyData" style="width: 100%">
      <el-table-column prop="doctor" label="主治医师"> </el-table-column>
      <el-table-column prop="case" label="患病信息"> </el-table-column>
      <el-table-column prop="advice" label="医嘱信息"> </el-table-column>
      <el-table-column prop="check" label="检验结果核查"> </el-table-column>
      <el-table-column prop="op_record" label="手术记录"> </el-table-column>
      <el-table-column prop="nur_record" label="护理记录"> </el-table-column>
    </el-table>

    <!-- <el-pagination
      class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      background
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="100"
    >
    </el-pagination> -->
    <!-- 分页效果 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        userName: "",
        item: "",
        date: "",
      },
      //定义查询的表单元素
      historyData: [],
      //报告列表数据

      currentPage: 1,
      //当前点击页码数
      pageSize: 10,
      //每页展示数目
    };
  },
  created: function () {
    this.getReportList();
  },
  //进入页面请求报告列表数据
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getReportList();
    }, //点击分页时改变当前页码，重新请求数据
    getReportList() {
      this.$axios
        // .get("/do/report/getreports?usr=" + this.$store.state.username + "&role=" + this.$store.state.username)
        .get("/do/history/gethistory?name=艾什")
        .then((res) => {
          this.historyData = res;
          console.log("Current username: " + this.$store.state.username);
          //   console.log(this.historyData)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // getReportList() {
    //   this.$http("/ds1/checkreport/getCheckReportList", "post", {
    //     pageNo: this.currentPage,
    //     pageSize: 10,
    //   }).then((res) => {
    //     this.historyData = res.result;
    //   });
    // },
    //请求报告列表数据
  },
  computed: {
    tables() {
      return this.historyData;
      //   .filter((item) => {
      //     return
      //   item.conName.includes(this.formInline.userName) &&
      //   item.insp.includes(this.formInline.item) &&
      //   item.seektime.includes(
      //     this.formInline.date == null ? "" : this.formInline.date
      //   )
      //   });
    },
    //根据查询条件过滤报告列表数据
  },
};
</script>
<style lang="scss">
#checkHistory {
  position: relative;
  top: 20px;
  .el-input__inner {
    border-radius: 20px;
  }
  .page {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    bottom: -20px;
  }
}
</style>
