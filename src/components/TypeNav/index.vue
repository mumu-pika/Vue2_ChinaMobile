<template>
  <div class="type-nav">
    <div class="container">
      <!-- 设置鼠标移入显示，鼠标移除不显示 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部产品服务</h2>
        <!-- 过渡动画 -->
        <transition name="sort" appear>
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId">
                <li :class="{ cur: currentIndex == index }" @mouseenter="changeIndex(index)">
                  <!-- 上方的li运用了js方法来改变鼠标悬停导航栏条目上变色的效果，将当前鼠标索引值等同于所在条目的索引值时候，赋予那个条目一个class属性cur,触发 -->
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </li>
                <!-- 二级、三级分类 -->
                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName
                          }}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName
                            }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">首页</a>
        <a href="###">移动商城</a>
        <a href="###">网上营业厅</a>
        <a href="###">我的移动</a>
        <a href="###">服务中心</a>
      </nav>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  //引入lodash:是把lodash全部封装好的函数全都引入进来了
  //按需引入：只是引入节流函数，其他的函数没有引入（模块），这样做的好处是，当你打包项目的时候体积会小一些
  import throttle from "lodash/throttle";
  export default {
    name: "typeNav",
    data() {
      return {
        //当前这个属性决定了到底那个h3身上有类名
        currentIndex: -1,
        show: true,
      };
    },
    //发请求经常在mounted生命周期函数中进行
    //组件挂载完毕
    mounted() {
      //当组件挂载完毕，让show属性变为false
      //如果不是Home路由组件，将typeNav进行隐藏
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    //计算属性
    computed: {
      //state:他是咱们大仓库中的state（包含home|search）
      ...mapState({
        categoryList: (state) => state.home.categoryList,
      }),
    },
    methods: {
      //用于修改组件实例身上的currentIndex的属性值
      //当用户鼠标移入到h3身上的时候就会立即出发一次
      changeIndex: throttle(function (index) {
        //修改当前currentIndex索引值
        //函数节流:在20MS时间之内只能执行一次
        this.currentIndex = index;
      }, 20),

      //进行路由跳转的回调函数（编程式导航+ 事件委派）
      /*
        利用事件委派存在一些问题：1、如何断定点击一定是a标签 2、如何获取从采纳数
      */
      goSearch(event) {
        //event.target:获取到的是出发事件的元素(div、h3、a、em、dt、dl)
        let node = event.target;
        //给a标签添加自定义属性data-categoryName,全部的字标签当中只有a标签带有自定义属性
        //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
        let {
          categoryname,
          category1id, //一级分类
          category2id, //二级分类
          category3id, //三级分类
        } = node.dataset;
        //第二个问题解决了：点击的到底是不是a标签（只要这个标签身上带有categoryname）一定是a标签
        //当前这个if语句：一定是a标签才会进入
        if (categoryname) {
          //准备路由跳转的参数对象
          let location = { name: "search" };
          let query = { categoryName: categoryname };
          //一定是a标签：一级目录
          if (category1id) {
            query.category1Id = category1id;
            //一定是a标签：二级目录
          } else if (category2id) {
            query.category2Id = category2id;
            //一定是a标签：三级目录
          } else {
            query.category3Id = category3id;
          }
          /* 
            【合并query参数和params参数，解决三级菜单和头部搜索框的传参问题】
            这里三级菜单传的是query参数，而搜索框传的是params参数，所以当搜索框里有数据时候，点击三级菜单跳转时合并参数传参
           */

          //判断：如果路由跳转的时候，带有params参数，顺带着一起传递过去
          if (this.$route.params) {
            location.params = this.$route.params;
            //动态给location配置对象添加query属性
            location.query = query;
            //路由跳转
            this.$router.push(location);
          }
        }
      },
      //当鼠标移入的时候，让商品分类列表进行展示
      enterShow() {
        if (this.$route.path != "/home") {
          this.show = true;
        }
      },
      //当鼠标离开的时候，让商品分类列表进行隐藏
      leaveShow() {
        this.currentIndex = -1; //重置鼠标索引值保存
        // 判断如果是Search路由组件的时候才会执行
        if (this.$route.path != "/home") {
          this.show = false;
        }
      },
    },
  };
</script>

<style scoped lang="less">
  .type-nav {
    border-bottom: 1px solid #e1251b;

    /* 整个横向导航栏的样式 */
    .container {
      width: 1200px;
      height: 48px;
      margin: 0 auto;
      display: flex;
      position: relative;

      /* 设置横向导览栏样式 */
      .all {
        width: 210px;
        background-color: #3eb4fa;
        font-size: 17px;
        line-height: 47px;
        text-align: center;
        color: #fff;
        font-weight: bold;
      }

      .nav {
        a {
          margin: 0 22px;
          padding-left: 0.325rem;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #ffffff;
        border: 1px solid #3eb4fa;
        z-index: 999;
        display:flex;
        flex-direction: column;

        .all-sort-list2 {
          width: 100%;
          .item {
            li {
              list-style: none;
              height: 4rem;
              line-height: 4rem;
              font-size: 1rem;
              font-weight: 400;
              overflow: hidden;
              padding: 0 2rem;
              margin: 0;
              &:hover a{
                color: #3eb0ec
              }
              a {
                color: #333;
              }

              /* 鼠标悬停至导览栏条目上变色 */
              &.cur {
                background: #fefaf1;
              }
            }

            /* 二、三级分类 */
            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #ffffff;
              left: 210px;
              border: 1px solid #eee;
              border-radius: 2px;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }
          }
        }
      }

      /* 导航栏过渡动画的样式 */
      /* 过渡动画开始状态（进入） */
      .sort-enter {
        height: 0px;
      }

      /* 过渡动画结束状态（进入） */
      .sort-enter-to {
        height: 461px;
      }

      /* 定义动画时间、速率 */
      .sort-enter-active {
        transition: all 0.5s linear;
      }

      /* 过渡动画结束状态（离开） */
      /* .sort-leave {
        height: 461px;
      } */

      /* 过渡动画结束状态（进入） */
      /* .sort-leave-to {
        height: 0px;
      } */

      /* 定义动画时间、速率 */
      /* .sort-leave-active {
        transition: all 0.5s linear;
      } */
    }
  }
</style>