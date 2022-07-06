<template>
    <div>
        <h4>{{$attrs.title}}</h4>
        <slot :List="List"></slot>
    </div>
</template>
<script>
    export default {
        name: 'FooterItem',
        data() {
            return {
                List: {
                    // 共存有5个列表的数据
                    list1: ["自助终端", "10086热线", "实体营业厅", "短信营业厅", "网上营业厅", "客户端/掌上营业厅"],
                    list2: ["MM", "和包", "咪咕阅读", "139邮箱", "能力开发商店"],
                    list3: ["当前话费余额","开通业务一览","充值缴费","资费与服务","新版公告"],
                    list4: ["实体营业厅","手机归属地","WLAN热点查询","和包电子券"],
                    list5: ["购物指南","付款方式","物流配送","售后服务","个人中心","网站服务协议"]
                }

            }
        }
    }
</script>
<style scoped lang="less">
</style>