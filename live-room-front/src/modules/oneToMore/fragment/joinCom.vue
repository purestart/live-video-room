<template>
  <div class="join-page">
    <div class="join-title">
      加入直播间
    </div>
    <div class="p-t-20 p-b-20 b-b">
      <div class="" flex="box:last">
        <el-input
          class="input-no f-15"
          placeholder="请输入房间号或者终端号"
        ></el-input>
        <el-button type="primary" @click="join" class="m-l-10 w-60"
          >开启直播</el-button
        >
      </div>
      <div class="p-t-15">
        <el-checkbox-group v-model="joinOption">
          <el-checkbox label="进入时关闭摄像头" name="type"></el-checkbox>
          <el-checkbox label="进入时静音" name="type"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="p-t-20">
      <div class="last-title">
        直播列表
      </div>
      <div class="latest-wrapper p-t-10">
        <div :key="index" v-for="(item,index) in 1" class="live-item m-r-10 m-b-10">
          <el-card shadow="hover">
            <a class="live-link" @click="toJoin" href="javascript:void(0)">
              <img class="live-image" src="../../../assets/images/zhibo.jpg" />
              <div class="item-mask"></div>
              <i class="iconfont "></i>
            </a>
            <div class="p-10">
              <div class="live-title p-l-3">xxx直播</div>
              <div class="m-t-10 live-desc" flex="main:justify">
                <div flex="cross:center">
                  <img
                    class="user-head"
                    src="../../../assets/images/header.png"
                  />

                  <div class="p-l-5">单纯的开始</div>
                </div>
                <div>
                  <i class="iconfont icon-LC_icon_user_group_line"></i>
                  <span>256</span>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      joinOption:[]
    }
  },
  created () {
  },
  mounted () {

  },
  methods:{
    join(){
      this.$emit("onJoin");
    },
    toJoin(){
      this.$message("该直播已停止！");
    }
  }
}
</script>

<style lang="scss" scoped>
.join-page {
  background: #ffffff;
  padding: 20px 20px;
  .w-60 {
    // width: 60px;
  }
  .input-no {
  }
  .join-title {
    font-size: 20px;
    font-weight: 600;
  }
  .last-title {
    font-size: 16px;
    font-weight: 600;
  }

  .latest-wrapper {
    .image {
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }
    .live-item {
      display: inline-block;
      /deep/ .el-card__body {
        padding: 0;
      }
      .live-link {
        position: relative;
        display:block;
        .item-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: all 0.3s ease-out;
          opacity: 0;
          background: #000;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          filter: alpha(opacity=0);
        }
        .iconfont {
          opacity: 0;
          filter: alpha(opacity=0);
          position: absolute;
          top: 50%;
          left: 50%;
          width: 50px;
          height: 50px;
          margin: -25px 0 0 -25px;
          background: url(https://a.msstatic.com/huya/main3/widget/game-live-item/img/play-icon_fbf7f.png)
            no-repeat;
          // transform: scale(2);
          backface-visibility: hidden;
          transition: all 0.25s ease-out;
        }
        &:hover {
          .item-mask {
            opacity: 0.5;
          }
          .iconfont{
            opacity: 1;
          }
        }
      }

      .live-title {
        font-size: 14px;
      }
      .live-desc {
        color: #999;
        font-size: 12px;
      }
      .live-image {
        width: 300px;
        height: 180px;
      }
      .user-head {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        border: 1px solid #e2e2e2;
      }
    }
    .latest-item {
      &:hover {
        background: #efefef;
      }
    }
  }

  /deep/ .el-input--small .el-input__inner {
    height: 40px;
    line-height: 40px;
  }
  /deep/ .el-button--small {
    padding: 9px 45px;
    font-size: 14px;
    border-radius: 3px;
  }
}
</style>
