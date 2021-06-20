<template>
    <div id="hospitalizationList">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="formInline.name"
                      placeholder="请输入医生姓名"></el-input>
          </el-form-item>
            <el-form-item>
                <el-date-picker v-model="formInline.date"
                                type="date"
                                :value="null ? '' : formInline.date"
                                placeholder="选择入院时间"
                                value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-input v-model="formInline.department"
                          placeholder="请输入科室"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="formInline.hospital"
                          placeholder="请输入医院"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" circle></el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tables"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  ref="multipleTable">

          <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="医生姓名" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  <i class="el-icon-info"
                     key="scope.row.name"
                     @click="toDoctor(scope.row.name)"></i>
                </template>
            </el-table-column>
          <el-table-column label="科室" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.department }}</span>
              <i class="el-icon-arrow-right"
                 key="scope.row.department"
                 @click="toDepartment(scope.row.department,scope.row.hospital)"></i>
            </template>
          </el-table-column>
          <el-table-column label="医院" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.hospital }}</span>
              <i class="el-icon-arrow-right"
                 key="scope.row.hospital"
                 @click="toHospital(scope.row.hospital)"></i>
            </template>
          </el-table-column>
          <el-table-column label="职称">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="主治">
            <template slot-scope="scope">
              <span>{{ scope.row.medicine }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间">
            <template slot-scope="scope">
              <span>{{ scope.row.registerTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="已预约/总量">
            <template slot-scope="scope">
              <span>{{ scope.row.registerSum }}</span>
              <span>{{ '/30' }}</span>
            </template>
          </el-table-column>
            <el-table-column prop="done" label="预约挂号" width="50">
                <template slot-scope="scope">
                    <i class="el-icon-news"
                       @click="register(scope.row.id,scope.row.registerTime,scope.row.name)"></i>
                </template>
            </el-table-column>
            <el-table-column prop="done" label="在线问诊" width="50">
                <template slot-scope="scope">
                    <i class="el-icon-service"
                       @click="
              $router.push({
                path: '/person/doctor/detail', //跳转进入新的界面
              })
            "></i>
                </template>
            </el-table-column>
        </el-table>
        <!-- 使用element-ui里的表格展示请求到的数据 -->
        <br />
        <br />
        <br />
        <br />

        <el-pagination class="page"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPage"
                       :page-size="10"
                       layout="prev, pager, next, jumper"
                       :total="100">
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
        name: "",
        department: "",
        hospital: "",
        date: "",
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
    toDoctor(val){
      this.$router.push({
        name:'DoctorHomepage',
        params:{
          doctorName:val
        }
      })
    },
    toDepartment(d,h){
      this.$router.push({
        name:'DepartmentHomepage',
        params:{
          hospitalName:h,
          departmentName:d
        }
      })
    },
    toHospital(h){
      this.$router.push({
        name:'HospitalHomepage',
        params:{
          hospitalName:h
        }
      })
    },
    register(val,t,d){
      this.$axios.get("/do/getinfo/isregister",{
        params:{
          id: val
        }
      })
      .then(function (response) {
        if (response.data >= 0) {
          axios.get("/do/addinfo/setregister",{
            params:{
              id: val
            }
          });
          alert("挂号成功！"+"挂号时间为："+t+",医生为："+d);
        } else {
          alert("挂号失败，时间冲突！");
        }
      })
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
          this.hospitalList = res.data;
          console.log("Current doctorname: " + this.formInline.id);
		  console.log(this.doctorData)
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
      this.$axios.get("/do/getinfo/doctor",{
        params:{
          name: this.formInline.name,
          department: this.formInline.department
        }
      })
          .then((res) => {
              this.hospitalList = res.data;
              this.$forceUpdate();
              console.log("Current doctorname: " + this.formInline.id);
              console.log(this.doctorData)
          })
      return this.hospitalList;
    },
    // 根据查询条件过滤报告列表数据,
  },
};</script>
<style lang="scss">

    #hospitalizationList {
        position: relative;
        .el-input__inner

    {
        border-radius: 20px;
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

    .el-form--inline .el-form-item,
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 150px;
    }
    }
</style>
