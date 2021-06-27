<template>
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
      <p>本次问诊已结束！请给您的医生评分</p>
      <div class="por">
        <div
          class="selectBox"
          style="width: 400px"
        >
          <div
            class="selectBox_show"
            v-on:click.stop="arrowDown"
          >
            <i class="icon icon_arrowDown"></i>
            <p title="请选择">{{ unitName }}</p>
            <input
              type="hidden"
              name="unit"
              v-model="unitModel"
            />
          </div>
          <div
            class="selectBox_list"
            v-show="isShowSelect"
            style="max-height: 240px; width: 398px; display: block"
          >
            <div
              class="selectBox_listLi"
              v-for="(item, index) in dataList"
              @click.stop="select(item, index)"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>
      <el-button 
        v-show="selected"
        @click="showModal = false"
        class="btn"
      >评分完成</el-button>
    </div>
    <el-button
      @click="
        $router.push({
          path: '/person/chat/chatroom', //跳转进入聊天界面
        })
      "
      class="btn"
    >确认结束</el-button>
  </div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      showModal: true,
      isShowSelect: false,
      selected: false,
      dataList: [
        { key: -1, value: "选择评分" },
        { key: 0, value: "1" },
        { key: 1, value: "2" },
        { key: 2, value: "3" },
        { key: 3, value: "4" },
        { key: 4, value: "5" },
        { key: 5, value: "6" },
        { key: 6, value: "7" },
        { key: 7, value: "8" },
        { key: 8, value: "9" },
        { key: 9, value: "10" },
      ],
      unitName: "请选择",
    };
  },
  methods: {
    arrowDown() {
      this.isShowSelect = !this.isShowSelect;
    },
    select(item, index) {
      this.isShowSelect = false;
      this.selected = true;
      console.log(item);
      console.log(index);
      this.unitModel = index;
      this.unitName = item.value;
      var str1 =
        "/score/setscore?" +
        "did=" +
        this.$store.state.currentSession.id +
        "&score=" +
        item.value;
      this.$axios.get(str1).then((response) => {
        if (response) {
          console.log("scored");
        } else {
          console.log("score fail");
        }
      });
      var str2 = 
        "/appoint/remove?" + 
        "pid=" + this.$store.state.userid + 
        "&did=" + this.$store.state.currentSession.id;
      this.$axios.get(str2).then((response) => {
        if (response) {
          console.log("deleted");
        } else {
          console.log("delete fail");
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  background-color: #fff;
  padding: 10px;
  position: relative;
  top: 10%;
  left: 30%;
  width: calc(100% - 600px);
  height: calc(100% - 200px);
  z-index: 2;
}
.btn {
  margin-top: 5px;
  margin-right: 10px;
  background-color: #eefbff;
  color: #42557b;
  border: 0;
  height: 40px;
  width: 100px;
}
</style>