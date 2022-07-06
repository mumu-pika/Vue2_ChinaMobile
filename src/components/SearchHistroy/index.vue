<template>
    <div class="history-wrapper">
        <ul class="history-container">
            <!-- <li v-for="([value, key],index) in historyList" :key="index" @click="getHistory">{{value}}</li> -->
            <li v-for="(value, key) in historyList" :key="key" @mousedown="handlerKeyWord(key)">
                <span>
                    {{value}}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'SearchHistory',
        //keyword是从Header组件传来的
        props: ['keyword'],
        data() {
            return {
                //保存用户搜索记录在JSON对象historyList中
                //这里将key和value采用同一个数值，是为了方便与输入框里的keyword做比对
                // historyList: {
                //     "key1": "apple",
                //     "key2": "banana"
                // }
                historyList: {},
                // "apple": "apple",  格式
                //标识搜索记录里面是否为空
                isEmpty: false
            };
        },
        methods: {
            getHistory() {
                if (this.keyword != "") {
                    //判断输入框内输入不为空
                    if (!this.historyList.hasOwnProperty(this.keyword)) {
                        //如果搜索记录里没用用户输入的关键字
                        //追加数据进搜索记录,注意这里需要使用vm.$set(),不然Vue无法监测到数据
                        // this.historyList[this.keyword] = this.keyword
                        this.$set(this.historyList, this.keyword, this.keyword)
                        //将更新后的搜索记录数据保存至本地存储localStorage
                        localStorage.setItem("historyList", JSON.stringify(this.historyList))
                        console.log("本地搜索记录已更新:", this.historyList)
                    }
                }
                // else{
                //     //输入框输入为空，提示用户信息
                //     alert("输入内容为空,请输入,merci~~")
                // }
            },
            handlerKeyWord(value) {
                //向Header组件发送keyword
                this.$bus.$emit('setKeyWord', value)
            },

            getLocalHistory() {
                //判断并获取本地存储的搜索记录
                //如果本地存储的数据historyList有值，直接赋值给data中的historyList
                if (JSON.parse(localStorage.getItem("historyList"))) {
                    this.historyList = JSON.parse(localStorage.getItem("historyList"));
                } else {
                    // 如果本地LocalStorage还没有historyList，便创建一个新的
                    this.historyList = {}
                }
            }
        },
        beforeMount() {
            //在挂载前做初始数据的获取
            this.getLocalHistory()
        },
        mounted() {
            this.$bus.$on('getHistory', () => {
                this.getHistory()
            })
        },
        beforeDestroy() {
            //在组件死亡前解绑
            this.$bus.$off('getHistory')
        }

    }
</script>

<style scoped lang="less">
    .history-wrapper {
        width: 490px;
        box-sizing: border-box;
        border: 2px solid #3eb4fa;
        border-radius: 0 0 2px 2px;
        border-top: 0px;
        position: absolute;
        z-index: 999;

        .history-container {
            background-color: #fff;

            li {
                text-decoration: none;
                /* height: 36px; */
                line-height: 36px;
                padding: 0 10px;
                border-bottom: 1px solid rgba(221, 221, 221, 0.5);
                background-color: #fff;
                color: #333333;
                display: block;
                cursor: pointer;

                &:hover {
                    color: blue;
                    background-color: rgba(221, 221, 221, 0.5);
                }
            }

        }
    }
</style>