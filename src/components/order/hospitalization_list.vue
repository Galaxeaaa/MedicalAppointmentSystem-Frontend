<template>
  <div id="hospitalizationList">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item>
        <el-input
          v-model="formInline.id"
          placeholder="请输入医生id"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="formInline.date"
          type="date"
          :value="null ? '' : formInline.date"
          placeholder="选择入院时间"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="formInline.department"
          placeholder="请输入科室"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="formInline.hospital"
          placeholder="请输入医院"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          circle
        ></el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tables"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      ref="multipleTable"
    >
      <el-table-column
        type="selection"
        width="55"
      > </el-table-column>
      <el-table-column label="医生姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="科室">
        <template slot-scope="scope">
          <span>{{ scope.row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院">
        <template slot-scope="scope">
          <span>{{ scope.row.hospital }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评分">
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="id">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.registerTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已预约">
        <template slot-scope="scope">
          <span>{{ scope.row.registerSum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="done"
        label="预约挂号"
      >
        <template slot-scope="scope">
          <i
            class="el-icon-news"
            @click="register(scope.row.id)"
          ></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="done"
        label="在线问诊"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="mask"
              v-if="showModal"
              @click="showModal = false"
            ></div>
            <div
              class="pop"
              v-if="showModal"
            >
              <img src="../../assets/img/qrcode.png" />
              <button
                @click="showModal = false"
                class="appoint_btn"
              >取消预约X</button>
              <button
                @click="$router.push({path: '/person/chat/chatroom'})"
                class="appoint_btn"
              >预约成功!</button>
            </div>
            <i
              @click="showModal=true"
              class="el-icon-service"
            ></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 使用element-ui里的表格展示请求到的数据 -->
    <br />
    <br />
    <br />
    <br />

    <el-pagination
      class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="100"
    >
    </el-pagination>
    <!-- 分页效果 -->
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      formInline: {
        id: "",
        department: "",
        hospital: "",
        date: "",
        showModal: false,
      },
      //定义查询的表单元素

      currentPage: 1,
      //当前点击页码数
      pageSize: 10,
      //每页展示数目

      multipleSelection: [],
      // 被选中的列表数据

      hospitalList: [],

      doctorData: [],
    };
  },
  mounted() {
    this.getHospitalList();
  },
  //进入页面请求报告列表数据
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }, //点击分页时改变当前页码，重新请求数据
    betchDel() {
      //批量删除
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    register(val) {
      this.$axios
        .get("/do/getinfo/isregister", {
          params: {
            id: val,
          },
        })
        .then(function (response) {
          if (response == false) {
            axios.get("/do/addinfo/setregister", {
              params: {
                id: val,
              },
            });
            alert("挂号成功！");
          } else {
            alert("挂号失败，时间冲突！");
          }
        });
      return this.hospitalList;
    },

    getHospitalList() {
      /*this.hospitalList = [
        {
          id: 1,
          doctorname: "王医生",
          heading: "主治医师",
          birthday: "1976-05-23 00:00:00",
          comment: null,
          star: 4,
          total: 5,
          state: 2,
          date: "2021-05-24 00:00:00",
          departmentinfo:{
            id: 34,
            departmentname: "眼科",
            comment: null,
          },
          hospitalinfo:{
            id: 35,
            hospitalname: "杭州第一医院",
            comment: null,
          },
        },*/
      this.$axios
        //.get("/do/getinfo/doctor?id=" + this.formInline.id)
        .get("/do/getinfo/doctorall")
        .then((res) => {
          this.hospitalList = res;
          console.log("Current doctorname: " + this.formInline.id);
          console.log(this.doctorData);
        })
        .catch(function (error) {
          console.log(error);
        });

      // this.$http("/medicalrecord/list", "post", {
      //   pageNo: this.currentPage,
      //   pageSize: 10,
      // }).then((res) => {
      //   this.cottomsList = res.result.list;
      // });
    },
  },
  computed: {
    tables() {
      /* this.$axios
          //.get("/do/getinfo/doctor?id=" + this.formInline.id)
          .get("/do/getinfo/doctor?id=002")
          .then((res) => {
            this.hospitalList = res;
            this.$forceUpdate();
            console.log("Current doctorname: " + this.formInline.id);
            console.log(this.doctorData)
          })
          .catch(function (error) {
            console.log(error);
          });*/
      this.$axios
        .get("/do/getinfo/doctor", {
          params: {
            id: this.formInline.id,
            department: this.formInline.department,
          },
        })
        .then((res) => {
          //   console.log("res:"+res.data);
          this.hospitalList = res.data;
          this.$forceUpdate();
          console.log("Current doctorname: " + this.formInline.id);
          console.log(this.doctorData);
        });
      return this.hospitalList;
    },
    // 根据查询条件过滤报告列表数据,
  },
};
</script>
<style lang="scss">
#hospitalizationList {
  position: relative;
  .el-input__inner {
    border-radius: 20px;
  }

  .mask {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .pop {
    background-color: #b0c7e4;
    padding: 50px;
    position: fixed;
    top: 100px;
    left: 500px;
    width: 350px;
    height: auto;
    z-index: 2;
  }

  .page {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
  }

  .beatch_remove {
    position: absolute;
    bottom: 20px;
    left: 50px;
  }

  .appoint_btn {
    margin: 20px;
    background-color: #eefbff;
    color: #42557b;
    border: 0;
    height: 40px;
    width: 75px;
  }

  .el-form--inline .el-form-item,
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 150px;
  }
}
</style>
