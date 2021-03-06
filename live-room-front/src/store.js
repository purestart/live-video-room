/* eslint-disable quotes */
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import defaultStore from "./modules/common/vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    default: defaultStore
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      reducer: state => ({
        default: {
          userInfo: state.default.userInfo,
          menus: state.default.menus,
          menuTabs: state.default.menuTabs,
          selectedTab: state.default.selectedTab,
          noMenuTabsMap: state.default.noMenuTabsMap
          // allAreas: state.default.allAreas
        }
      })
    })
  ]
});

export default store;
