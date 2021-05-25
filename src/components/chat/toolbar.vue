<template>
  <div id="toolbar">
    <el-image class="imgProfile"
              :src="user.userProfile"
              :preview-src-list="[user.userProfile]"
              :alt="user.nickname">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <div id="btnBar">
      <div class="topBtnBar">
        
        <el-tooltip class="item" effect="dark" content="用户列表" placement="right">
        <el-button @click="chooseChatList('私聊')" class="toolBtn" size="small"><i class="fa fa-address-book-o fa-2x" aria-hidden="true"></i></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="联系客服" placement="right">
          <el-button @click="chooseChatList('客服')" class="toolBtn" size="small"><i class="fa fa-android fa-2x" aria-hidden="true"></i></el-button>
        </el-tooltip>
      </div>
      <div class="bottomBtnBar">
        <el-tooltip class="item" effect="dark" content="退出" placement="right">
        <el-button @click="exitSystem" class="toolBtn" size="small"><i class="fa fa-sign-out fa-2x" aria-hidden="true"></i></el-button>
        </el-tooltip>
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: "toolbar",
    data(){
      return{
        user:JSON.parse(window.sessionStorage.getItem('user')),
        feedBackDialogVisible:false,
        feedBackContent:'',
      }
    },
    methods:{
      //退出系统
      exitSystem(){
        this.$confirm('你是否要退出系统吗?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getRequest("/logout");
          sessionStorage.removeItem("user");
          //清除SessionStorage中保存的state
          if (sessionStorage.getItem("state")){
            sessionStorage.removeItem("state");
          }
          //关闭连接
          this.$store.dispatch("disconnect");
          this.$router.replace("/");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      //选择聊天列表
      chooseChatList(listName){
        this.$store.commit("changeCurrentList",listName);
      },
      //打开意见反馈对话框
      showFeedbackDialog(){
        this.feedBackContent='';
        this.feedBackDialogVisible=true;
      },
      //处理反馈消息邮件发送
      handleFeedbackSend(){
        let msgObj={};
        msgObj.userId=this.user.id;
        msgObj.nickname=this.user.nickname;
        msgObj.username=this.user.username;
        msgObj.content=this.feedBackContent;
        console.log(msgObj)
        this.postRequest("/mail/feedback",msgObj).then(resp=>{
          if (resp) {
            this.feedBackDialogVisible = false;
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #toolbar{
    width: 100%;
    height: 100%;
    #btnBar{
      width: 100%;
      height: 82%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .imgProfile{
      width: 40px;
      height: 40px;
      horiz-align: center;
      margin: 25px 10px;
    }
    .toolBtn{
      background-color: #82b8db;
      border: 0;
      margin: 5px 5px;
    }
    .feedbackDialog{
      width: 1000px;
      height: 800px;
      margin: 10px auto;
      //background-color: #ECEAE8;
    }
    .feedbackInput{
      width: 450px;
      height: 200px;
      resize: none;
      padding: 0;
      margin: 0;
    }
  }


  #moreList{
    margin: 0px;
    padding: 0px;
    background-color: #82b8db;
    li {
      padding-top: 14px;
      padding-bottom: 14px;
      padding-left: 5px;
      //padding-right: 40px;
      //border-bottom: 1px solid #292C33;
      list-style: none;
      cursor: pointer;
      &:hover {
        background-color: #abaaaa;
      }
    }
  }

</style>
<style lang="scss">
  /* el-popover是和app同级的，所以scoped的局部属性设置了无效 */
  /* 需要设置全局style */
  .el-popover.moreListPopoverClass{
    height:150px;
    width:150px;
   // margin: 0px;
    margin-left: 10px;
    padding: 0px;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color:#2e3238;
    border:none;
  }
</style>
