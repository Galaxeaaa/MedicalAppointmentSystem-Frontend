<template>
  <div id="checkReport">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <!-- <el-form-item>
        <el-input
          v-model="formInline.userName"
          placeholder="请输入患者姓名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="formInline.date"
          type="date"
          :value="null ? '' : formInline.date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-select v-model="formInline.duration" placeholder="请选择时间范围">
          <el-option label="近一个月" value="1"> </el-option>
          <el-option label="近三个月" value="2"> </el-option>
          <el-option label="近半年" value="3"> </el-option>
          <el-option label="近一年" value="4"> </el-option>
          <el-option label="全部" value="5"> </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
        <el-input
          v-model="formInline.item"
          placeholder="请输入检查项目"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" circle></el-button>
      </el-form-item> -->
    </el-form>

    <el-table :data="tables" style="width: 100%">
      <el-table-column
        prop="usr_name"
        label="姓名"
      ></el-table-column>
      <el-table-column prop="doctor_name" label="主治医师">
      </el-table-column>
      <el-table-column prop="department" label="就诊科室"> </el-table-column>
      <el-table-column prop="disease" label="诊断结果"> </el-table-column>
      <!-- <el-table-column prop="disease_descr" label="诊断描述"> </el-table-column> -->
      <el-table-column
        prop="rep_time"
        label="检查时间"
      ></el-table-column>
      <el-table-column prop="reg_state" label="预约状态">
        <template slot-scope="scope">
          <span>{{
            scope.row.reg_state == 1 ? "已预约" : "未预约"
          }}</span></template
        >
      </el-table-column>
      <!-- <el-table-column label="性别" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.gender == 1 ? "男" : "女" }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="age" label="年龄" width="60"> </el-table-column> -->
      <!-- <el-table-column prop="diType" label="诊断类型">
        <template slot-scope="scope">
          <span>{{ scope.row.diType == 1 ? "初诊" : "复诊" }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="rep_time" label="检查时间" width="180">
      </el-table-column> -->

      <el-table-column prop="done" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="checkDetail(scope.row)">
            详情
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click="delReport(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 使用element-ui里的表格展示请求到的数据 -->

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
        duration: "",
      },
      //定义查询的表单元素
      reportData: [],
      //报告列表数据

      currentPage: 1,
      //当前点击页码数
      pageSize: 10,
      //每页展示数目
      curTime: "",
    };
  },
  created: function () {
    this.getReportList();
    this.curTime = new Date();
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
        .get(
          "/do/report/getreports?usr=" +
            this.$store.state.userid +
            "&role=" +
            this.$store.state.role
        )
        // .get("/do/report/getreports?usr=008&role=doctor")
        .then((res) => {
          this.reportData = res.data;
          console.log("Current username: " + this.$store.state.userid);
          console.log(this.reportData);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    delReport(id) {
      if (confirm("确定要删除吗？") == true) {
        console.log(id);
        this.$axios
          .get("/do/report/delreport?id=" + id)
          .then(this.getReportList())
          .catch(function (error) {
            console.log(error);
          });
        console.log(this.reportData);
      }
    },
    checkDetail(row) {
      this.$router.push({
        path: "/person/report/detail",
        query: { id: row.id},
      });
    },
    // getReportList() {
    //   this.$http("/ds1/checkreport/getCheckReportList", "post", {
    //     pageNo: this.currentPage,
    //     pageSize: 10,
    //   }).then((res) => {
    //     this.reportData = res.result;
    //   });
    // },
    //请求报告列表数据
  },
  computed: {
    tables() {
      var newData = this.reportData.filter((item) => {
        var diff;
        switch (this.formInline.duration) {
          case "1":
            diff = 30 * 24 * 3600 * 1000;
            break;
          case "2":
            diff = 90 * 24 * 3600 * 1000;
            break;
          case "3":
            diff = 180 * 24 * 3600 * 1000;
            break;
          case "4":
            diff = 365 * 24 * 3600 * 1000;
            break;
          case "5":
            diff = 200 * 365 * 24 * 3600 * 1000;
            break;
          default:
            diff = 200 * 365 * 24 * 3600 * 1000;
            break;
        }
        return this.curTime - new Date(item.rep_time).getTime() < diff;
        // return item.rep_time.includes(
        //   this.formInline.date == null ? "" : this.formInline.date
        // );
      });
      newData.sort(
        (a, b) =>
          new Date(a.rep_time).getTime() - new Date(b.rep_time).getTime()
      );
      return newData;
    },
    //根据查询条件过滤报告列表数据
  },
};
</script>
<style lang="scss">
#checkReport {
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
