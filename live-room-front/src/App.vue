<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isPC: state => state.default.isPC // 其它参数
    })
  },
  mounted() {
    this.getEnv();
    window.onresize = () => {
      // return (() => {
      //   this.screenWidth = document.body.clientWidth;
      //   this.screenHeight = document.body.clientHeight;
      // })();
      // console.log(window.screen.availWidth);
      this.getEnv();
    };
  },
  methods: {
    ...mapMutations(["updateIsPc"]),
    getEnv() {
      let flag = true;
      flag = this.IsPC();
      if (window.screen.availWidth < 700) {
        flag = false;
      } else {
        flag = true;
      }
      this.updateIsPc(flag);
    },
    IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif, "微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
