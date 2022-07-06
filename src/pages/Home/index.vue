<template>
  <div>
    <!-- 全局的三级菜单 -->
    <typeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- Floor这个组件：自己在组件内部是没有发请求的，数据是父组件给的 ,v-for也可以在自定义标签里使用-->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <Brand />
  </div>
</template>

<script>
//非路由组件在使用的时候分为三大步：定义、注册、使用
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Brand from "./Brand";
import Floor from "./Floor";
import { mapState } from "vuex";
export default {
  name: "",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Brand,
    Floor,
  },
  mounted() {
    //派发action,获取floor组件的数据
    this.$store.dispatch("getFloorList");
    //在打开首页时，派发任务，向服务器发送请求，获取用户信息
    // this.$store.dispatch('getUserInfo');
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style scoped></style>
