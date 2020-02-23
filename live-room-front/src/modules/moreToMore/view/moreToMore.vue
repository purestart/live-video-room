<template>
  <div class="page-container">
    <div v-if="linkState !== 'idle'">
      <div flex="main:center" class="video-panel">
        <div @mousemove="mousemove" class="video-wrapper">
          <div
            flex="main:center cross:center"
            class="video-content local-video"
          >
            <video class="video" />
            <div flex="main:center" class="video-content remote-video">
              <video class="video" />
            </div>
            <controlCom @statusChange="statusChange" ref="controlCom" />
          </div>
        </div>
        <div class="chat-box">
          <div class="chat-wraper">
            <div class="chat-title p-10 b-b">
              会议聊天记录
            </div>
            <div class="chat-content">
              <ul>
                <li class="chat-item">
                  <span class="chat-user">单纯的开始：</span>亲，你好！
                </li>
              </ul>
            </div>
          </div>
          <div flex="" class="p-h-10">
            <el-input placeholder="请输入聊天内容" type="textarea" />
            <el-button>发送</el-button>
          </div>
        </div>
      </div>
      <div class="invite-pannel m-t-20 f-14">
        <div class="p-v-20 p-h-10">
          <span>邀请链接：</span>
          <span>http://www.purestart.com.cn</span>
        </div>
      </div>
    </div>
    <joinCom v-if="linkState === 'idle'" @onJoin="onJoin" />
  </div>
</template>

<script type="text/ecmascript-6">
import joinCom from '../fragment/joinCom';
import controlCom from '../fragment/controlCom';
  export default {
    components:{
      joinCom,
      controlCom
    },
    data () {
      return {
        linkState:"idle", //连接状态 idle 未连接 connecting 连接中

      }
    },
    created () {
    },
    mounted () {

    },
    methods:{
      onJoin(){
        this.linkState = "connecting";
      },
      mousemove(){
        // console.log("mousemove");
        if(!this.$refs.controlCom) return;
        let activeControl = this.$refs.controlCom.getActiveControl();
        if(!activeControl){
          this.$refs.controlCom.setActiveControl(true);
        }
      },
      statusChange(option){
        console.log(option);
        if(!option.type) return;
        switch (option.type) {
          case "handUp":
              this.linkState="idle";
            break;

          default:
            break;
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
.page-container {
  .invite-pannel{
    background-color: #fff;
  }
  .video-wrapper {
    min-height: 600px;
    background: #fff;
    width: 65vw;
    border-radius: 5px;

    .video-content {
      background: #666;
      position: relative;
    }
    .video {
      background: #000;
    }
    .local-video {
      min-height: 600px;
    }
    .remote-video {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  .chat-box {
    min-height: 600px;
    background: #fff;
    margin-left: 10px;
    -moz-box-flex: 1;
    box-flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    border-radius: 5px;
    .chat-wraper {
      .chat-title {
        background-color: #fefefe;
        font-weight: 600;
      }
      .chat-content {
        height: 500px;
      }
      .chat-item {
        padding: 10px 10px;
        border-bottom: 1px solid #ebebeb;
        .chat-user {
          color: #3c9cfe;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
