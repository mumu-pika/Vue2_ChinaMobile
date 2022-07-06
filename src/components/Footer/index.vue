<template>
  <div class="footer">
    <div class="footer-container">
      <!-- 底部服务导航栏列表 -->
      <div class="footerList">
        <!-- 依次列出4个列表 -->
        <div class="footerItem">
          <footerItem :title="title[0]">
            <!-- 作用域插槽 -->
            <template slot-scope="listScope">
              <ul class="footerItemCon">
                <li v-for="(item,index) in listScope.List.list1" :key="index">{{item}}</li>
              </ul>
            </template>
          </footerItem>
        </div>
        <div class="footerItem">
          <footerItem :title="title[1]">
            <!-- 作用域插槽 -->
            <template slot-scope="listScope">
              <ul class="footerItemCon">
                <li v-for="(item,index) in listScope.List.list2" :key="index">{{item}}</li>
              </ul>
            </template>
          </footerItem>
        </div>
        <div class="footerItem">
          <footerItem :title="title[2]">
            <!-- 作用域插槽 -->
            <template slot-scope="listScope">
              <ul class="footerItemCon">
                <li v-for="(item,index) in listScope.List.list3" :key="index">{{item}}</li>
              </ul>
            </template>
          </footerItem>
        </div>
        <div class="footerItem">
          <footerItem :title="title[3]">
            <!-- 作用域插槽 -->
            <template slot-scope="listScope">
              <ul class="footerItemCon">
                <li v-for="(item,index) in listScope.List.list4" :key="index">{{item}}</li>
              </ul>
            </template>
          </footerItem>
        </div>
        <div class="footerItem">
          <footerItem :title="title[4]">
            <!-- 作用域插槽 -->
            <template slot-scope="listScope">
              <ul class="footerItemCon">
                <li v-for="(item,index) in listScope.List.list5" :key="index">{{item}}</li>
              </ul>
            </template>
          </footerItem>
        </div>
      </div>
      <!-- 底部网站版权、友链等区域 -->
      <div class="information">
        <!-- 友情链接 -->
        <ul class="helpLink">
          <li v-for="(value, index) in helpLink" :key="index">
            <a href="javascript:void(0)" class="link">{{value}}</a>
            <span class="space"></span>
          </li>
          <a href="javascript:void(0)" class="link">房租减免</a>
        </ul>
        <!-- 网站版权信息 -->
        <div class="copyright">
          <div class="otherLink">
            <span>掌上营业厅：</span>
            <a href="http://wap.10086.cn/">wap.10086.cn</a>
            <span>语音自助服务：10086 短信营业厅：10086</span>
            <a href="http://www.10086.cn/support/service/channel/entity/">自助终端</a>
            <a href="http://www.10086.cn/support/service/channel/entity/">营业厅</a>
            <a href="http://www.10086.cn/cmccclient/index.htm">中国移动客户端下载</a>
          </div>
          <!-- 许可信息 -->
          <div class="license">
            <span>Copyright©1999-2022 中国移动 版权所有</span>
            <span>本网站支持IPv6访问</span>
          </div>
          <div class="row">
            <div class="col-left">中华人民共和国增值电信业务经营许可证</div>
            <div class="col-right">经营许可证编号：A2.B1.B2-20100001</div>
          </div>
          <div class="col-left">
            <img src="./images/imge1.png" alt="可信网站认证1">
            <img src="./images/imge2.png" alt="可信网站认证2">
          </div>
          <div class="col-right">
            <p>
              <a href="http://beian.miit.gov.cn/">京ICP备05002571号</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 引入FootItem组件
  import footerItem from "./FooterItem"
  export default {
    name: "Footer",
    components: {
      footerItem
    },
    data() {
      return {
        title: ["服务渠道", "站点导航", "便捷服务", "便民工具", "服务指南"],
        helpLink: ["新闻中心", "城聘英才", "企业合作", "站点导航", "中移信息技术公司",
          "中国移动香港公司", "政企客户分公司", "数字家庭合作联盟", "网站地图", "友情链接",
          "扫黄打非举报", "打击传销"]
      }
    },
  };
</script>

<style scoped lang="less">
  .footer {
    /* 设置底部整体背景色 */
    background-color: #ffffff;

    .footer-container {
      width: 1200px;
      margin: 0 auto;
      padding: 0 15px;
      margin-bottom: 100px;
      .footerList {
        margin: 10px auto 10px;
        padding: 20px 0 20px 35px;
        border: 1px solid #dfdfdf;
        overflow: hidden;

        .footerItem {
          color: #666;
          font-size: 16px;
          /* 这里由于是5个列表，故均width分成5份 */
          width: 20%;
          float: left;
          h4 {
            font-size: 14px;
          }
          .footerItemCon {
            li {
              line-height: 18px;
              margin: 5px 0;
            }
          }

          &:last-child img {
            width: 121px;
          }
        }
      }

      .information {
        padding: 20px;

        .helpLink {
          text-align: center;

          li {
            display: inline;

            a {
              text-decoration: none;

            }

            .space {
              border-left: 1px solid #666;
              width: 1px;
              height: 13px;
              /* background: #666; */
              margin: 8px 10px;
            }
          }
        }

        .copyright {
          padding: 5px 5px;
          text-align: center;
          a, span {
            margin: 2px;
          }
          .col-left {
            float: left;
            width: 49.5%;
            text-align: right;
            padding: 5px auto;

            img {
              margin: 5px;
            }
          }

          .col-right {
            float: right;
            width: 49.5%;
            text-align: left;

            p {
              background: url('./images/gov.gif') no-repeat;
              background-size: 21px 25px;
              line-height: 25px;
              margin: 12px 0 0 0;
              padding: 0 0 0 25px;
            }
          }
        }
      }
    }
  }
</style>