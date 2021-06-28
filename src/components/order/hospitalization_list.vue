<template>
  <div id="hospitalizationList">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item>
        <el-input v-model="formInline.name"
                  placeholder="请输入医生姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.date"
                  placeholder="请输入挂号时间"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.department"
                  placeholder="请输入科室"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.hospital"
                  placeholder="请输入医院">
        </el-input>
      </el-form-item>
      <el-form-item>

        <i class="el-icon-search"
           @click="update0(formInline.department,formInline.name,formInline.date,formInline.hospital)"></i>
      </el-form-item>
    </el-form>
    <el-table
      :data="tables"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      ref="multipleTable"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="医生姓名" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
          <i class="el-icon-info"
             key="scope.row.name"
             @click="toDoctor(scope.row.name)"></i>
        </template>
      </el-table-column>
      <el-table-column label="评分" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>
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
      <el-table-column label="医院" width="140">
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
      <el-table-column label="时间" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.registerTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已预约/总量" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.registerSum }}</span>
          <span>{{ '/30' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="号型" width="70">
        <template slot-scope="scope">
          <span>普通号</span>
        </template>
      </el-table-column>
      <el-table-column prop="done" label="预约挂号" width="50">
        <template slot-scope="scope">
          <i class="el-icon-news"
             @click="register(scope.row.id,scope.row.registerTime,scope.row.name)"></i>
        </template>
      </el-table-column>

      <el-table-column
        prop="done"
        label="在线问诊"
        width="50"
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
                        @click="appointSuccess()"
                        class="appoint_btn"
                    >预约成功!</button>
                </div>
                <i
                @click="changeId(scope.row.id)"
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
      showModal: false,
      appointid: "000",
      formInline: {
        id: "",
        name:"",
        department: "",
        hospital: "",
        date: "",
      },
      //定义查询的表单元素
      formInline0: {
        id: "",
        name:"",
        department: "",
        hospital: "",
        date: "",
      },

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
    update0(department,name,date,hospital){
      this.formInline0.department=department;
      this.formInline0.name=name;
      this.formInline0.date=date;
      this.formInline0.hospital=hospital;
      this.$forceUpdate();
    },
    register(val,t,d){
      this.$axios.get("/do/getinfo/isregister",{
        params:{
          id: val
        }
      })
          .then(function (response) {
            if (response.data < 30) {
              axios.get("/do/addinfo/setregister",{
                params:{
                  id: val
                }
              });
              alert("挂号成功！"+"挂号时间为："+t+",医生为："+d);
            } else {
              alert("挂号失败！");
            }
          })
      return this.hospitalList;
    },
    changeId(did){
        this.appointid = did;
        this.showModal = true;
    },
    appointSuccess() {
      //console.log(this.$store.state.userid);
      var str = "/appoint/add?" 
              + "pid=" + this.$store.state.userid
              + "&did=" + this.appointid;
      //console.log(str);
      this.$axios
          .get(str)
      this.$router.push({path: '/person/chat/chatroom'});
    },
    getHospitalList() {
      this.$axios
        //.get("/do/getinfo/doctor?id=" + this.formInline.id)
        .get("/do/getinfo/doctorall")
        .then((res) => {
          this.hospitalList = res.data;
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
      this.$axios.get("/do/getinfo/doctor",{
        params:{
          name: this.formInline0.name,
          department: this.formInline0.department,
          registerTime: this.formInline0.date,
          hospital: this.formInline0.hospital
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
