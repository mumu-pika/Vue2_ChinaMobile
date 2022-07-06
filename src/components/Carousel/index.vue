<template>
  <div class="swiper-container" ref="cur" dir="ltr">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img class="slide-picture" :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev "></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
  //引入Swiper
  import Swiper, { Pagination, Navigation, Autoplay } from 'swiper' // js 模块
  Swiper.use([Pagination, Navigation, Autoplay]) //swiper6开始按需引入
  export default {
    name: "Carsousel",
    props: ["list"],
    watch: {
      list: {
        //为什么watch监听不大list：因为这个数据从来没有发生变化（数据是父亲给的，父亲给的时候就是一个对象，对象里面该有的数据都是有的）
        //立即监听：不管你数据有没有变化，我上来立即监听一次
        immediate: true,
        handler() {
          //只能监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用nextTick
          this.$nextTick(() => {
            var mySwiper = new Swiper(this.$refs.cur, {
              // direction:'vertical',
              loop: true,
              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                type: 'bullets',//设置分页器样式类型为圆点
                // dynamicBullets: true,//动态分页器
                clickable: true,//点击分页器的指示点分页器会控制Swiper切换。
              },
              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },

              //自动轮播设置
              speed: 1000,  //切换速度，即slider自动滑动开始到结束的时间（单位ms），也是触摸滑动时释放至贴合的时间
              grabCursor : true, //设置为true 时，鼠标覆盖Swiper 时指针会变成手掌形状，拖动时指针会变成抓手形状
              slideToClickedSlide: true, //设置为true则点击slide会过渡到这个slide
              freeMode: true,//根据惯性滑动可能不止一格且不会贴合
              observer: true,//修改swiper自己或子元素时，自动初始化swiper
              observeParents: true,//修改swiper的父元素时，自动初始化swiper
              autoplay: {
                delay: 2000, //自动切换的时间间隔，单位ms
                stopOnLastSlide: false,
                disableOnInteraction: false,//用户操作swiper之后，是否禁止autoplay
                pauseOnMouseEnter: true,
              },
            });
          });
        },
      },
    },
  };
</script>

<style scoped lang="less">
  .swiper-container {
    /* 为了替换按钮样式，这里将预设的按钮样式设置为透明 */
    --swiper-navigation-color: transparent;/* 单独设置按钮颜色 */
    --swiper-navigation-size: 50px;/* 设置按钮大小 */

    /* 由于 swiper这里会包裹一个div并限制了宽度，所以这边将图片宽度设为100%*/
    .slide-picture{
      width: 100%;
    }


    /* 设置导航切换按钮隐藏 */
    .swiper-button-prev,
    .swiper-button-next {
      display: none;
    }

    /* 设置导航切换按钮，当鼠标悬停在swiper区域时显示 */
    &:hover .swiper-button-prev {
      display: block;
      width: 20px;
      background-color: rgba(0, 0, 0, .1);
      background-image: url('./images/button-left.png');
      background-size: 100% 100%;
    }

    &:hover .swiper-button-next {
      display: block;
      width: 20px;
      background-color: rgba(0, 0, 0, .1);
      background-image: url('./images/button-right.png');
      background-size: 100% 100%;
    }

    .swiper-button-prev:hover{
      background-image: url('./images/button-left-hover.png');
      background-size: 100% 100%;
    }

    .swiper-button-next:hover{
      background-image: url('./images/button-right-hover.png');
      background-size: 100% 100%;
    }

  }

</style>