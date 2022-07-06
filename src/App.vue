<template>
  <div>
    <Header />
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home与Search可见的，但是Login|Register不可见 -->
    <!-- 利用路由元信息解决当前问题好处：一行代码就可以解决 -->
    <Footer v-show="$route.meta.isShow" />
    <!-- 全局音乐组件 -->
    <Music />
  </div>
</template>

<script>
//引入Header与Footer非路由组件
import Header from "./components/Header";
import Footer from "./components/Footer";
import Music from "./components/Music"
export default {
  name: "",
  data() {
    return {
      msg: "abc"
    }
  },
  components: {
    Header,
    Footer,
    Music
  },
  mounted() {
    /*
      因为APP根组件只会执行一次，所以为了避免多次向服务器发送请求
      对于性能上的优化，这里将typenav的action事件派发放在这里
      在APP根组件中发请求【根组件mounted】执行一次
     */
    //派发一个action||获取商品分类的三级列表的数据
    this.$store.dispatch("getCategoryList");
    console.log(this.$route.meta.isShow)
  },
};
</script>

<style lang="less">
  a:hover {
    text-decoration: none;
    color:#3eb4fa;
  }
</style>
