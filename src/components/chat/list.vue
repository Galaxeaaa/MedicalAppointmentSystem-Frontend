<template>
  <div id="list">
    <!--客服-->
    <ul v-if="currentList == '客服'">
      <p style="padding: 2px 4px; height: 20px">如需联系客服请留言</p>
      <li
        :class="{
          active: currentSession ? '客服' == currentSession.username : false,
        }"
        v-on:click="changeCurrentSession(robotObj)"
      >
        <img
          class="avatar"
          src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2548892998,499717296&fm=26&gp=0.jpg"
        />
        <p class="name">客服</p>
      </li>
    </ul>
    <!--用户列表-->
    <el-scrollbar
      wrap-class="userList"
      wrap-style="height:600px;"
      view-style="height:100%;"
      :native="false"
    >
      <ul v-if="currentList == '私聊'">
        <p style="padding: 2px 4px; height: 20px">预约列表</p>
        <li
          v-for="item in users"
          :class="{
            active: currentSession ? item.name === currentSession.name : false,
          }"
          v-on:click="changeCurrentSession(item)"
        >
          <!--   :class="[item.id === currentSession ? 'active':'']" -->
          <div style="display: flex; justify-content: space-between">
            <div>
              <el-badge
                :is-dot="isDot[user.username + '#' + item.username]"
                style=""
              >
                <el-image
                  class="avatar"
                  :preview-src-list="[item.userProfile]"
                  :src="item.userProfile"
                  :alt="item.name"
                >
                  <div slot="error" class="image-slot">
                    <img src = "https://bkimg.cdn.bcebos.com/pic/8644ebf81a4c510fbcac0d126e59252dd42aa54a" width="30px">
                    <!-- <i class="el-icon-picture-outline"></i> -->
                  </div>
                </el-image>
              </el-badge>
              <p class="name">{{ item.name }}</p>
            </div>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";

export default {
  name: "list",
  data() {
    return {
      user: this.$store.state.currentUser,
      chatObj: { username: "群聊", nickname: "群聊" }, //群聊实体对象（为方法复用而构造，对于User对象）
      robotObj: {
        username: "客服",
        nickname: "客服",
        userProfile:
          "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2548892998,499717296&fm=26&gp=0.jpg",
      },
    };
  },
  computed: mapState([
    //'sessions',//this.sessions映射成this.$store.state.sessions
    "users",
    "currentSession",
    "isDot",
    "currentList",
  ]),
  methods: {
    changeCurrentSession: function (currentSession) {
      this.$store.commit("changeCurrentSession", currentSession);
      //切换到当前用户就标识消息已读
      // Vue.set(
      //   state.isDot,
      //   state.currentUser.name + "#" + currentSession.name,
      //   false
      // );
      // //更新当前选中的用户
      //this.$store.state.currentSession = currentSession;
      if(!this.$store.state.sessions[this.$store.state.currentUser.id + "#" + currentSession.id]){
        this.$axios.get("/chat/getHistoryMsg?selfid="+this.$store.state.currentUser.id+"&id="+currentSession.id).then((res) => {
              res.data.forEach((msg,i) => {
              if(msg.src==this.$store.state.currentUser.id){
                if(!this.$store.state.sessions[this.$store.state.currentUser.id + "#" + msg.dest]){
                    Vue.set(this.$store.state.sessions, this.$store.state.currentUser.id + "#" + msg.dest, []);
                }
                console.log(this.$store.state.currentUser.id + "#" + msg.dest)
                this.$store.state.sessions[this.$store.state.currentUser.id + "#" + msg.dest].push({
                  content: msg.content,
                  date: msg.msg_time,
                  fromNickname: this.$store.state.currentUser.name,
                  messageTypeId: msg.type,
                  self: true
                  })
              }
              else{
                if(!this.$store.state.sessions[this.$store.state.currentUser.id + "#" + msg.src]){
                    Vue.set(this.$store.state.sessions, this.$store.state.currentUser.id + "#" + msg.src, []);
                }
                this.$store.state.sessions[this.$store.state.currentUser.id + "#" + msg.src].push({
                  content: msg.content,
                  date: msg.msg_time,
                  fromNickname: msg.name,
                  messageTypeId: msg.type,
                  self: false
                })
              }
              });
        })
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#list {
  ul {
    margin-left: 0px;
    padding-left: 0px;
    margin-left: 2px;
  }
  li {
    padding-top: 14px;
    padding-bottom: 14px;
    padding-left: 10px;
    //border-bottom: 1px solid #292C33;
    list-style: none;
    cursor: pointer;
    &:hover {
      background-color: #d8d6d6;
    }
  }
  li.active {
    /*注意这个是.不是冒号:*/
    background-color: #92a2af;
  }
  .avatar {
    border-radius: 0px;
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  .name {
    display: inline-block;
    margin-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .stateItem {
    //在线状态的样式
    /*position: absolute;*/
    /*left: 160px;*/
    //margin-left: 100px;
    //margin-right: 10px;
  }
  .userList {
    max-height: 650px;
  }
  .el-scrollbar__wrap.default-scrollbar__wrap {
    overflow-x: auto;
  }
}
</style>
