/* eslint-disable quotes */
/**
 * Created by 詹陈龙 on 2019.02.18
 */

// import userApi from '../api/demo'

import router from "../../../src/router";
import { Base64 } from "js-base64";

import { utils } from "../../utils/utils";

// const defaultTabs = [{
//   key: '0',
//   url: '/',
//   menus: [{
//     id: '0',
//     name: '首页',
//     url: '/home',
//     noClose: true
//   }]
// }]

const state = {
  loading: false,
  allAreas: [],
  noMenuTabsMap: {},
  userInfo: {},
  userMenus: [],
  appId: "pc",
  menuTabs: [], // tabs
  selectedTab: "0", // 当前激活的tab
  msg: "vuex data",
  permissions: ["sys:user:delete", "sys:user:export"], // 资源按钮权限
  categoryList: [],
  isPC: true  // 当前环境是否为PC
};
const getters = {
  // 打平的菜单，只有一个层级
  flatMenu(state) {
    return utils.flatObject(state.menus).map(menu => ({
      ...menu,
      id: menu.id + ""
    }));
  },
  isSuperAdmin(state) {
    return state.userInfo.userType === 3;
    // return state.userInfo && state.userInfo.roleVoList && state.userInfo.roleVoList.filter(r => r.roleCode === 'OP001').length === 1
  }
};
const mutations = {
  updateIsPc(state, payload) {
    // console.log(payload);
    state.isPC = payload;
  },
  updateLoading(state, show) {
    state.loading = show;
  },
  updateCategory(state, categoryList) {
    state.categoryList = categoryList;
  },
  updateMsg(state, payload) {
    state.msg = payload;
  }
};
const actions = {
  updateUserInfo(context, params) {
    context.commit("updateUser", params);
  },
  clearUserInfo(context, params) {
    context.commit("clearUserInfo");
  },
  login(context, params) {
    // return systemApi.login(params)
  },
  getUserAuth(context, params) {
    // userApi.getUserAuth(params)
  },
  // 获取用户授权资源
  fetchAuth(
    { commit, dispatch },
    payload = {
      noShare: false
    }
  ) {
    // let params = {}
    // userApi.getUserAuth(params).then((res) => {
    // }).catch(() => {})
  },
  logOut(
    { commit, dispatch },
    payload = {
      noShare: false
    }
  ) {
    // userApi.logOut({}).then(res => {
    //   if (res.status === 200) {
    //     localStorage.removeItem('ticket')
    //     commit('clearUserInfo')
    //     localStorage.removeItem('token')
    //     if (localStorage.getItem('nativeLogin')) {
    //       localStorage.removeItem('nativeLogin')
    //       router.push('/login')
    //     } else {
    //       // window.location.href = ssoUrl + '/logout?service=' + location.origin + '/home'
    //     }
    //   }
    // })
    // userApi.logOut((res) => {
    //
    // }, err => {}, {})
  },
  getArea(content, params) {
    // return systemApi.getArea(params)
  },
  nativeLogin(context, params) {
    // return systemApi.nativeLogin(params)
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
