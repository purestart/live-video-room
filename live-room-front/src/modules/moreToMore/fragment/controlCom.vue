<template>
  <div :class="activeControl?'active':''" class="control-com">
    <div class="control-box p-l-20 p-r-30" flex="main:justify cross:center">
      <div class="left-wrapper" flex="">
        <el-dropdown trigger="click" placement="top-start" @command="clickMore">
          <div class="btn-item" flex="dir:top cross:center main:center">
            <i style="color:#fff" class="iconfont icon-more" />
            <!-- <div>
              更多
            </div> -->
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="member">成员列表</el-dropdown-item>
            <el-dropdown-item command="member">邀请链接</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div flex="" class="right-wrapper">
        <div class="btn-item m-l-30" flex="dir:top cross:center main:left">
          <i class="iconfont icon-voice2" />
          <span class="m-t-5">开启扬静音</span>
        </div>
        <div class="btn-item m-l-20" flex="dir:top cross:center main:left">
          <i class="iconfont icon-camera" />
          <span class="m-t-5">关闭摄像头</span>
        </div>
        <div class="btn-item m-l-35" flex="dir:top cross:center main:left">
          <i class="iconfont icon-17yuyin-2" />
          <span class="m-t-5">静音</span>
        </div>
        <div @click="handUp" class="btn-item m-l-45" flex="dir:top cross:center main:left">
          <i class="iconfont icon-phonedianhua" />
          <span class="m-t-5">挂断</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
        activeControl:false,
        timer:null
      }
    },
    created () {
    },
    mounted () {

    },
    methods:{
      setActiveControl(activeControl){
        this.activeControl = activeControl;
        if(this.timer){
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.timer = setTimeout(() => {
          this.activeControl = false;
          clearTimeout(this.timer);
          this.timer = null;
        }, 2000);
      },
      getActiveControl(){
        return this.activeControl;
      },
      clickMore(a){
        console.log(a);
      },
      handUp(){
        let options = {
          type:"handUp"
        }
        this.$emit("statusChange", options);
      }

    }
  }
</script>

<style lang='scss' scoped>
.control-com{
  position: absolute;
  color:#fff;
  bottom:0;
  left:0;
  width:100%;
  height: 80px;
  background: #333;
  opacity: 0;
  transition: all 1s;
  font-size: 14px;
  &.active{
    opacity: 1;
  }
  .left-wrapper{
    .iconfont{
      font-size: 25px;
    }
    .btn-item{
      cursor: pointer;
    }
  }
  .right-wrapper{
    .iconfont{
      font-size: 25px;
    }
    .btn-item{
      cursor: pointer;
      &:hover{
        color: red;
      }
    }
  }
  .control-box{
    height: 80px;
  }
}
</style>