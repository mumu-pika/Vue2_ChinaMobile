<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!-- 购物车主体内容 -->
        <ul class="cart-list" v-for="(cart, index) in cartInfoList" :key="cart.id">
          <!-- 商品是否勾选 -->
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1"
              @change="updateChecked(cart, $event)" />
          </li>
          <!-- 商品名 -->
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <!-- 单价 -->
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <!-- 商品数量加减 -->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus', -1, cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum"
              @change="handler('change', $event.target.value * 1, cart)" />
            <a href="javascript:void(0)" class="plus" @click="handler('add', 1, cart)">+</a>
          </li>
          <!-- 商品小计 = 数量 * 单价 -->
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 下方购物车结算栏 -->
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck&&cartInfoList.length>0"
          @change="updateAllCartChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  import throttle from "lodash/throttle";
  export default {
    name: "ShopCart",
    mounted() {
      this.getData();
    },
    methods: {
      //获取个人购物车数据
      getData() {
        this.$store.dispatch("getCartList");
      },
      //修改某一个商品的个数[节流]
      handler: throttle(async function (type, disNum, cart) {
        //type:为了区分这三种不同的情况
        //disNum形参:+ 变化量（1）  -变化量（-1）   input最终的个数（并不是变化量）
        //cart:哪一个商品【身上有id】
        //向服务器发请求，修改数量
        switch (type) {
          case "add":
            //加号
            disNum = 1;
            break;
          case "minus":
            //减号
            //判断商品的个数大于1，才可以传递给服务器-1
            //如果出现商品的个数小于等于1，由于商品个数至少为1，故传递给服务器个数0，相当于数据没有改变
            disNum = cart.skuNum > 1 ? -1 : 0;
            break;
          case "change":
            // //用户输入进来的最终量，如果非法的（带有汉字|出现负数），传递给服务器个数0
            if (isNaN(disNum) || disNum < 1) {
              disNum = 0;
            } else {
              //属于正常情况（小数：取整），传递给服务器前后差值：（用户输入进来的 - 商品的起始个数）
              disNum = parseInt(disNum) - cart.skuNum;
            }
            // disNum = (isNaN(disNum)||disNum<1)?0:parseInt(disNum) - cart.skuNum;
            break;
        }
        //派发action
        try {
          //代表的是修改成功
          await this.$store.dispatch("addOrUpdateShopCart", {
            skuId: cart.skuId,
            skuNum: disNum,
          });
          //再一次获取服务器最新的数据进行展示
          this.getData();
        } catch (error) { }
      }, 500),
      //删除某一个商品的操作
      async deleteCartById(cart) {
        try {
          //如果删除成功再次发请求获取新的数据进行展示
          await this.$store.dispatch("deleteCartListBySkuId", cart.skuId);
          this.getData();
        } catch (error) {
          alert(error.message);
        }
      },
      //修改某个商品的勾选状态
      async updateChecked(cart, event) {
        //带给服务器的参数isChecked，不是布尔值，应该是0|1
        try {
          //如果修改数据成功，再次获取服务器数据（购物车）
          let isChecked = event.target.checked ? "1" : "0";
          await this.$store.dispatch("updateCheckedById", {
            skuId: cart.skuId,
            isChecked,
          });
          this.getData();
        } catch (error) {
          //如果失败提示
          alert(error.message);
        }
      },
      //删除全部选中的商品
      //这个回调函数咱门没办法手机到一些有用数据
      async deleteAllCheckedCart() {
        try {
          //派发一个action
          await this.$store.dispatch("deleteAllCheckedCart");
          //再发请求获取购物车列表
          this.getData();
        } catch (error) {
          alert(error.message);
        }
      },
      //修改全部商品的选中状态
      async updateAllCartChecked(event) {
        try {
          let isChecked = event.target.checked ? "1" : "0";
          //派发action
          await this.$store.dispatch("updateAllCartIsChecked", isChecked);
          this.getData();
        } catch (error) {
          alert(error.message);
        }
      },
    },
    computed: {
      ...mapGetters(["cartList"]),
      //购物车数据
      cartInfoList() {
        return this.cartList.cartInfoList || [];
      },
      //计算购买商品的总价
      totalPrice() {
        let sum = 0;
        this.cartInfoList.forEach((item) => {
          sum += item.skuNum * item.skuPrice;
        });
        return sum;
      },
      //判断底部复选框是否勾选【全部商品都选中，采勾选】
      isAllCheck() {
        //遍历数组里面原理，只要全部元素isChecked属性都为1===>真 true
        //只要有一个不是1======>假 false
        //这里用到了数组的every方法，遍历数组中每一个元素
        return this.cartInfoList.every((item) => item.isChecked == 1);
      },
    },
  };
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;
        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;
          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>