<template>
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <!-- carsousel轮播图 -->
        <Carsousel :list="bannerList" />
      </div>
      <div class="right">
        <div class="news">
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li>
              <a href="###">
                <img src="./images/话费查询.gif" alt="话费查询">
                <p>话费查询</p>
              </a>
            </li>
            <li>
              <a href="###">
                <img src="./images/流量查询.gif" alt="流量查询">
                <p>流量查询</p>
              </a>
            </li>
            <li>
              <a href="###">
                <img src="./images/国际港澳台.png" alt="国际港澳台">
                <p>国际/港澳台</p>
              </a>
            </li>
            <li>
              <a href="###">
                <img src="./images/积分兑换.gif" alt="积分兑换">
                <p>积分兑换</p>
              </a>
            </li>
            <li>
              <a href="###">
                <img src="./images/优惠专区.gif" alt="优惠专区">
                <p>优惠专区</p>
              </a>
            </li>
            <li>
              <a href="###">
                <img src="./images/业务办理.jpg" alt="业务办理">
                <p>业务办理</p>
              </a>
            </li>
          </ul>
        </div>
        <!-- <ul class="lifeservices">
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul> -->
        <div class="ads">
          <img src="./images/ad1.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  mounted() {
    //派发action: 通过Vuex发起ajax请求，将数据仓库在当中
    //mounted:组件挂载完毕，正常说组件结构（DOM）已经全有了
    //为什么swiper实例在mounted当中直接书写不可以：因为结构还没有完整
    //因为dispatch
    this.$store.dispatch("getBannerList");
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
    }),
  }
};
</script>

<style scoped lang="less">
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 248px;
      border: 1px solid #3eb0ec;
      border-radius: 2px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }
        // 首页右侧小栏目
        .news-list {
          display: flex;
          padding: 0.5rem 0;
          line-height: 1rem;
          flex-wrap: wrap;
          li {
            display: inline-block;
            width: 5rem;
            margin: 1rem 0 ;
            a {
              display: block;
              width: 100%;
              height: 100%;
              text-align:center;
              img {
                margin: 0.4rem auto;
              }
            }
          }
          .bold {
            font-weight: 700;
          }
        }
      }
      // 生活区域
      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            /* 注意这里url中的@指的是src路径【符号别名】，这个是在jsconfig.json里配置好的，但是注意！这里前面需要加上~ */
            background-image: url(~@/assets/images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }
      // 广告区域
      .ads {
        margin-top: 2rem;
        
        img {
          opacity: 0.8;
          transition: all 400ms;
          width: 100%;
          height: 100%;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
