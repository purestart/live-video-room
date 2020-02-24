<template>
  <div class="page-container">
    <div v-if="linkState !== 'idle'">
      <div flex="main:center" class="video-panel">
        <div @mousemove="mousemove" class="video-wrapper">
          <div
            flex="main:center cross:center"
            class="video-content local-video"
          >
            <video id="localvideo" autoplay playsinline muted class="video" />
            <div flex="main:center" class="video-content remote-video">
              <video id="remotevideo" autoplay playsinline class="video" />
            </div>
            <controlCom @statusChange="statusChange" ref="controlCom" />
          </div>
        </div>
        <div class="chat-box">
          <div class="chat-wraper">
            <div class="chat-title p-10 b-b">
              与单纯的开始聊天
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
          <span>{{myDomain + '?roomid=' + roomid}}</span>
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
  components: {
    joinCom,
    controlCom
  },
  data () {
    return {
      linkState: "idle", //连接状态 idle 未连接 connecting 连接中
      localStream:null,
      remoteStream:null,
      state: 'init',
      pcConfig: {
        'iceServers': [{
          'urls': 'turn:stun.purestart.com.cn:3478',
          'credential': "8319603",
          'username': "purestart"
        }]
      },
      pc:null,
      offerdesc:null,
      roomid:"",
      socket:null,
      myDomain:""
    }
  },
  created () {
  },
  mounted () {
    let domain = document.domain;
    let protocol = location.protocol;
    this.myDomain = protocol + "//" + domain;
    console.log(this.myDomain);
  },
  beforeDestroy(){
    this.leave();
  },
  methods: {
    onJoin (options) {
      if(options.roomId){
        this.roomid = options.roomId;
        this.init();
        this.linkState = "connecting";
      }
    },
    leave() {
      if(this.socket){
        this.socket.emit('leave', this.roomid); //notify server
      }
      this.hangup();
      this.closeLocalMedia();
      this.linkState = "idle";
    },

    mousemove () {
      // console.log("mousemove");
      if (!this.$refs.controlCom) return;
      let activeControl = this.$refs.controlCom.getActiveControl();
      if (!activeControl) {
        this.$refs.controlCom.setActiveControl(true);
      }
    },
    statusChange (option) { // 状态改变
      console.log(option);
      if (!option.type) return;
      switch (option.type) {
        case "handUp":
          // this.linkState = "idle";
          this.leave();
          break;

        default:
          break;
      }
    },
    init () { // 初始化
      if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {
        console.error('the getUserMedia is not supported!');
        return;
      } else {
        var constraints;
        if (false) {
          constraints = {
            video: false,
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            }
          }
        } else {
          constraints = {
            video: true,
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            }
          }
        }
        navigator.mediaDevices.getUserMedia(constraints)
          .then(this.getMediaStream)
          .catch(this.handleError);
      }

    },
    getMediaStream(stream){

      if(this.localStream){
        stream.getAudioTracks().forEach((track)=>{
          this.localStream.addTrack(track);
          stream.removeTrack(track);
        });
      }else{
        this.localStream = stream;
      }
      let localVideo = document.querySelector('video#localvideo');
      // let remoteVideo = document.querySelector('video#remotevideo');
      localVideo.srcObject = this.localStream;
      // remoteVideo.srcObject = this.localStream;

      //这个函数的位置特别重要，
      //一定要放到getMediaStream之后再调用
      //否则就会出现绑定失败的情况
      //
      //setup connection
      this.conectServer();
    },
    handleError(err){ // 处理异常
      console.error('Failed to get Media Stream!', err);
    },
    sendMessage(roomid, data){  // 发送消息到服务器
      console.log('send message to other end', roomid, data);
      if(!this.socket){
        console.log('socket is null');
      }
      this.socket.emit('message', roomid, data);
    },
    conectServer(){
      let socket = io.connect("wss://apilive.purestart.com.cn");
      
      socket.on('joined', (roomid, id) => {
        console.log('receive joined message!', roomid, id);
        this.state = 'joined'

        //如果是多人的话，第一个人不该在这里创建peerConnection
        //都等到收到一个otherjoin时再创建
        //所以，在这个消息里应该带当前房间的用户数
        //
        //create conn and bind media track
        this.createPeerConnection();
        this.bindTracks();
        console.log('receive joined message, state=', this.state);
      });

      socket.on('otherjoin', (roomid) => {
        console.log('receive joined message:', roomid,this.state);

        //如果是多人的话，每上来一个人都要创建一个新的 peerConnection
        //
        if(this.state === 'joined_unbind'){
          this.createPeerConnection();
          this.bindTracks();
        }

        this.state = 'joined_conn';
        this.call();

        console.log('receive other_join message, state=', this.state);
      });

      socket.on('full', (roomid, id) => {
        console.log('receive full message', roomid, id);
        this.hangup();
        this.closeLocalMedia();
        this.state = 'leaved';
        console.log('receive full message, state=', this.state);
        // alert('the room is full!');
        this.$message("房价已满！！");
      });

      socket.on('leaved', (roomid, id) => {
        console.log('receive leaved message', roomid, id);
        this.state='leaved'
        socket.disconnect();
        console.log('receive leaved message, state=', this.state);
      });

      socket.on('bye', (room, id) => {
        console.log('receive bye message', this.roomid, id);
        //state = 'created';
        //当是多人通话时，应该带上当前房间的用户数
        //如果当前房间用户不小于 2, 则不用修改状态
        //并且，关闭的应该是对应用户的peerconnection
        //在客户端应该维护一张peerconnection表，它是
        //一个key:value的格式，key=userid, value=peerconnection
        this.state = 'joined_unbind';
        this.hangup();
        console.log('receive bye message, state=', this.state);
      });
      socket.on('disconnect', (socket) => {
        console.log('receive disconnect message!', this.roomid);
        if(!(this.state === 'leaved')){
          this.hangup();
          this.closeLocalMedia();
        }
        this.state = 'leaved';
      });
      socket.on('message', (roomid, data) => {
        console.log('receive message!', roomid, data);
        if(data === null || data === undefined){
          console.error('the message is invalid!');
          return;
        }
        if(data.hasOwnProperty('type') && data.type === 'offer') {
          // offer.value = data.sdp;
          this.pc.setRemoteDescription(new RTCSessionDescription(data));
          //create answer
          this.pc.createAnswer()
            .then(this.getAnswer)
            .catch(this.handleAnswerError);
        }else if(data.hasOwnProperty('type') && data.type == 'answer'){
          // answer.value = data.sdp;
          this.pc.setRemoteDescription(new RTCSessionDescription(data));

        }else if (data.hasOwnProperty('type') && data.type === 'candidate'){
          var candidate = new RTCIceCandidate({
            sdpMLineIndex: data.label,
            candidate: data.candidate
          });
          this.pc.addIceCandidate(candidate);
        }else{
          console.log('the message is invalid!', data);
        }
      });
      // roomid = getQueryVariable('room');
      socket.emit('join', this.roomid);
      this.socket = socket;
      return true;
    },
    call(){
      if(this.state === 'joined_conn'){
        var offerOptions = {
          offerToRecieveAudio: 1,
          offerToRecieveVideo: 1
        }
       this.pc.createOffer(offerOptions)
          .then(this.getOffer)
          .catch(this.handleOfferError);
      }
    },
    handleAnswerError(err){
      console.error('Failed to create answer:', err);
    },
    getAnswer(desc){
      this.pc.setLocalDescription(desc);
      //send answer sdp
      this.sendMessage(this.roomid, desc);
    },
    getOffer(desc){
      this.pc.setLocalDescription(desc);
      // offer.value = desc.sdp;
      this.offerdesc = desc;
      //send offer sdp
      this.sendMessage(this.roomid, this.offerdesc);	
    },
    handleOfferError(err){
      console.error('Failed to create offer:', err);
    },

    hangup(){
      if(this.pc) {
        this.offerdesc = null;
        this.pc.close();
        this.pc = null;
      }
    },
    closeLocalMedia(){

      if(this.localStream && this.localStream.getTracks()){
        this.localStream.getTracks().forEach((track)=>{
          track.stop();
        });
      }
     this.localStream = null;
    },
    createPeerConnection(){
      //如果是多人的话，在这里要创建一个新的连接.
      //新创建好的要放到一个map表中。
      //key=userid, value=peerconnection
      console.log('create RTCPeerConnection!');
      if(!this.pc){
        this.pc = new RTCPeerConnection(this.pcConfig);

        this.pc.onicecandidate = (e)=>{

          if(e.candidate) {
            this.sendMessage(this.roomid, {
              type: 'candidate',
              label:event.candidate.sdpMLineIndex, 
              id:event.candidate.sdpMid, 
              candidate: event.candidate.candidate
            });
          }else{
            console.log('this is the end candidate');
          }
        }

        this.pc.ontrack = this.getRemoteStream;
      }else {
        console.warning('the pc have be created!');
      }
      return;	
    },
    getRemoteStream(e){
      this.remoteStream = e.streams[0];
      let remoteVideo = document.querySelector('video#remotevideo');
      remoteVideo.srcObject = e.streams[0];
    },
    bindTracks(){
      console.log('bind tracks into RTCPeerConnection!');
      if( this.pc === null || this.pc === undefined) {
        console.error('pc is null or undefined!');
        return;
      }
      if(this.localStream === null || this.localStream === undefined) {
        console.error('localstream is null or undefined!');
        return;
      }
      //add all track into peer connection
      this.localStream.getTracks().forEach((track)=>{
        this.pc.addTrack(track, this.localStream);
      });

    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  .invite-pannel {
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
    #localvideo {
      // width: 800px;
      height: 600px;
    }

    .local-video {
      min-height: 600px;
    }
    .remote-video {
      position: absolute;
      bottom: 0;
      right: 0;
      #remotevideo {
        width: 250px;
        height: 150px;
      }
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
