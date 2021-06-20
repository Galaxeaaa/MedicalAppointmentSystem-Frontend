<template>
  <div id="uesrtext">
    <div id="msgtype">
      <!-- emoji表情气泡弹出框 -->
      <el-popover
        placement="top-start"
        width="400"
        trigger="click"
        class="emoBox"
      >
        <el-button
          class="function-btn"
          slot="reference"
        >
          😀
          <!-- <i class="fa fa-smile-o" aria-hidden="true"></i> -->
        </el-button>
        <div class="emotionList">
          <a
            href="javascript:void(0);"
            @click="getEmo(index)"
            v-for="(item, index) in faceList"
            :key="index"
            class="emotionItem"
          >{{ item }}</a>
        </div>
      </el-popover>
      <!-- 上传图片 -->
      <el-upload
        class="upload-btn"
        action="/chat/file"
        :before-upload="beforeAvatarUpload"
        :on-success="imgSuccess"
        :on-error="imgError"
        :show-file-list="false"
        accept=".jpg,.jpeg,.png,.JPG,JPEG,.PNG,.gif,.GIF"
      >
        <el-button
          class="function-btn"         
          icon="el-icon-picture-outline"
        ></el-button>
      </el-upload>
      <!-- 语音 -->
      <el-button class="function-btn" icon="el-icon-microphone" @click="handleBtnClick"></el-button>
      <!-- <audio controls autoplay id="audio"></audio> -->
      <div v-show="news_img">
        <div class="in_vedio">
            <p>正在录音...</p> 
        </div>
        <el-button @click="cancel_mp3">完成</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
      <div v-show="send_vedio">
          <div class="in_vedio">
            <p>录音完成！</p> 
        </div>
          <el-button @click="send_voice">发送</el-button>
      </div>
      <el-button
          class="function-btn"
          icon="el-icon-phone-outline"
          v-show="!news_img && !send_vedio"
          @click="makeVideoCall()"
      ></el-button>
    </div>
    <!-- 按 Ctrl + Enter 发送 -->
    <textarea
      id="textarea"
      placeholder=""
      v-model="content"
      v-on:keyup="addMessage"
    >
    </textarea>
    <el-button
      id="sendBtn"
      type="primary"
      size="mini"
      @click="addMessageByClick"
    >发送(S)</el-button>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import Recorderx, { ENCODE_TYPE } from "recorderx";
const rc = new Recorderx();
const appData = require("../../utils/emoji.json"); //引入存放emoji表情的json文件

export default {
  name: "uesrtext",
  data() {
    return {
      faceList: [], //表情包数据
      content: "",
      news_img: false,
      send_vedio: false,
    };
  },
  mounted() {
    for (let i in appData) {
      //读取json文件保存数据给数组
      this.faceList.push(appData[i].char);
    }
  },
  computed: mapState(["sessions", "currentSession"]),
  methods: {
      makeVideoCall() {
      window.open(
        "http://localhost:8090/",
        "__blank"
      );
    },
    addMessageByClick() {
      var tmpContent = this.content;
      console.log("send date: " + new Date());
      this.$axios
        .post(
          "/chat/sendMessage?from=" +
            this.$store.state.currentUser.id +
            "&name=" +
            this.$store.state.currentUser.name +
            "&dest=" +
            this.currentSession.id +
            "&content=" +
            tmpContent +
            "&time=" +
            new Date() +
            "&type=1"
        )
        .then((res) => {
          if (
            !this.$store.state.sessions[
              this.$store.state.currentUser.id +
                "#" +
                this.$store.state.currentSession.id
            ]
          ) {
            Vue.set(
              this.$store.state.sessions,
              this.$store.state.currentUser.id +
                "#" +
                this.$store.state.currentSession.id,
              []
            );
          }
          // console.log(
          // this.$store.state.currentUser.id +
          //   "#" +
          //   this.$store.state.currentSession.id
          // );
          this.$store.state.sessions[
            this.$store.state.currentUser.id +
              "#" +
              this.$store.state.currentSession.id
          ].push({
            content: tmpContent,
            date: new Date(),
            fromNickname: this.$store.state.currentUser.name,
            messageTypeId: 1,
            self: true,
          });
        });
      // let msgObj=new Object();
      // msgObj.content=this.content;
      // msgObj.messageTypeId=1;
      // //发送群聊消息
      // if (this.currentSession.username=="群聊"){
      //   console.log(this.content);
      //   this.$store.state.stomp.send("/ws/groupChat",{},JSON.stringify(msgObj));
      // }
      // //给客服发送消息
      // if (this.currentSession.username=="客服"){
      //   msgObj.fromNickname=this.$store.state.currentUser.nickname;
      //   msgObj.to='客服';
      //   this.$store.state.stomp.send("/ws/robotChat",{},JSON.stringify(msgObj));
      //   //保存该条记录到session
      //   this.$store.commit('addMessage',msgObj);
      // }
      // //发送私聊消息
      // else{
      //   msgObj.from=this.$store.state.currentUser.username;
      //   msgObj.fromNickname=this.$store.state.currentUser.nickname;
      //   msgObj.to=this.currentSession.username;
      //   this.$store.state.stomp.send("/ws/chat",{},JSON.stringify(msgObj));
      //   //提交私聊消息记录
      //   this.$store.commit('addMessage',msgObj);
      // }
      //清空输入框;
      this.content = "";
    },
    addMessage(e) {
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        this.addMessageByClick();
      }
    },
    /**
     *       图片上传的方法
     */
    //上传前
    beforeAvatarUpload(file) {
      //不给客服发送图片
      if (this.currentSession.username == "客服") {
        this.$message.error("客服拒绝接收你的图片！");
      }
      //判断图片大小
      let isLt1M = file.size / 1024 / 1024 < 1;
      console.log(file);
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB!");
      }
      //判断图片的格式
      let imgType = file.name.substring(file.name.lastIndexOf(".") + 1);
      imgType = imgType.toLowerCase();
      let isImg =
        imgType === "jpg" ||
        imgType === "png" ||
        imgType === "jpeg" ||
        imgType === "gif";
      if (!isImg) {
        this.$message.error("上传图片格式不符合要求！");
      }
      return isLt1M && isImg;
    },
    // 图片上传成功
    imgSuccess(response, file, fileList) {
      console.log("FileName为："+response[0]);
      console.log("图片url为："+response[1]);
      // console.log("图片url为：" + response);
      // let msgObj = new Object();
      // msgObj.content = response;
      // //设置消息类型为图片
      // msgObj.messageTypeId = 2;
      // if (this.currentSession.username == "群聊") {
      //   this.$store.state.stomp.send(
      //     "/ws/groupChat",
      //     {},
      //     JSON.stringify(msgObj)
      //   );
      // } else {
      //   msgObj.from = this.$store.state.currentUser.username;
      //   msgObj.fromNickname = this.$store.state.currentUser.nickname;
      //   msgObj.to = this.currentSession.username;
      //   this.$store.state.stomp.send("/ws/chat", {}, JSON.stringify(msgObj));
      //   //提交私聊消息记录
      //   this.$store.commit("addMessage", msgObj);
      this.$axios.post("/chat/sendMessage?from="+this.$store.state.currentUser.id+"&name="+this.$store.state.currentUser.name+
      "&dest="+this.currentSession.id+"&content="+response[0]+"&time="+new Date()+"&type=2")
      .then((res) => {
        if(!this.$store.state.sessions[this.$store.state.currentUser.id + "#" + this.$store.state.currentSession.id]){
          Vue.set(this.$store.state.sessions, this.$store.state.currentUser.id + "#" + this.$store.state.currentSession.id, []);
        }
        this.$store.state.sessions[this.$store.state.currentUser.id + "#" + this.$store.state.currentSession.id].push({
				  content: response[1],
				  date: new Date(),
				  fromNickname: this.$store.state.currentUser.name,
				  messageTypeId: 2,
				  self: true
			  })
      })
    },
    // 图片上传失败
    imgError(err, file, fileList) {
      this.$message.error("上传失败");
    },
    //获取Emoji
    getEmo(index) {
      var textArea = document.getElementById("textarea");
      //将选中的表情插入到输入文本的光标之后
      function changeSelectedText(obj, str) {
        if (window.getSelection) {
          // 非IE浏览器
          textArea.setRangeText(str);
          // 在未选中文本的情况下，重新设置光标位置
          textArea.selectionStart += str.length;
          textArea.focus();
        } else if (document.selection) {
          // IE浏览器
          obj.focus();
          var sel = document.selection.createRange();
          sel.text = str;
        }
      }
      changeSelectedText(textArea, this.faceList[index]);
      this.content = textArea.value; // 要同步data中的数据
      // console.log(this.faceList[index]);
      return;
    },
    //录制语音
    handleBtnClick: function () {
      let that = this;
    //   that.news_img = !that.news_img
      rc.start()
        .then(() => {
          that.news_img = !that.news_img;
          console.log("start recording");
        })
        .catch((error) => {
          alert("获取麦克风失败");
          console.log("Recording failed.", error);
        });
    },
    //暂停语音
    cancel_mp3: function () {
      rc.pause();
      let that = this;
      that.news_img = !that.news_img;
      that.send_vedio = !that.send_vedio;
    },
    // 取消语音
    cancel: function() {
      rc.pause();
      rc.clear();
      let that = this;
      that.news_img = !that.news_img;
    },
    // // 播放语音
    // play_mp3:function(){
    //   var wav = rc.getRecord({
    //   encodeTo: ENCODE_TYPE.WAV,
    //   compressible: true
    // });
    // document.getElementById('audio').src = URL.createObjectURL(wav);
    // },
    // 发送语音
    send_voice: function () {
      let that = this;
      var wav = rc.getRecord({
        encodeTo: ENCODE_TYPE.WAV,
        compressible: true,
      });
    //   var uuid = this.$store.state.currentUser.id;

    // a new try
    // var file = wav.target.files[0];
    var formdata = new FormData();
    formdata.append("file",wav);//file
    // console.log("文件",formdata,this.qs.stringify({'file':wav}));
    this.$axios.post(
          '/chat/file',
          formdata,
          {headers:{'Content-Type':'multipart/form-data'}}
          ).then(function(res){
            var response = res.data
            console.log("FileName为："+response[0]);
            console.log("语音url为："+response[1]);
            // that.news_img = !that.news_img;
            that.send_vedio = !that.send_vedio;
            rc.clear();

            //===========================
            that.$axios.post("/chat/sendMessage?from="+that.$store.state.currentUser.id+"&name="+that.$store.state.currentUser.name+
            "&dest="+that.currentSession.id+"&content="+response[0]+"&time="+new Date()+"&type=3")
            .then((res) => {
                if(!that.$store.state.sessions[that.$store.state.currentUser.id + "#" + that.$store.state.currentSession.id]){
                Vue.set(that.$store.state.sessions, that.$store.state.currentUser.id + "#" + that.$store.state.currentSession.id, []);
                }
                that.$store.state.sessions[that.$store.state.currentUser.id + "#" + that.$store.state.currentSession.id].push({
                        content: response[1],
                        date: new Date(),
                        fromNickname: that.$store.state.currentUser.name,
                        messageTypeId: 3,
                        self: true
                    })
            })           


          }).catch((err) => {
          console.log(err);
        });
    // a new try

    //   if (this.chatList != "") {
    //     var end_time = this.chatList[this.chatList.length - 1].addtime;
    //   }
      
    //   var formData = new FormData();
      // formData.append('file',wav);
    //   formData.append("topic_id", uuid);
    //   formData.append("last_time", end_time);
    //   formData.append("type", 4);
    //   formData.append("file", wav, Date.parse(new Date()) + ".wav");
    //   let headers = { headers: { "Content-Type": "multipart/form-data" } };

    //   axios.defaults.withCredentials = true;
    //   axios
    //     .post(this.https + "/admin/api/send_reply", formData, headers)
    //     .then((data) => {
    //       that.news_img = !that.news_img;
    //       // this.reload();
    //       rc.clear();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    },
  },
};
</script>


<style lang="scss">
/* el-popover是和app同级的，所以scoped的局部属性设置无效 */
/* 需要设置全局style */
.el-popover {
  height: 200px;
  width: 450px;
  overflow: scroll;
  overflow-x: auto;
}
</style>

<style lang="scss" scoped>
#uesrtext {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border: solid 1px #ddd;
  background-color: rgb(255, 255, 255);
  > textarea {
    padding: 10px;
    width: 95%;
    height: 58%;
    border: none;
    outline: none;
    resize: none; //禁止拉伸
  }
  #sendBtn {
    float: right;
    margin-right: 10px;
  }
//   #uploadImgBtn {
//     border: none;
//     padding-bottom: 0px;
//     margin-bottom: 0px;
//     padding-left: 12px;
//   }
//   #uploadImgBtn:hover {
//     background-color: white;
//   }
//   #videoBtn {
//     border: none;
//     padding-bottom: 0px;
//     margin-bottom: 0px;
//     padding-left: 12px;
//   }
//   #videoBtn:hover {
//     background-color: white;
//   }
//   #emojiBtn {
//     border: none;
//     padding-right: 0px;
//     padding-bottom: 0px;
//     margin-bottom: 0px;
//   }
//   #emojiBtn:hover {
//     background-color: rgb(255, 255, 255);
//   }
  .upload-btn {
    display: inline-block;
  }
}
.function-btn {
    border: none;
    padding-bottom: 0px;
    margin-bottom: 0px;
    padding-left: 12px;
}
.function-btn:hover {
    background-color: white;
  }
.emotionList {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
}
.emotionItem {
  width: 10%;
  font-size: 20px;
  text-align: center;
}
/*包含以下四种的链接*/
.emotionItem {
  text-decoration: none;
}
/*正常的未被访问过的链接*/
.emotionItem:link {
  text-decoration: none;
}
/*已经访问过的链接*/
.emotionItem:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
.emotionItem:hover {
  text-decoration: none;
}
/* 正在点击的链接*/
.emotionItem:active {
  text-decoration: none;
}
</style>
