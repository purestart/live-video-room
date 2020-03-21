<template>
  <div class="join-page">
    <div class="join-title">加入视频通话</div>
    <div class="p-t-20 p-b-20 b-b">
      <div class flex="box:last">
        <el-input v-model="roomId" class="input-no f-15" placeholder="请输入好友ID或者终端号"></el-input>
        <el-button type="primary" @click="join" class="m-l-10 w-60">加入视频</el-button>
      </div>
      <div class="p-t-15">
        <el-checkbox-group v-model="joinOption">
          <el-checkbox label="加入时关闭摄像头" name="type"></el-checkbox>
          <el-checkbox label="加入时静音" name="type"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="p-t-20">
      <div class="last-title">最近联系人</div>
      <div class="latest-wrapper p-t-10">
        <div
          class="latest-item b-b p-v-10 p-h-10"
          :key="index"
          v-for="(item, index) in relateList"
          flex="main:justify"
          @click="join(item.id)"
        >
          <div>
            <div flex>
              <div>
                <img src="../../../assets/images/header.png" class="image" />
              </div>
              <div class="m-l-20" flex="dir:top main:justify">
                <div class="m-t-5 f-16">{{item.name}}</div>
                <div class="m-b-5">{{item.id}}</div>
              </div>
            </div>
          </div>
          <div flex="cross:center">
            <el-button v-if="index == 0">进入</el-button>
            <el-button v-if="index != 0">加入</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      joinOption: [],
      roomId: "",
      relateList: [
        {
          name: "我的视频",
          id: 522382456
        },
        {
          name: "单纯的开始",
          id: 5678563233
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    join(id) {
      if (id) {
        this.roomId = id;
      }
      if (!this.roomId) {
        this.$message({
          type: "warning",
          message: "请输入好友ID或者终端号"
        });

        return;
      }
      let options = {
        roomId: this.roomId
      };
      this.$emit("onJoin", options);
    }
  }
};
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
