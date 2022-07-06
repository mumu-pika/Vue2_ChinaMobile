import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout,
} from "@/api";
import { setToken, getToken,removeToken} from "@/utils/token";
import { Calendar } from "element-ui";


//登录与注册的模块
const state = {
  code: "",
  token: getToken(),
  userInfo: {},
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  //清除本地数据
  CLEAR(state){
    //帮仓库中先关用户信息清空
    state.token = '';
    state.userInfo={};
    //本地存储数据清空
    removeToken();
  }
};
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    //获取验证码的这个接口：把验证码返回，正常情况下，后台把验证码发到用户手机上
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //登录业务
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    //服务器下发token，用户唯一标识符(uuid)
    //将来经常通过带token找服务器要用户信息进行展示
    if (result.code == 200) {
      //用户已经登录成功且获取到token
      commit("USERLOGIN", result.data.token);
      //持久化存储token
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      //提交用户信息
      commit("GETUSERINFO", result.data);
      return 'ok';
    }else{
      return Promise.reject(new Error('faile'));
    }
  },
  //退出登录
  async userLogout({commit}) {
    //只是向服务器发起一次请求，通知服务器清除token
    //此外还需要注意，服务器清除了token之后，本地也需要做token清除处理
    let result = await reqLogout();
    //action里面不能操作state，提交mutation修改state
    if(result.code==200){
      commit("CLEAR");
      return 'ok';
    }else{
      return Promise.reject(new Error('faile'));
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
