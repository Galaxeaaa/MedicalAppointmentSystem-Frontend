<template>
  <div id="chatroom">
    <div class="toolbar">
      <toolbar></toolbar>
    </div>
    <div class="sidebar">
      <!-- <card></card> -->
      <list></list>
    </div>
    <div class="main">
      <chattitle></chattitle>
      <message></message>
      <usertext></usertext>
    </div>
    <div>
      <el-button @click="loginForTest('d')" class="toolBtn" size="small"
        >Doctor</el-button
      >
      <el-button @click="loginForTest('p')" class="toolBtn" size="small"
        >Patient</el-button
      >
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import card from "./card.vue";
import list from "./list.vue";
import message from "./message.vue";
import usertext from "./usertext.vue";
import toolbar from "./toolbar";
import chattitle from "./chattitle";

export default {
  name: "ChatRoom",
  data() {
    return {
      isChatting: false,
      timer: "",
    };
  },
  mounted: function () {
    //初始化数据
    //this.$store.dispatch('initData');
    //连接WebSocket服务
    //this.$store.dispatch('connect');
    this.chatConnect();
    this.initUserList();
  },
  created() {
    // //在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem("state") ) {
    //   this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    // }

    //在页面刷新时将vuex里的最新信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    });
  },
  components: {
    toolbar,
    card,
    list,
    message,
    usertext,
    chattitle,
  },
  methods: {
    chatConnect() {
      this.$axios
        .post(
          "/chat/connect?pid=" +
            this.$store.state.currentUser.id +
            "&did=" +
            this.$store.state.currentSession.id
        )
        .then((res) => {
          console.log("Connect success");
        })
        .catch(function (error) {
          console.log(error);
        });

      this.timer = setInterval(this.Tick, 1000);
    },

    Tick() {
      this.$axios
        .get("/chat/askMessage?id=" + this.$store.state.currentUser.id)
        .then((res) => {
          res.data.forEach((msg, i) => {
            console.log(
              "@@@" + this.$store.state.currentUser.id + "#" + msg.src
            );
            if (
              !this.$store.state.sessions[
                this.$store.state.currentUser.id + "#" + msg.src
              ]
            ) {
              Vue.set(
                this.$store.state.sessions,
                this.$store.state.currentUser.id + "#" + msg.src,
                []
              );
            }
            console.log("resv date: " + msg.time);
            console.log(msg);
            this.$store.state.sessions[
              this.$store.state.currentUser.id + "#" + msg.src
            ].push({
              content: msg.content,
              date: msg.msg_time,
              fromNickname: msg.name,
              messageTypeId: msg.type,
              self: false,
            });
          });
        });
    },

    chatDisconnect() {
      clearInterval(this.timer);
    },

    initUserList() {
      if (this.$store.state.currentUser.who == "p") {
        this.$axios
          .get("/chat/getdoctorlist?pid=" + this.$store.state.currentUser.id)
          .then((res) => {
            // console.log("res:"+res.data);
            this.$store.state.users = res.data;
          });
      } else {
        this.$axios
          .get("/chat/getpatientlist?did=" + this.$store.state.currentUser.id)
          .then((res) => {
            this.$store.state.users = res.data;
          });
      }
    },

    loginForTest(who) {
      if (who == "d") {
        this.$store.state.currentUser = {};
        this.$store.state.currentUser.id = "001";
        this.$store.state.currentUser.name = "汤正义";
      } else if (who == "p") {
        this.$store.state.currentUser = {};
        this.$store.state.currentUser.id = "10000";
        this.$store.state.currentUser.name = "王大强";
      }
      this.$store.state.currentUser.who = who;
      this.initUserList();
    },
  },
};
</script>

<style lang="scss" scoped>
#chatroom {
  margin: 20px auto;
  width: 900px;
  height: 650px;
  overflow: hidden;
  border-radius: 10px;
  .sidebar,
  .main,
  .toolbar {
    height: 100%;
  }
  .toolbar {
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

