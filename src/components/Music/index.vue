<template>
    <div>
        <!-- 设置网页背景音乐 -->
        <audio src="./audio/夏天的风.mp3" ref="music" loop>
        </audio>
    </div>
</template>

<script>
    export default {
        name: 'music',
        /* 
            audio属性
            * controls 用来指定是否显示默认面板
            * loop 存在此属性则开启循环
            * muted 存在此属性则静音
            * preload 设定音频的预加载方式
                =“auto”:自动加载，页面加载后载入整个音频
                =“metadata”:自动加载，页面加载后只载入元数据
                =“none”:不自动加载

            <以下属性JS操作>
            * currentTime 当前播放时间 currentTime属性可读可写。返回当前播放时长，单位是秒。可以通过修改它来实现倒退or前进x秒
            * duration duration属性是可读属性。返回音频总时长，单位是秒。要注意在load()方法之前，duration的值为NaN。
            * volume volume属性可读可写。返回当前音量，最小是0（静音），最大音量是1。可以通过修改它来实现音量增加or减少的按钮。
            * playbackRate playbackRate就是播放速率，可读可写，返回播放速度，值是速度的倍率，最大播放速度根据内核的不同而有所不同，但是正常来说2倍已经够用了。
            * play() 使用播放方法让暂停了的音频播放。
            * pause() paused属性是可读属性，返回boolean值：若音频是暂停状态，返回true；反之返回false。
            * 
        */
       mounted () {
           //
        //    this.$refs.music.play()
        //    this.$refs.music.volume = 0.25
       }

    }
</script>

<style scoped>

</style>