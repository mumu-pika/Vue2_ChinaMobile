import Vue from "vue";
import App from "./App.vue";
//引入路由相关文件
import router from "@/router";
//引入仓库进行注册
import store from "@/store";
//定义全局组件：在入口文件注册一次之后，在任何组件当中都可以使用
import typeNav from "@/components/TypeNav";
import Carsousel from "@/components/Carousel";
import Pagination from '@/components/Pagination'
import { Button,MessageBox} from 'element-ui';
import SearchHistory from '@/components/SearchHistroy'
//全局组件：第一个参数 组件名字  第二个参数：那个组件
Vue.component(typeNav.name, typeNav);
Vue.component(Carsousel.name, Carsousel);
Vue.component(Pagination.name,Pagination);
Vue.component(SearchHistory.name, SearchHistory);
//注册全局组件
Vue.component(Button.name,Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入MockServer.js----mock数据
import "@/mock/mockServe";
//引入swiper样式
// import "swiper/css/swiper.css"; //swiper5的版本
import "swiper/swiper-bundle.css"; //swiper6的版本
//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from '@/api';
import picture from '@/assets/images/LazyLoad.jpg'; //
//引入插件
import VueLazyload from 'vue-lazyload';
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading: picture
});
//引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins,{
    name:'upper'
});

//引入表单校验插件
import "@/plugins/validate";
new Vue({
  render: (h) => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    //将API直接转载到全局
    Vue.prototype.$API = API;
  },
  //需要把router进行注册
  //可以让全部的组件（非路由|路由组件）都可以获取到$route|$router属性
  //$route(路由)：可以获取到路由信息（path、query、params）
  //$router:进行编程式导航路由跳转push||replace
  router,
  //在入口文件这里注册store,这样每一个组件的身上都拥有一个$store这个属性
  store,
}).$mount("#app");

