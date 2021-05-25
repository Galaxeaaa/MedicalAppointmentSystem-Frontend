<template>
  <div id="chatroom">
    <div class="toolbar">
      <toolbar></toolbar>
    </div>
    <div class="sidebar">
      <card></card>
      <list></list>
    </div>
    <div class="main">
      <chattitle></chattitle>
      <message></message>
      <usertext></usertext>
    </div>
  </div>
</template>

<script>
  import card from './card.vue'
  import list from './list.vue'
  import message from './message.vue'
  import usertext from './usertext.vue'
  import toolbar from "./toolbar";
  import chattitle from "./chattitle"

  export default {
    name: 'ChatRoom',
    data () {
      return {

      }
    },
    mounted:function() {
      //初始化数据
      this.$store.dispatch('initData');
      //连接WebSocket服务
      this.$store.dispatch('connect');

    },
    created () {
      // //在页面加载时读取sessionStorage里的状态信息
      // if (sessionStorage.getItem("state") ) {
      //   this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
      // }

      //在页面刷新时将vuex里的最新信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("state",JSON.stringify(this.$store.state))
      })
    },
    components:{
      toolbar,
      card,
      list,
      message,
      usertext,
      chattitle
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    margin: 20px auto;
    width: 900px;
    height: 650px;
    overflow: hidden;
    border-radius: 10px;
    .sidebar, .main ,.toolbar{
      height: 100%;
    }
    .toolbar{
      float: left;
      color: #f4f4f4;
      background-color: #82b8db;
      width: 60px;
    }
    .sidebar {
      float: left;
      color: #000000;
      background-color: #bfe0ec;
      width: 240px;
    }
    .main {
      position: relative;
      overflow: hidden;
      background-color: rgb(214, 236, 243);
    }
  }
</style>

