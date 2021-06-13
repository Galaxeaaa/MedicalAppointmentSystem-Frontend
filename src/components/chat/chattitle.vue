<template>
  <div class="chatTitle">
    <span class="titleName">{{this.$store.state.currentSession.name?this.$store.state.currentSession.name:""}}</span>
    <el-button class="exitBtn" @click="gotoComment" >结束问诊</el-button>
  </div>
</template>

<script>
  export default {
    name: "chattitle",
    methods:{
      gotoComment() {
        this.$router.replace('./comment')
      }
    }
  }
</script>

<style scoped>
  .chatTitle{
    height: 50px;
    width: 100%;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid #b0c7e4;
  }
  .exitBtn{ 
    margin-top: 5px;
    margin-right: 10px;
    background-color: #eefbff;
    color: #42557b;
    border: 0;
    height: 40px;
  }
  .titleName{
    margin: 10px 20px;
  }

</style>
