<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>欢迎来到中国移动网站</p>
          <!-- 没有用户名：未登录 -->
          <p v-if="!userName">
            <!-- 声明式导航：router-link务必要有to属性 -->
            <router-link class="login" to="/login">请登录</router-link>
            <!-- <router-link class="register" to="/register">免费注册</router-link> -->
          </p>
          <!-- 登录了 -->
          <p v-else>
            <a>{{userName}}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">个人中心</router-link>

          <!-- 客户端app二维码下拉框 -->
          <a href="###" class="app">
            <span>中国移动客户端</span>
            <div class="qrcode">
              <img src="./images/qrcode.png" alt="" />
              <span>扫一扫，随时查话费!</span>
            </div>
          </a>

          <router-link to="/shopcart">积分商城</router-link>
          <a href="###" class="allService">能力开放商店</a>
          <a href="###">关于中国移动</a>
          <a href="###">证照信息</a>
          <a href="###">联系我们</a>
          <a href="###">政企客户</a>
          <a href="###">网站无障碍</a>
          <a href="###">English</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- router-link组件本身就是一个a标签 -->
        <!-- 点击logo图片路由跳转至首页 -->
        <router-link to="/" class="logo">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <!-- 搜索框区域 -->
      <div class="searchArea">
        <!-- @submit.prevent="goSearch" 阻止表单默认的提交行为，并触发search -->
        <form action="###" class="searchForm" @submit.prevent="goSearch">
          <span :class="isActive ? 'searchSpan-active' : 'searchSpan' ">
            <input type="text" autocomplete="off" class="input-error input-xxlarge" v-model="keyword"
              :placeholder="text" @focus="historyShow(true)" @blur="historyShow(false)" />
          </span>
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
            搜索
          </button>
        </form>
        <SearchHistory v-show="isHistoryShow" :keyword="keyword" />
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        //响应式数据，用于收集表单元素文本内容
        keyword: "",
        //标识是否显示搜索记录
        isHistoryShow: false,
        //搜索框内预设文字
        text: "5G套餐",
        //设置是否激活搜索记录样式
        isActive: false,
      };
    },
    methods: {
      //搜索按钮的事件处理函数，用于跳转到search路由组件当中
      //同样和typenav组件中的goSearch一样，需要合并参数
      goSearch() {
        //需要将keyword作为搜素记录保存进historyList中
        this.$bus.$emit("getHistory")
        //代表的是如果有query参数也带过去
        if (this.$route.query) {
          let location = {
            name: "search",
            params: { keyword: this.keyword || undefined },
          };
          location.query = this.$route.query;
          this.$router.push(location);
          console.log("123")
        }
      },
      //退出登录
      async logout() {
        //退出登录需要做的事情
        //1:需要发请求，通知服务器退出登录【清除一些数据：token】
        //2:清除项目当中的数据【userInfo、token】
        try {
          //如果退出成功
          await this.$store.dispatch('userLogout');
          //回到首页
          this.$router.push('/home');
        } catch (error) {

        }
      },
      //关联搜索框
      historyShow(flag) {
        //设置搜索记录是否显示标识
        //如果搜索框中没有内容
        this.isHistoryShow = flag;
        //改变激活状态
        this.isActive = !this.isActive;
      }
    },
    mounted() {
      //通过全局事件总线清除关键字keyword
      this.$bus.$on('clear', () => {
        this.keyword = "";
      });
      this.$bus.$on('setKeyWord', (value) => {
        this.keyword = value;
      })
    },
    beforeDestroy() {
      //在组件死亡前解绑
      this.$bus.$off('clear')
      this.$bus.$off('setKeyWord')
    },
    computed: {
      //用户名信息
      userName() {
        return this.$store.state.user.userInfo.name;
      }
    }
  };
</script>

<style scoped lang="less">
  /* 定义下拉框出现的样式 */
  .appear {
    display: block;
    height: 160px;
  }

  .header {
    &>.top {
      background-color: #f5f5f5;
      height: 30px;
      line-height: 30px;


      .container {
        width: 1200px;
        margin: 0 auto;
        /* overflow: hidden; */

        .loginList {
          float: left;

          p {
            float: left;
            margin-right: 10px;

            /* 请登录字段样式 */
            .login {
              color: #e40077;
              margin-left: 20px;
            }

            /* 免费注册字段样式 */
            .register {
              border-left: 1px solid #b3aeae;
              padding: 0 5px;
              margin-left: 5px;
            }

          }
        }

        .typeList {
          float: right;

          a {
            padding: 0 10px;
            text-decoration: none;

            &+a {
              border-left: 1px solid #b3aeae;
            }

            /* 中国移动客户端 */
            &.app {
              position: relative;
              box-sizing: content-box;

              .qrcode {
                width: 160px;
                height: 160px;
                position: absolute;
                color: orange;
                background-color: #ffffff;
                /* 设置文字居中 */
                text-align: center;
                /* 使.qrcode的原点对齐app的左边距 */
                left: 0px;

                /* 隐藏 */
                height: 0px;
                overflow: hidden;

                /* 设置最高层级 */
                z-index: 9999;
                /* transition 用于为样式设置过渡效果 */
                /* 当height属性发生变化的时候，需要0.3s时间 */
                transition: height 0.3s;

                img {
                  display: block;
                  width: 90px;
                  margin: 20px auto auto;
                }

                span {
                  font-size: 14px;
                  line-height: 30px;
                  /* font-family: 'microsoft yahei'; */
                  color: #000;
                }
              }

              &::after {
                content: '';
                /* 设置小三角形 */
                width: 0px;
                height: 0px;
                border-top: none;
                border: 10px solid;
                border-color: transparent transparent #3eb4fa transparent;
                /* 设置绝对定位，注意这里的app需要开启相对定位 */
                position: absolute;
                bottom: -10px;
                /* 设置水平居中 */
                left: 0px;
                right: 0px;
                margin: auto;
                /* 单独设置下边框 */
                border-bottom-color: #fff;
                /* 设置隐藏 */
                display: none;
              }

              /* 设置鼠标悬停在上面时候，下拉显示客户端二维码 */
              &:hover {
                .qrcode {
                  .appear();
                  border: 1px solid #dfddde;
                  border-top: none;
                }

                &::after {
                  .appear();
                }
              }
            }

            /* 能力开放商店 */
            &.allService {
              color: #e40077;
            }
          }
        }
      }
    }

    &>.bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
        float: left;

        .logo {
          img {
            width: 230px;
            height: 42px;
            margin: 20px 0px;
          }
        }
      }

      .searchArea {
        float: right;
        margin-top: 35px;

        /* 搜索表单 */
        .searchForm {
          overflow: hidden;
          border-radius: 2px 2px 0 0;

          .searchSpan {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0 4px;
            border: 2px solid #3eb4fa;
            float: left;

            input {
              box-sizing: border-box;
              width: 480px;
              height: 26px;
              border: 1px solid transparent;

              /* 输入框被选中时候样式 */
              &:focus {
                outline: none;
                border-bottom: 1px dashed rgba(221, 221, 221, 0.5);
              }
            }

            &:hover {
              border: 2px solid #e712b5;
            }
          }

          .searchSpan-active {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0 4px;
            border: 2px solid #3eb4fa;
            border-bottom: none;
            float: left;

            input {
              box-sizing: border-box;
              width: 480px;
              height: 26px;
              border: 1px solid transparent;

              /* 输入框被选中时候样式 */
              &:focus {
                outline: none;
                border-bottom: 1px double rgb(244, 221, 49);
              }
            }
          }


          button {
            height: 32px;
            width: 68px;
            background-color: #3eb4fa;
            border: none;
            color: #fff;
            float: left;
            cursor: pointer;
            font-size: 16px;

            &:focus {
              outline: none;
            }

            &:hover {
              background-color: #2fb0fbb7;
            }
          }
        }
      }
    }
  }
</style>