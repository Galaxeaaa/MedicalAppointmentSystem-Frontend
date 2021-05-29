<template>
  <div>
    <div class="mask" v-if="showModal" @click="showModal=false"></div>
    <div class="pop" v-if="showModal">
        <p>本次问诊已结束！请给您的医生评分</p>
        <div class="por">
        <div class="selectBox" style="width: 400px;">
             <div class="selectBox_show" v-on:click.stop="arrowDown">
             <i class="icon icon_arrowDown"></i>
             <p title="请选择">{{unitName}}</p>
             <input type="hidden" name="unit" v-model="unitModel">
             </div>
             <div class="selectBox_list" v-show="isShowSelect" style="max-height: 240px; width: 398px; display: block;">
             <div class="selectBox_listLi" v-for="(item, index) in dataList" @click.stop="select(item, index)">{{item.value}}
             </div>
             </div>
        </div>
        </div>
        <button @click="showModal=false" class="btn">评分完成</button>
    </div>
    <button @click="" class="btn">确认结束</button>
  </div>
</template>

<script>
export default {
  name: 'comment',
  data () {
    return {
      showModal: true,
      isShowSelect: false,
      dataList: [
        {key: -1, value: "请选择"},
        {key: 0, value: "1"},
        {key: 1, value: "2"},
        {key: 2, value: "3"},
        {key: 3, value: "4"},
        {key: 4, value: "5"},
        {key: 5, value: "6"},
        {key: 6, value: "7"},
        {key: 7, value: "8"},
        {key: 8, value: "9"},
        {key: 9, value: "10"}
      ],
      unitName:'请选择'
    }
  },
  methods: {
    arrowDown() {
      this.isShowSelect = !this.isShowSelect;
    },
    select(item, index) {
    this.isShowSelect = false;
    console.log(item);
    console.log(index);
    this.unitModel = index;
    this.unitName = item.value;
  }
  }
}
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
  z-index: 1
}
.pop {
  background-color: #fff;
 
  position: fixed;
  top: 100px;
  left: 300px;
  width: calc(100% - 600px);
  height:calc(100% - 200px);
  z-index: 2
}
.btn {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid blue;
  padding: 4px 12px;
}
</style>