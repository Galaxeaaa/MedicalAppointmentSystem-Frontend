<template>
    <div id="hospitalizationList">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

            <el-form-item>
                <el-input v-model="formInline.doctorname"
                          placeholder="请输入医生姓名"></el-input>
            </el-form-item>

<!--
            <el-form-item>
                <el-date-picker v-model="formInline.date"
                                type="date"
                                :value="null ? '' : formInline.date"
                                placeholder="选择入院时间"
                                value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
-->

            <el-form-item>
                <el-input v-model="formInline.departmentname"
                          placeholder="请输入科室"></el-input>
            </el-form-item>


            <el-form-item>
                <el-input v-model="formInline.hospitalname"
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


            <el-table-column label="医生姓名">
                <template slot-scope="scope">
                    <el-link type="primary" @click="gotoDoctor(scope.row.doctorname)">
                      {{ scope.row.doctorname }}
                    </el-link>
                </template>
            </el-table-column>


            <el-table-column label="科室">
                <template slot-scope="scope">
                    <el-link type="primary" @click="gotoDepartment(scope.row.departmentinfo.departmentname)">
                      {{ scope.row.departmentinfo.departmentname }}
                    </el-link>
                </template>
            </el-table-column>


            <el-table-column label="医院">
                <template slot-scope="scope">
                    <el-link type="primary" @click="gotoHospital(scope.row.hospitalinfo.hospitalname)" >
                      {{ scope.row.hospitalinfo.hospitalname }}
                    </el-link>
                </template>
            </el-table-column>


            <el-table-column prop="age" label="年龄">
                <template slot-scope="scope">
                    <span>
                        {{ new Date().getFullYear() - scope.row.birthday.split("-")[0]}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column label="评分">
                <template slot-scope="scope">
                    <span>{{ scope.row.star }}</span>
                </template>
            </el-table-column>


            <el-table-column label="职称">
                <template slot-scope="scope">
                    <span>{{ scope.row.heading }}</span>
                </template>
            </el-table-column>


            <el-table-column prop="done" label="预约挂号">
                <template slot-scope="scope">
                    <i class="el-icon-news"
                       @click="
              $router.push({
                path: '/person/doctor/detail', //跳转进入新的界面/doctor/appointment
                query: { id: scope.row.id },    //查询id以进入对应的操作界面
              })
            "></i>
                </template>
            </el-table-column>
            <el-table-column prop="done" label="在线问诊">
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
                       :total="1">
        </el-pagination>
        
    </div>
</template>
<script>export default {
  data() {
    return {
      formInline: {
        doctorname: "",
        departmentname: "",
        hospitalname: "",
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

// 20210607 点击跳转逻辑
    gotoHospital(hp_name) {
      console.log("goto hospital", hp_name);
      this.$router.push({
          name: 'HospitalHomepage',
          params: {
            hospitalName: hp_name,
          }
        })
    },
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

    getHospitalList() {
      this.hospitalList = [
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
        },
        {
          id: 1,
          doctorname: "张医生",
          heading: "主治医师",
          birthday: "1986-05-23 00:00:00",
          comment: null,
          star: 4.5,
          total: 5,
          state: 2,
          date: "2021-05-24 00:00:00",
          departmentinfo:{
            id: 34,
            departmentname: "耳鼻喉科",
            comment: null,
          },
          hospitalinfo:{
            id: 35,
            hospitalname: "浙大附属二院",
            comment: null,
          },
        },
        {
          id: 1,
          doctorname: "赵医生",
          heading: "主治医师",
          birthday: "1979-05-23 00:00:00",
          comment: null,
          star: 3.4,
          total: 5,
          state: 2,
          date: "2021-05-24 00:00:00",
          departmentinfo:{
            id: 34,
            departmentname: "心理卫生科",
            comment: null,
          },
          hospitalinfo:{
            id: 35,
            hospitalname: "浙大附属一院",
            comment: null,
          },
        },

      ];

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
      return this.hospitalList.filter((item) => {
        console.log(item);
        /*var result = item.date.some(item1 => {
          if(item1==this.fromInline.date)
            return true;
        });*/
        return (
          item.doctorname.includes(this.formInline.doctorname) &&
          item.departmentinfo.departmentname.includes(this.formInline.departmentname) &&
          item.hospitalinfo.hospitalname.includes(this.formInline.hospitalname) &&
          //result
          //item.star.includes(this.formInline.star) &&
          item.date.includes(
            this.formInline.date == null ? "" : this.formInline.date
          )
        );
      });
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
